import 'server-only';
import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { database } from './database';
import type { User } from './billing';
import { BillingError } from './store';

export const SESSION_COOKIE = 'digitnepal-admin';
export const SESSION_SECONDS = 60 * 60 * 8;
type UserRow = Omit<User, 'active'> & { active: number; salt: string; password_hash: string };
function publicUser(row: UserRow): User { return { id: row.id, username: row.username, name: row.name, role: row.role, active: !!row.active }; }
function passwordHash(value: string, salt: string) { return scryptSync(value, salt, 64).toString('hex'); }
function bootstrap() {
  const db = database();
  if (db.prepare('SELECT id FROM users LIMIT 1').get()) return;
  const salt = randomBytes(16).toString('hex');
  db.prepare('INSERT OR IGNORE INTO users(id,username,name,role,active,salt,password_hash) VALUES(?,?,?,?,?,?,?)').run(randomUUID(), 'admin', 'Administrator', 'Admin', 1, salt, passwordHash(process.env.ADMIN_PASSWORD || 'Argentina', salt));
}
export function users(): User[] { return (database().prepare('SELECT * FROM users ORDER BY username').all() as unknown as UserRow[]).map(publicUser); }
export function addUser(value: { username: string; name: string; role: User['role']; password: string }) {
  const db = database();
  if (db.prepare('SELECT id FROM users WHERE username=?').get(value.username.toLowerCase())) throw new BillingError('That username is already in use.');
  const salt = randomBytes(16).toString('hex');
  db.prepare('INSERT INTO users(id,username,name,role,active,salt,password_hash) VALUES(?,?,?,?,?,?,?)').run(randomUUID(), value.username.toLowerCase(), value.name, value.role, 1, salt, passwordHash(value.password, salt));
}
export function setUserActive(id: string, active: boolean, actor: User) {
  if (id === actor.id) throw new BillingError('You cannot deactivate your own account.');
  if (!database().prepare('SELECT id FROM users WHERE id=?').get(id)) throw new BillingError('Account not found.');
  database().prepare('UPDATE users SET active=? WHERE id=?').run(active ? 1 : 0, id);
  database().prepare('DELETE FROM sessions WHERE user_id=?').run(id);
}
export function changePassword(actor: User, current: string, next: string) {
  const row = database().prepare('SELECT * FROM users WHERE id=?').get(actor.id) as unknown as UserRow;
  if (!timingSafeEqual(Buffer.from(passwordHash(current, row.salt), 'hex'), Buffer.from(row.password_hash, 'hex'))) throw new BillingError('Current password is incorrect.');
  const salt = randomBytes(16).toString('hex');
  database().prepare('UPDATE users SET salt=?,password_hash=? WHERE id=?').run(salt, passwordHash(next, salt), actor.id);
  database().prepare('DELETE FROM sessions WHERE user_id=?').run(actor.id);
}
export function loginUser(username: string, password: string) {
  bootstrap();
  const db = database();
  const key = username.toLowerCase();
  const now = Date.now();
  db.prepare('DELETE FROM login_attempts WHERE until<=?').run(now);
  const attempt = db.prepare('SELECT count FROM login_attempts WHERE key=?').get(key) as { count: number } | undefined;
  if (attempt && attempt.count >= 5) throw new BillingError('Too many attempts. Try again in 15 minutes.', 429);
  const row = db.prepare('SELECT * FROM users WHERE username=?').get(key) as unknown as UserRow | undefined;
  const candidate = passwordHash(password, row?.salt || 'missing-account');
  if (!row || !row.active || !timingSafeEqual(Buffer.from(candidate, 'hex'), Buffer.from(row.password_hash, 'hex'))) {
    db.prepare('INSERT INTO login_attempts(key,count,until) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1').run(key, now + 15 * 60 * 1000);
    throw new BillingError('Incorrect username or password. Please try again.', 401);
  }
  db.prepare('DELETE FROM login_attempts WHERE key=?').run(key);
  db.prepare('DELETE FROM sessions WHERE expires<=?').run(now);
  const token = randomBytes(32).toString('hex');
  db.prepare('INSERT INTO sessions(hash,user_id,expires) VALUES(?,?,?)').run(createHash('sha256').update(token).digest('hex'), row.id, now + SESSION_SECONDS * 1000);
  return token;
}
export async function currentUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const row = database().prepare('SELECT u.* FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.hash=? AND s.expires>? AND u.active=1').get(createHash('sha256').update(token).digest('hex'), Date.now()) as unknown as UserRow | undefined;
  return row ? publicUser(row) : null;
}
export async function isAuthenticated() { return !!(await currentUser()); }
export async function endSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (token) database().prepare('DELETE FROM sessions WHERE hash=?').run(createHash('sha256').update(token).digest('hex'));
}
