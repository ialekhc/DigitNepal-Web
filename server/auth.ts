import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import type { PoolClient } from 'pg';
import { pool, initializeDatabase } from './database';
import type { User } from '@digitnepal/shared/billing';
import { BillingError } from './store';

export const SESSION_COOKIE = 'digitnepal-admin';
export const SESSION_SECONDS = 60 * 60 * 8;

type UserRow = User & { salt: string; password_hash: string };
function publicUser(row: UserRow): User {
  return { id: row.id, username: row.username, name: row.name, role: row.role, active: row.active };
}
function passwordHash(value: string, salt: string) { return scryptSync(value, salt, 64).toString('hex'); }
function tokenHash(value: string) { return createHash('sha256').update(value).digest('hex'); }
function equals(actual: string, candidate: string) {
  return timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(candidate, 'hex'));
}
async function bootstrap() {
  await initializeDatabase();
  const existing = await pool.query('SELECT id FROM billing_users LIMIT 1');
  if (existing.rowCount) return;
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 12) throw new Error('ADMIN_PASSWORD must contain at least 12 characters before the first login.');
  const salt = randomBytes(16).toString('hex');
  await pool.query(
    'INSERT INTO billing_users(id, username, name, role, active, salt, password_hash) VALUES($1,$2,$3,$4,true,$5,$6) ON CONFLICT (username) DO NOTHING',
    [randomUUID(), 'admin', 'Administrator', 'Admin', salt, passwordHash(password, salt)],
  );
}

export async function users(): Promise<User[]> {
  const rows = await pool.query<UserRow>('SELECT * FROM billing_users ORDER BY username');
  return rows.rows.map(publicUser);
}

export async function addUser(value: { username: string; name: string; role: User['role']; password: string }, client: PoolClient) {
  const salt = randomBytes(16).toString('hex');
  try {
    await client.query(
      'INSERT INTO billing_users(id,username,name,role,active,salt,password_hash) VALUES($1,$2,$3,$4,true,$5,$6)',
      [randomUUID(), value.username.toLowerCase(), value.name, value.role, salt, passwordHash(value.password, salt)],
    );
  } catch (error) {
    if ((error as { code?: string }).code === '23505') throw new BillingError('That username is already in use.');
    throw error;
  }
}

export async function setUserActive(id: string, active: boolean, actor: User, client: PoolClient) {
  if (id === actor.id) throw new BillingError('You cannot deactivate your own account.');
  const result = await client.query('UPDATE billing_users SET active=$1 WHERE id=$2', [active, id]);
  if (!result.rowCount) throw new BillingError('Account not found.');
  await client.query('DELETE FROM billing_sessions WHERE user_id=$1', [id]);
}

export async function changePassword(actor: User, current: string, next: string, client: PoolClient) {
  const result = await client.query<UserRow>('SELECT * FROM billing_users WHERE id=$1', [actor.id]);
  const row = result.rows[0];
  if (!row || !equals(row.password_hash, passwordHash(current, row.salt)))
    throw new BillingError('Current password is incorrect.');
  const salt = randomBytes(16).toString('hex');
  await client.query('UPDATE billing_users SET salt=$1,password_hash=$2 WHERE id=$3', [salt, passwordHash(next, salt), actor.id]);
  await client.query('DELETE FROM billing_sessions WHERE user_id=$1', [actor.id]);
}

export async function loginUser(username: string, password: string): Promise<string> {
  await bootstrap();
  const key = username.toLowerCase();
  const now = Date.now();
  await pool.query('DELETE FROM billing_login_attempts WHERE until <= $1', [now]);
  const attempt = await pool.query<{ count: number }>('SELECT count FROM billing_login_attempts WHERE key=$1', [key]);
  if (attempt.rows[0]?.count >= 5) throw new BillingError('Too many attempts. Try again in 15 minutes.', 429);
  const result = await pool.query<UserRow>('SELECT * FROM billing_users WHERE username=$1', [key]);
  const row = result.rows[0];
  const candidate = passwordHash(password, row?.salt || 'missing-account');
  if (!row || !row.active || !equals(row.password_hash, candidate)) {
    await pool.query(
      'INSERT INTO billing_login_attempts(key,count,until) VALUES($1,1,$2) ON CONFLICT(key) DO UPDATE SET count=billing_login_attempts.count+1, until=$2',
      [key, now + 15 * 60 * 1000],
    );
    throw new BillingError('Incorrect username or password. Please try again.', 401);
  }
  await pool.query('DELETE FROM billing_login_attempts WHERE key=$1', [key]);
  await pool.query('DELETE FROM billing_sessions WHERE expires <= $1', [now]);
  const token = randomBytes(32).toString('hex');
  await pool.query('INSERT INTO billing_sessions(hash,user_id,expires) VALUES($1,$2,$3)', [tokenHash(token), row.id, now + SESSION_SECONDS * 1000]);
  return token;
}

export async function currentUser(token: string | undefined): Promise<User | null> {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  await initializeDatabase();
  const result = await pool.query<UserRow>(
    'SELECT u.* FROM billing_users u JOIN billing_sessions s ON s.user_id=u.id WHERE s.hash=$1 AND s.expires>$2 AND u.active=true',
    [tokenHash(token), Date.now()],
  );
  return result.rows[0] ? publicUser(result.rows[0]) : null;
}

export async function endSession(token: string | undefined) {
  if (token) await pool.query('DELETE FROM billing_sessions WHERE hash=$1', [tokenHash(token)]);
}
