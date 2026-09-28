import { DatabaseSync } from 'node:sqlite';
import { resolve } from 'node:path';
import { initializeDatabase, pool } from '../server/database.ts';

const source = process.env.SQLITE_PATH;
const destination = process.env.DATABASE_URL;
if (!source || !destination) throw new Error('Set SQLITE_PATH and DATABASE_URL before migration.');
await initializeDatabase();
const sqlite = new DatabaseSync(resolve(source), { readOnly: true });
const collections = ['clients', 'invoices', 'quotes', 'payments', 'projects', 'services', 'expenses', 'recurring', 'activity'];

try {
  const metadata = sqlite.prepare("SELECT value FROM metadata WHERE key='workspace'").get();
  if (!metadata) throw new Error('Source billing workspace is empty.');
  const data = JSON.parse(metadata.value);
  if (data.version !== 2) throw new Error('Only version-2 SQLite workspaces can be migrated.');
  for (const name of collections) data[name] = [];
  for (const row of sqlite.prepare('SELECT collection, data FROM records ORDER BY rowid').all()) {
    if (!collections.includes(row.collection)) throw new Error('Unknown billing collection in source database.');
    data[row.collection].push(JSON.parse(row.data));
  }
  const users = sqlite.prepare('SELECT id, username, name, role, active, salt, password_hash FROM users').all();
  const operations = sqlite.prepare('SELECT id, actor, payload_hash FROM operations').all();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const existing = await client.query("SELECT COUNT(*)::int AS count FROM billing_users");
    if (existing.rows[0].count) throw new Error('Destination already has billing users; migration was not run.');
    const workspace = await client.query('SELECT data FROM billing_workspace WHERE id=1 FOR UPDATE');
    if (workspace.rowCount) {
      const current = workspace.rows[0].data;
      if (current.revision || collections.some(name => current[name]?.length)) throw new Error('Destination already has billing records; migration was not run.');
    }
    await client.query('INSERT INTO billing_workspace(id,data) VALUES(1,$1) ON CONFLICT(id) DO UPDATE SET data=$1', [JSON.stringify(data)]);
    for (const user of users) {
      await client.query('INSERT INTO billing_users(id,username,name,role,active,salt,password_hash) VALUES($1,$2,$3,$4,$5,$6,$7)',
        [user.id, user.username, user.name, user.role, !!user.active, user.salt, user.password_hash]);
    }
    for (const operation of operations) {
      await client.query('INSERT INTO billing_operations(id,actor,payload_hash) VALUES($1,$2,$3)',
        [operation.id, operation.actor, operation.payload_hash]);
    }
    await client.query('COMMIT');
    console.log(`Migrated ${users.length} accounts and ${collections.reduce((count, name) => count + data[name].length, 0)} billing records. Existing sessions were not copied.`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally { client.release(); }
} finally {
  sqlite.close();
  await pool.end();
}
