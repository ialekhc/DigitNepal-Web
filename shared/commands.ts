import { z } from 'zod';
import { clientSchema, dateSchema, expenseSchema, invoiceSchema, paymentSchema, projectSchema, serviceSchema, settingsSchema, text } from './billing';
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
