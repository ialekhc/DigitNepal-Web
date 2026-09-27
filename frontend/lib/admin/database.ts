import 'server-only';
import { DatabaseSync } from 'node:sqlite';
import { existsSync, mkdirSync, readdirSync, renameSync } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { today } from './billing';

export const dataDirectory = path.resolve(process.env.BILLING_DATA_DIR || path.join(process.cwd(), '.billing-data'));
const state = globalThis as typeof globalThis & { billingDatabases?: Map<string, DatabaseSync>; billingBackupWarning?: string };

export function database() {
  const databases = state.billingDatabases ??= new Map();
  const existing = databases.get(dataDirectory);
  if (existing) return existing;
  mkdirSync(dataDirectory, { recursive: true });
  const db = new DatabaseSync(path.join(dataDirectory, 'billing.sqlite'));
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS records (collection TEXT NOT NULL, id TEXT NOT NULL, data TEXT NOT NULL, PRIMARY KEY(collection,id));
    CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT UNIQUE NOT NULL, name TEXT NOT NULL, role TEXT NOT NULL, active INTEGER NOT NULL DEFAULT 1, salt TEXT NOT NULL, password_hash TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS login_attempts (key TEXT PRIMARY KEY, count INTEGER NOT NULL, until INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS operations (id TEXT PRIMARY KEY, actor TEXT NOT NULL, payload_hash TEXT NOT NULL);
  `);
  databases.set(dataDirectory, db);
  return db;
}

export function automaticBackup() {
  const directory = path.join(dataDirectory, 'backups');
  const destination = path.join(directory, `billing-${today()}.sqlite`);
  try {
    mkdirSync(directory, { recursive: true });
    const snapshot = destination + '.' + randomUUID() + '.tmp';
    database().exec(`VACUUM INTO '${snapshot.replaceAll("'", "''")}'`);
    renameSync(snapshot, destination);
    state.billingBackupWarning = undefined;
  } catch (error) {
    console.error('Billing backup failed:', error);
    state.billingBackupWarning = 'Automatic backup could not be created. Check disk space and folder permissions.';
  }
}

export function backupStatus() {
  const directory = path.join(dataDirectory, 'backups');
  const files = existsSync(directory) ? readdirSync(directory).filter(name => /^billing-\d{4}-\d{2}-\d{2}\.sqlite$/.test(name)).sort() : [];
  return { lastBackup: files.at(-1)?.slice(8, 18) || null, warning: state.billingBackupWarning || null };
}

