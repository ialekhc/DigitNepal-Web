import pg from 'pg';

const { Pool } = pg;
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.');
export const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });

let ready: Promise<void> | undefined;
export function initializeDatabase(): Promise<void> {
  return ready ??= (async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS billing_workspace (
        id integer PRIMARY KEY CHECK (id = 1),
        data jsonb NOT NULL
      );
      CREATE TABLE IF NOT EXISTS billing_users (
        id uuid PRIMARY KEY,
        username text UNIQUE NOT NULL,
        name text NOT NULL,
        role text NOT NULL,
        active boolean NOT NULL DEFAULT true,
        salt text NOT NULL,
        password_hash text NOT NULL
      );
      CREATE TABLE IF NOT EXISTS billing_sessions (
        hash text PRIMARY KEY,
        user_id uuid NOT NULL REFERENCES billing_users(id),
        expires bigint NOT NULL
      );
      CREATE TABLE IF NOT EXISTS billing_login_attempts (
        key text PRIMARY KEY,
        count integer NOT NULL,
        until bigint NOT NULL
      );
      CREATE TABLE IF NOT EXISTS billing_operations (
        id uuid PRIMARY KEY,
        actor uuid NOT NULL,
        payload_hash text NOT NULL
      );
    `);
  })().catch(error => {
    ready = undefined;
    throw error;
  });
}
