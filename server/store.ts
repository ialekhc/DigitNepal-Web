import { createHash, randomUUID } from 'node:crypto';
import type { PoolClient } from 'pg';
import { pool, initializeDatabase } from './database';
import { settingsSchema, type BillingData, type User } from '@digitnepal/shared/billing';

export class BillingError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

function freshData(): BillingData {
  return {
    version: 2, clients: [], invoices: [], quotes: [], payments: [], projects: [],
    services: [], expenses: [], recurring: [], activity: [],
    settings: settingsSchema.parse({
      name: 'Digit Nepal Pvt. Ltd.', email: 'info.digitnepal@gmail.com',
      phone: '+977 9824872366', address: 'Balkot, Bhaktapur, Nepal', taxId: '',
    }),
    counters: { invoice: 1, quote: 1, receipt: 1, expense: 1 }, revision: 0,
  };
}

async function ensureWorkspace(client: PoolClient) {
  await client.query(
    'INSERT INTO billing_workspace(id, data) VALUES(1, $1) ON CONFLICT (id) DO NOTHING',
    [JSON.stringify(freshData())],
  );
}

export async function readBilling(): Promise<BillingData> {
  await initializeDatabase();
  const client = await pool.connect();
  try {
    await ensureWorkspace(client);
    const result = await client.query<{ data: BillingData }>('SELECT data FROM billing_workspace WHERE id = 1');
    return result.rows[0].data;
  } finally { client.release(); }
}

export async function updateBilling(
  actor: User, requestId: string, payload: unknown,
  update: (data: BillingData, client: PoolClient) => Promise<string>,
): Promise<BillingData> {
  await initializeDatabase();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await ensureWorkspace(client);
    const result = await client.query<{ data: BillingData }>('SELECT data FROM billing_workspace WHERE id = 1 FOR UPDATE');
    const data = result.rows[0].data;
    const hash = createHash('sha256').update(JSON.stringify(payload)).digest('hex');
    const previous = await client.query<{ actor: string; payload_hash: string }>(
      'SELECT actor, payload_hash FROM billing_operations WHERE id = $1', [requestId],
    );
    if (previous.rowCount) {
      if (previous.rows[0].actor !== actor.id || previous.rows[0].payload_hash !== hash)
        throw new BillingError('This request identifier has already been used.', 409);
    } else {
      const detail = await update(data, client);
      data.revision += 1;
      data.activity.unshift({
        id: randomUUID(), at: new Date().toISOString(), actor: actor.name,
        action: (payload as { action?: string }).action || 'Update', detail,
      });
      await client.query('UPDATE billing_workspace SET data = $1 WHERE id = 1', [JSON.stringify(data)]);
      await client.query(
        'INSERT INTO billing_operations(id, actor, payload_hash) VALUES($1, $2, $3)',
        [requestId, actor.id, hash],
      );
    }
    await client.query('COMMIT');
    return data;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally { client.release(); }
}
