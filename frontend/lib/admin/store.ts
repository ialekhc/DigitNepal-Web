import 'server-only';
import { existsSync, readFileSync, mkdirSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { z } from 'zod';
import { clientSchema, invoiceSchema, settingsSchema, totals, type BillingData, type User } from './billing';
import { automaticBackup, database, dataDirectory } from './database';
import { companyInfo } from '@/lib/content/site-content';

export class BillingError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}
const collections = ['clients', 'invoices', 'quotes', 'payments', 'projects', 'services', 'expenses', 'recurring', 'activity'] as const;
function freshData(): BillingData {
  return { version: 2, clients: [], invoices: [], quotes: [], payments: [], projects: [], services: [], expenses: [], recurring: [], activity: [], settings: settingsSchema.parse({ ...companyInfo, taxId: '' }), counters: { invoice: 1, quote: 1, receipt: 1, expense: 1 }, revision: 0 };
}
function persist(data: BillingData) {
  const db = database();
  const meta = { version: data.version, settings: data.settings, counters: data.counters, revision: data.revision };
  db.prepare('INSERT OR REPLACE INTO metadata(key,value) VALUES(?,?)').run('workspace', JSON.stringify(meta));
  const put = db.prepare('INSERT OR REPLACE INTO records(collection,id,data) VALUES(?,?,?)');
  for (const collection of collections) for (const item of data[collection]) put.run(collection, item.id, JSON.stringify(item));
}
function initialize() {
  const db = database();
  if (db.prepare('SELECT key FROM metadata WHERE key=?').get('workspace')) return;
  db.exec('BEGIN IMMEDIATE');
  try {
    if (db.prepare('SELECT key FROM metadata WHERE key=?').get('workspace')) { db.exec('COMMIT'); return; }
    const data = freshData();
    const legacyFile = path.join(dataDirectory, 'billing.json');
    if (existsSync(legacyFile)) {
      const legacyInvoice = z.object({ id: z.string(), number: z.string(), client: clientSchema.extend({ id: z.string() }), business: settingsSchema, paidAt: z.string().nullable(), createdAt: z.string() }).and(invoiceSchema);
      const legacySchema = z.object({ version: z.literal(1), clients: z.array(clientSchema.extend({ id: z.string() })), invoices: z.array(legacyInvoice), settings: settingsSchema, nextNumber: z.number().int().positive() });
      const legacy = legacySchema.parse(JSON.parse(readFileSync(legacyFile, 'utf8')));
      mkdirSync(path.join(dataDirectory, 'backups'), { recursive: true });
      copyFileSync(legacyFile, path.join(dataDirectory, 'backups', `legacy-${Date.now()}.json`));
      data.clients = legacy.clients; data.settings = legacy.settings; data.counters.invoice = legacy.nextNumber;
      data.invoices = legacy.invoices.map(({ paidAt, ...invoice }) => {
        if (paidAt) data.payments.push({ id: randomUUID(), number: `RC-${String(data.counters.receipt++).padStart(5, '0')}`, invoiceId: invoice.id, amount: totals(invoice).total, date: new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kathmandu', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(paidAt)), method: 'Other', reference: 'Migrated payment', notes: 'Imported from the previous paid status.', createdAt: paidAt, reversedAt: '', reversalReason: '' });
        return { ...invoice, state: 'Issued', voidReason: '', updatedAt: invoice.createdAt, quoteId: '' };
      });
      data.activity.push({ id: randomUUID(), at: new Date().toISOString(), actor: 'System', action: 'Migration', detail: 'Existing billing records imported. Original JSON file preserved.' });
    }
    persist(data); db.exec('COMMIT');
  } catch (error) { db.exec('ROLLBACK'); throw error; }
  automaticBackup();
}
export function readBilling(inTransaction = false): BillingData {
  initialize();
  const db = database();
  if (!inTransaction) db.exec('BEGIN');
  try {
  const row = db.prepare('SELECT value FROM metadata WHERE key=?').get('workspace') as { value: string };
  const data = { ...freshData(), ...JSON.parse(row.value) } as BillingData;
  const rows = db.prepare('SELECT collection,data FROM records ORDER BY rowid').all() as { collection: typeof collections[number]; data: string }[];
  for (const row of rows) (data[row.collection] as unknown[]).push(JSON.parse(row.data));
  data.invoices.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  data.quotes.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  data.payments.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  data.activity.sort((a, b) => b.at.localeCompare(a.at));
  if (!inTransaction) db.exec('COMMIT');
  return data;
  } catch (error) { if (!inTransaction) db.exec('ROLLBACK'); throw error; }
}
export function updateBilling(actor: User, requestId: string, payload: unknown, update: (data: BillingData) => string): BillingData {
  initialize();
  const db = database();
  const hash = createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  db.exec('BEGIN IMMEDIATE');
  let data: BillingData;
  try {
    const previous = db.prepare('SELECT actor,payload_hash FROM operations WHERE id=?').get(requestId) as { actor: string; payload_hash: string } | undefined;
    if (previous && (previous.actor !== actor.id || previous.payload_hash !== hash)) throw new BillingError('This request identifier has already been used.', 409);
    data = readBilling(true);
    if (!previous) {
      const detail = update(data);
      data.revision += 1;
      data.activity.unshift({ id: randomUUID(), at: new Date().toISOString(), actor: actor.name, action: (payload as { action?: string }).action || 'Update', detail });
      persist(data);
      db.prepare('INSERT INTO operations(id,actor,payload_hash) VALUES(?,?,?)').run(requestId, actor.id, hash);
    }
    db.exec('COMMIT');
  } catch (error) { db.exec('ROLLBACK'); throw error; }
  automaticBackup();
  return data;
}



