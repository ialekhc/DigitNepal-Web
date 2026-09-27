import 'server-only';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { addDays, balance, cents, clientSchema, dateSchema, expenseSchema, invoiceSchema, nextRecurrence, paymentSchema, projectSchema, serviceSchema, settingsSchema, text, today, type BillingData, type Invoice, type InvoiceInput, type User } from './billing';
import { addUser, changePassword, setUserActive } from './auth';
import { BillingError } from './store';

const id = z.string().min(1).max(160);
const reason = z.string().trim().min(3, 'Please provide a reason (at least 3 characters).').max(500);
export const commandSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('client.save'), id: z.string().optional(), value: clientSchema }),
  z.object({ action: z.literal('invoice.save'), id: z.string().optional(), updatedAt: z.string().optional(), value: invoiceSchema }),
  z.object({ action: z.literal('invoice.issue'), id }),
  z.object({ action: z.literal('invoice.duplicate'), id }),
  z.object({ action: z.literal('invoice.void'), id, reason }),
  z.object({ action: z.literal('payment.create'), value: paymentSchema }),
  z.object({ action: z.literal('payment.reverse'), id, reason }),
  z.object({ action: z.literal('quote.save'), id: z.string().optional(), updatedAt: z.string().optional(), value: invoiceSchema }),
  z.object({ action: z.literal('quote.status'), id, state: z.enum(['Sent', 'Accepted', 'Declined']) }),
  z.object({ action: z.literal('quote.convert'), id }),
  z.object({ action: z.literal('project.create'), value: projectSchema }),
  z.object({ action: z.literal('project.status'), id, state: z.enum(['Active', 'Completed', 'On hold']) }),
  z.object({ action: z.literal('project.bill'), id, milestoneId: id }),
  z.object({ action: z.literal('service.save'), id: z.string().optional(), value: serviceSchema }),
  z.object({ action: z.literal('expense.create'), value: expenseSchema }),
  z.object({ action: z.literal('expense.void'), id, reason }),
  z.object({ action: z.literal('recurring.create'), invoiceId: id, name: text, interval: z.enum(['Monthly', 'Yearly']), nextDate: dateSchema }),
  z.object({ action: z.literal('recurring.generate'), id }),
  z.object({ action: z.literal('recurring.toggle'), id, active: z.boolean() }),
  z.object({ action: z.literal('settings'), value: settingsSchema, revision: z.number().int() }),
  z.object({ action: z.literal('user.create'), value: z.object({ username: z.string().regex(/^[a-zA-Z0-9._-]{3,40}$/), name: text, role: z.enum(['Admin', 'Accountant', 'Viewer']), password: z.string().min(10, 'Use at least 10 characters for new passwords.').max(200) }) }),
  z.object({ action: z.literal('user.toggle'), id, active: z.boolean() }),
  z.object({ action: z.literal('password'), currentPassword: z.string().min(1).max(200), newPassword: z.string().min(10, 'Use at least 10 characters.').max(200) }),
]);
export type Command = z.infer<typeof commandSchema>;
function find<T extends { id: string }>(items: T[], id: string, label: string): T { const item = items.find(item => item.id === id); if (!item) throw new BillingError(`${label} not found.`, 404); return item; }
function number(data: BillingData, type: keyof BillingData['counters'], date = today()) { const prefixes = { invoice: 'DN', quote: 'QT', receipt: 'RC', expense: 'EX' }; return `${prefixes[type]}-${date.slice(0, 4)}-${String(data.counters[type]++).padStart(4, '0')}`; }
function documentLinks(data: BillingData, input: InvoiceInput) {
  const client = find(data.clients, input.clientId, 'Client');
  if (input.projectId) {
    const project = find(data.projects, input.projectId, 'Project');
    if (project.clientId !== client.id) throw new BillingError('The selected project belongs to another client.');
    if (input.milestoneId) find(project.milestones, input.milestoneId, 'Milestone');
  } else if (input.milestoneId) throw new BillingError('Choose a project for this milestone.');
  return client;
}
function ensureMilestoneAvailable(data: BillingData, input: InvoiceInput, excluding = '') {
  if (input.milestoneId && data.invoices.some(i => i.id !== excluding && i.projectId === input.projectId && i.milestoneId === input.milestoneId && i.state !== 'Void')) throw new BillingError('This milestone already has an invoice. Open the existing invoice instead.');
}
function newInvoice(data: BillingData, input: InvoiceInput, quoteId = '') {
  const value = invoiceSchema.parse(input);
  const client = documentLinks(data, value);
  ensureMilestoneAvailable(data, value);
  const at = new Date().toISOString();
  const invoice: Invoice = { ...value, id: randomUUID(), number: number(data, 'invoice', value.date), client: { ...client }, business: { ...data.settings }, state: 'Draft', voidReason: '', quoteId, createdAt: at, updatedAt: at };
  data.invoices.unshift(invoice); return invoice;
}
export function applyCommand(data: BillingData, actor: User, input: Command): string {
  if (actor.role === 'Viewer' && input.action !== 'password') throw new BillingError('Your account has read-only access.', 403);
  if ((input.action.startsWith('user.') || input.action === 'settings') && actor.role !== 'Admin') throw new BillingError('Administrator access is required.', 403);
  switch (input.action) {
    case 'client.save': {
      if (data.clients.some(c => c.id !== input.id && c.email.toLowerCase() === input.value.email.toLowerCase())) throw new BillingError('A client with this email already exists.');
      if (input.id) Object.assign(find(data.clients, input.id, 'Client'), input.value);
      else data.clients.push({ ...input.value, id: randomUUID() });
      return `Saved client ${input.value.name}.`;
    }
    case 'invoice.save': {
      if (!input.id) return `Created draft ${newInvoice(data, input.value).number}.`;
      const invoice = find(data.invoices, input.id, 'Invoice');
      if (invoice.state !== 'Draft') throw new BillingError('Only draft invoices can be edited.');
      if (invoice.updatedAt !== input.updatedAt) throw new BillingError('This invoice changed. Close and reopen it before editing.', 409);
      const client = documentLinks(data, input.value); ensureMilestoneAvailable(data, input.value, invoice.id);
      Object.assign(invoice, input.value, { client: { ...client }, business: { ...data.settings }, updatedAt: new Date().toISOString() });
      return `Updated draft ${invoice.number}.`;
    }
    case 'invoice.issue': {
      const invoice = find(data.invoices, input.id, 'Invoice');
      if (invoice.state !== 'Draft') throw new BillingError('Only a draft can be issued.');
      ensureMilestoneAvailable(data, invoice, invoice.id);
      invoice.state = 'Issued'; invoice.updatedAt = new Date().toISOString();
      return `Issued ${invoice.number}.`;
    }
    case 'invoice.duplicate': {
      const original = find(data.invoices, input.id, 'Invoice');
      const duplicate = newInvoice(data, { ...original, milestoneId: '', date: today(), dueDate: addDays(today(), 14) });
      return `Duplicated ${original.number} as draft ${duplicate.number}.`;
    }
    case 'invoice.void': {
      const invoice = find(data.invoices, input.id, 'Invoice');
      if (invoice.state === 'Void') throw new BillingError('This invoice is already void.');
      if (data.payments.some(p => p.invoiceId === invoice.id && !p.reversedAt)) throw new BillingError('Reverse its recorded payments before voiding this invoice.');
      invoice.state = 'Void'; invoice.voidReason = input.reason; invoice.updatedAt = new Date().toISOString();
      return `Voided ${invoice.number}: ${input.reason}`;
    }
    case 'payment.create': {
      const invoice = find(data.invoices, input.value.invoiceId, 'Invoice');
      if (invoice.state !== 'Issued') throw new BillingError('Issue this invoice before recording a payment.');
      if (input.value.date < invoice.date) throw new BillingError('Payment date cannot be before the invoice date.');
      if (cents(input.value.amount) > cents(balance(invoice, data.payments))) throw new BillingError('Payment exceeds the remaining invoice balance.');
      const receipt = number(data, 'receipt', input.value.date);
      data.payments.unshift({ ...input.value, id: randomUUID(), number: receipt, createdAt: new Date().toISOString(), reversedAt: '', reversalReason: '' });
      return `Recorded receipt ${receipt} against ${invoice.number}.`;
    }
    case 'payment.reverse': {
      const payment = find(data.payments, input.id, 'Payment');
      if (payment.reversedAt) throw new BillingError('This payment was already reversed.');
      payment.reversedAt = new Date().toISOString(); payment.reversalReason = input.reason;
      return `Reversed ${payment.number}: ${input.reason}`;
    }
    case 'quote.save': {
      const client = documentLinks(data, input.value);
      if (input.id) {
        const quote = find(data.quotes, input.id, 'Quotation');
        if (quote.state !== 'Draft') throw new BillingError('Only draft quotations can be edited.');
        if (quote.updatedAt !== input.updatedAt) throw new BillingError('This quotation changed. Close and reopen it before editing.', 409);
        Object.assign(quote, input.value, { client: { ...client }, business: { ...data.settings }, updatedAt: new Date().toISOString() });
        return `Updated ${quote.number}.`;
      }
      const at = new Date().toISOString(); const quoteNumber = number(data, 'quote', input.value.date);
      data.quotes.unshift({ ...input.value, id: randomUUID(), number: quoteNumber, client: { ...client }, business: { ...data.settings }, state: 'Draft', convertedInvoiceId: '', createdAt: at, updatedAt: at });
      return `Created quotation ${quoteNumber}.`;
    }
    case 'quote.status': {
      const quote = find(data.quotes, input.id, 'Quotation');
      const allowed = quote.state === 'Draft' ? ['Sent'] : quote.state === 'Sent' ? ['Accepted', 'Declined'] : [];
      if (!allowed.includes(input.state)) throw new BillingError('This quotation cannot move to that status.');
      quote.state = input.state; quote.updatedAt = new Date().toISOString();
      return `Marked ${quote.number} ${input.state.toLowerCase()}.`;
    }
    case 'quote.convert': {
      const quote = find(data.quotes, input.id, 'Quotation');
      if (quote.state !== 'Accepted') throw new BillingError('Record client acceptance before converting this quotation.');
      if (quote.convertedInvoiceId) throw new BillingError('This quotation has already been converted.');
      const invoice = newInvoice(data, { ...quote, date: today(), dueDate: addDays(today(), 14) }, quote.id);
      invoice.client = { ...quote.client }; invoice.business = { ...quote.business };
      quote.convertedInvoiceId = invoice.id; quote.updatedAt = new Date().toISOString();
      return `Converted ${quote.number} to draft ${invoice.number}.`;
    }
    case 'project.create': {
      find(data.clients, input.value.clientId, 'Client');
      data.projects.push({ ...input.value, id: randomUUID(), state: 'Active', milestones: input.value.milestones.map(m => ({ ...m, id: randomUUID() })) });
      return `Created ${input.value.kind.toLowerCase()} ${input.value.name}.`;
    }
    case 'project.status': {
      const project = find(data.projects, input.id, 'Project'); project.state = input.state;
      return `Marked ${project.name} ${input.state.toLowerCase()}.`;
    }
    case 'project.bill': {
      const project = find(data.projects, input.id, 'Project');
      const milestone = find(project.milestones, input.milestoneId, 'Milestone');
      const invoice = newInvoice(data, { clientId: project.clientId, projectId: project.id, milestoneId: milestone.id, date: today(), dueDate: milestone.dueDate < today() ? today() : milestone.dueDate, items: [{ description: `${project.name} — ${milestone.title}`, quantity: 1, rate: milestone.amount, serviceId: '' }], taxRate: 0, discount: 0, notes: project.notes });
      return `Created ${invoice.number} for ${milestone.title}. Review tax and terms before issuing.`;
    }
    case 'service.save': {
      if (input.id) Object.assign(find(data.services, input.id, 'Service'), input.value);
      else data.services.push({ ...input.value, id: randomUUID() });
      return `Saved service ${input.value.name}.`;
    }
    case 'expense.create': {
      if (input.value.projectId) find(data.projects, input.value.projectId, 'Project');
      const expenseNumber = number(data, 'expense', input.value.date);
      data.expenses.unshift({ ...input.value, id: randomUUID(), number: expenseNumber, voidedAt: '', voidReason: '' });
      return `Recorded expense ${expenseNumber}.`;
    }
    case 'expense.void': {
      const expense = find(data.expenses, input.id, 'Expense');
      if (expense.voidedAt) throw new BillingError('This expense is already void.');
      expense.voidedAt = new Date().toISOString(); expense.voidReason = input.reason;
      return `Voided ${expense.number}: ${input.reason}`;
    }
    case 'recurring.create': {
      const invoice = find(data.invoices, input.invoiceId, 'Invoice');
      if (invoice.state !== 'Issued') throw new BillingError('Create a recurring schedule from an issued invoice.');
      const fields = invoiceSchema.parse(invoice);
      data.recurring.push({ ...fields, milestoneId: '', id: randomUUID(), name: input.name, interval: input.interval, nextDate: input.nextDate, anchorDay: Number(input.nextDate.slice(-2)), active: true });
      return `Created recurring schedule ${input.name}.`;
    }
    case 'recurring.toggle': {
      const schedule = find(data.recurring, input.id, 'Schedule'); schedule.active = input.active;
      return `${input.active ? 'Resumed' : 'Paused'} ${schedule.name}.`;
    }
    case 'recurring.generate': {
      const schedule = find(data.recurring, input.id, 'Schedule');
      if (!schedule.active || schedule.nextDate > today()) throw new BillingError('This schedule is not due yet.');
      const invoice = newInvoice(data, { ...schedule, date: schedule.nextDate, dueDate: addDays(schedule.nextDate, 14) });
      schedule.nextDate = nextRecurrence(schedule.nextDate, schedule.interval, schedule.anchorDay);
      return `Generated draft ${invoice.number}. Next occurrence: ${schedule.nextDate}.`;
    }
    case 'settings': {
      if (data.revision !== input.revision) throw new BillingError('Workspace changed. Refresh before saving business details.', 409);
      data.settings = input.value; return 'Updated business details and payment instructions.';
    }
    case 'user.create': addUser(input.value); return `Created ${input.value.role.toLowerCase()} account ${input.value.username}.`;
    case 'user.toggle': setUserActive(input.id, input.active, actor); return `${input.active ? 'Enabled' : 'Disabled'} staff account.`;
    case 'password': changePassword(actor, input.currentPassword, input.newPassword); return 'Changed account password and ended existing sessions.';
  }
}
