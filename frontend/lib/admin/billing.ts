import { z } from 'zod';

export const text = z.string().trim().min(1).max(160);
export const optionalText = z.string().trim().max(2000).default('');
export const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}, 'Enter a valid date.');
export const amountSchema = z.number().finite().min(0).max(1000000000).refine(n => Math.abs(n * 100 - Math.round(n * 100)) < 0.00001, 'Use at most two decimal places.');
export const clientSchema = z.object({ name: text, email: z.string().trim().email().max(200), phone: z.string().trim().max(40), address: z.string().trim().max(300), taxId: z.string().trim().max(60).default(''), notes: optionalText });
export const settingsSchema = z.object({ name: text, email: z.string().trim().email().max(200), phone: z.string().trim().max(40), address: z.string().trim().max(300), taxId: z.string().trim().max(60), bankName: z.string().trim().max(120).default(''), bankAccount: z.string().trim().max(80).default(''), bankAccountName: z.string().trim().max(160).default(''), paymentTerms: optionalText });
export const itemSchema = z.object({ description: text, quantity: z.number().finite().positive().max(10000), rate: amountSchema, serviceId: z.string().default('') }).refine(item => item.quantity * item.rate <= 1000000000, 'A line item cannot exceed NPR 1,000,000,000.');
export const documentFields = z.object({ clientId: text, date: dateSchema, dueDate: dateSchema, items: z.array(itemSchema).min(1).max(30), taxRate: z.number().finite().min(0).max(100), discount: amountSchema, notes: optionalText, projectId: z.string().default(''), milestoneId: z.string().default('') });
export const invoiceSchema = documentFields.refine(value => value.dueDate >= value.date, { message: 'Due date must be on or after the issue date.', path: ['dueDate'] }).refine(value => cents(value.discount) <= value.items.reduce((sum, item) => sum + cents(item.quantity * item.rate), 0), { message: 'Discount cannot exceed the subtotal.', path: ['discount'] });
export const paymentSchema = z.object({ invoiceId: text, amount: amountSchema.refine(n => n > 0, 'Payment must be greater than zero.'), date: dateSchema.refine(value => value <= today(), 'Payment date cannot be in the future.'), method: z.enum(['Bank transfer', 'Cash', 'eSewa', 'Khalti', 'Other']), reference: z.string().trim().max(160), notes: optionalText });
export const milestoneSchema = z.object({ id: z.string().default(''), title: text, amount: amountSchema.refine(n => n > 0), dueDate: dateSchema });
export const projectSchema = z.object({ clientId: text, name: text, kind: z.enum(['Project', 'Training']), budget: amountSchema, startDate: dateSchema, dueDate: dateSchema, notes: optionalText, milestones: z.array(milestoneSchema).max(24) }).refine(p => p.dueDate >= p.startDate, 'Project end date must follow the start date.').refine(p => p.milestones.reduce((n, m) => n + cents(m.amount), 0) <= cents(p.budget), 'Milestones cannot exceed the project budget.').refine(p => p.milestones.every(m => m.dueDate >= p.startDate && m.dueDate <= p.dueDate), 'Milestone dates must fall within the project dates.');
export const serviceSchema = z.object({ name: text, description: text, category: z.enum(['Development', 'Design', 'Hosting', 'Maintenance', 'Training', 'Other']), rate: amountSchema, taxRate: z.number().finite().min(0).max(100) });
export const expenseSchema = z.object({ description: text, vendor: z.string().trim().max(160), amount: amountSchema.refine(n => n > 0), date: dateSchema.refine(value => value <= today(), 'Expense date cannot be in the future.'), category: z.enum(['Hosting', 'Contractors', 'Software', 'Office', 'Travel', 'Other']), projectId: z.string().default(''), reference: z.string().trim().max(160) });
export type Client = z.infer<typeof clientSchema> & { id: string };
export type Settings = z.infer<typeof settingsSchema>;
export type InvoiceInput = z.infer<typeof invoiceSchema>;
export type Invoice = InvoiceInput & { id: string; number: string; client: Client; business: Settings; state: 'Draft' | 'Issued' | 'Void'; voidReason: string; createdAt: string; updatedAt: string; quoteId: string };
export type Quote = InvoiceInput & { id: string; number: string; client: Client; business: Settings; state: 'Draft' | 'Sent' | 'Accepted' | 'Declined'; convertedInvoiceId: string; createdAt: string; updatedAt: string };
export type Payment = z.infer<typeof paymentSchema> & { id: string; number: string; createdAt: string; reversedAt: string; reversalReason: string };
export type Project = z.infer<typeof projectSchema> & { id: string; state: 'Active' | 'Completed' | 'On hold' };
export type Service = z.infer<typeof serviceSchema> & { id: string };
export type Expense = z.infer<typeof expenseSchema> & { id: string; number: string; voidedAt: string; voidReason: string };
export type Recurring = InvoiceInput & { id: string; name: string; interval: 'Monthly' | 'Yearly'; nextDate: string; anchorDay: number; active: boolean };
export type AuditEvent = { id: string; at: string; actor: string; action: string; detail: string };
export type User = { id: string; username: string; name: string; role: 'Admin' | 'Accountant' | 'Viewer'; active: boolean };
export type BillingData = { version: 2; clients: Client[]; invoices: Invoice[]; quotes: Quote[]; payments: Payment[]; projects: Project[]; services: Service[]; expenses: Expense[]; recurring: Recurring[]; activity: AuditEvent[]; settings: Settings; counters: { invoice: number; quote: number; receipt: number; expense: number }; revision: number };
export type WorkspaceData = BillingData & { currentUser: User; users: User[]; backup: { lastBackup: string | null; warning: string | null } };

export function cents(value: number) { return Math.round((value + Number.EPSILON * Math.max(1, Math.abs(value))) * 100); }
export function totals(invoice: Pick<InvoiceInput, 'items' | 'taxRate' | 'discount'>) {
  const subtotal = invoice.items.reduce((sum, item) => sum + cents(item.quantity * item.rate), 0);
  const discounted = Math.max(0, subtotal - cents(invoice.discount));
  const tax = Math.round(discounted * invoice.taxRate / 100);
  return { subtotal: subtotal / 100, tax: tax / 100, total: (discounted + tax) / 100 };
}
export function received(invoice: Invoice, payments: Payment[]) { return payments.filter(p => p.invoiceId === invoice.id && !p.reversedAt).reduce((n, p) => n + cents(p.amount), 0) / 100; }
export function balance(invoice: Invoice, payments: Payment[]) { return invoice.state !== 'Issued' ? 0 : Math.max(0, cents(totals(invoice).total) - cents(received(invoice, payments))) / 100; }
export function status(invoice: Invoice, payments: Payment[] = []) {
  if (invoice.state !== 'Issued') return invoice.state;
  if (balance(invoice, payments) === 0) return 'Paid';
  if (invoice.dueDate < today()) return 'Overdue';
  return received(invoice, payments) > 0 ? 'Part paid' : 'Unpaid';
}
export function today() { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kathmandu', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); }
export function addDays(value: string, days: number) { const date = new Date(`${value}T00:00:00Z`); date.setUTCDate(date.getUTCDate() + days); return date.toISOString().slice(0, 10); }
export function nextRecurrence(value: string, interval: 'Monthly' | 'Yearly', anchorDay: number) { const date = new Date(`${value}T00:00:00Z`); date.setUTCDate(1); date.setUTCMonth(date.getUTCMonth() + (interval === 'Monthly' ? 1 : 12)); const end = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate(); date.setUTCDate(Math.min(anchorDay, end)); return date.toISOString().slice(0, 10); }
export function money(value: number) { return new Intl.NumberFormat('en-NP', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value); }
export function displayDate(value: string) { const day = value.includes('T') ? new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kathmandu', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(value)) : value; return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${day}T00:00:00Z`)); }
export function invoiceCsv(invoices: Invoice[], payments: Payment[] = []) {
  const rows = [['Invoice', 'Client', 'Project', 'Issued', 'Due', 'Status', 'Subtotal (NPR)', 'Tax (NPR)', 'Discount (NPR)', 'Total (NPR)', 'Received (NPR)', 'Balance (NPR)'], ...invoices.map(i => [i.number, i.client.name, i.projectId, i.date, i.dueDate, status(i, payments), totals(i).subtotal.toFixed(2), totals(i).tax.toFixed(2), i.discount.toFixed(2), totals(i).total.toFixed(2), received(i, payments).toFixed(2), balance(i, payments).toFixed(2)])];
  return '\ufeff' + rows.map(row => row.map(value => `"${(/^[=+\-@\t\r\n]/.test(value) ? "'" : '') + value.replaceAll('"', '""')}"`).join(',')).join('\r\n');
}



