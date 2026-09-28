import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { z } from 'zod';
import { addDays, balance, invoiceCsv, status, today, type BillingData, type User } from '@digitnepal/shared/billing';
import { commandSchema } from '@digitnepal/shared/commands';
import { currentUser, endSession, loginUser, SESSION_COOKIE, SESSION_SECONDS, users } from './auth';
import { initializeDatabase, pool } from './database';
import { applyCommand } from './commands';
import { BillingError, readBilling, updateBilling } from './store';

const frontendOrigin = process.env.FRONTEND_ORIGIN?.replace(/\/$/, '');
if (!frontendOrigin) throw new Error('FRONTEND_ORIGIN is required.');
const port = Number(process.env.PORT || 4000);

function json(response: ServerResponse, value: unknown, code = 200) {
  response.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  response.end(JSON.stringify(value));
}
function file(response: ServerResponse, value: string, name: string, contentType: string) {
  response.writeHead(200, {
    'Content-Type': contentType, 'Content-Disposition': `attachment; filename="${name}"`,
    'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
  });
  response.end(value);
}
function sessionToken(request: IncomingMessage) {
  return request.headers.cookie?.split(';').map(part => part.trim()).find(part => part.startsWith(SESSION_COOKIE + '='))?.slice(SESSION_COOKIE.length + 1);
}
function validOrigin(request: IncomingMessage) { return request.headers.origin === frontendOrigin; }
function setCookie(response: ServerResponse, token: string, maxAge: number) {
  const secure = frontendOrigin?.startsWith('https:') ? '; Secure' : '';
  response.setHeader('Set-Cookie', `${SESSION_COOKIE}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure}`);
}
async function body(request: IncomingMessage): Promise<unknown> {
  let raw = '';
  for await (const chunk of request) {
    raw += chunk;
    if (raw.length > 1024 * 1024) throw new BillingError('Request is too large.', 413);
  }
  return JSON.parse(raw);
}
async function requireUser(request: IncomingMessage): Promise<User> {
  const user = await currentUser(sessionToken(request));
  if (!user) throw new BillingError('Your session has expired. Please log in again.', 401);
  return user;
}
async function workspace(data: BillingData, user: User) {
  return {
    ...data, currentUser: user, users: user.role === 'Admin' ? await users() : [],
    backup: { lastBackup: null, warning: null },
  };
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', 'http://localhost');
  const method = request.method || 'GET';
  try {
    if (url.pathname === '/health' && method === 'GET') {
      await initializeDatabase();
      await pool.query('SELECT 1');
      json(response, { ok: true });
      return;
    }
    if (method === 'POST' || method === 'DELETE') {
      if (!validOrigin(request)) throw new BillingError('Invalid request origin.', 403);
    }
    if (url.pathname === '/api/admin/session') {
      if (method === 'POST') {
        const input = bodySchema.parse(await body(request));
        const token = await loginUser(input.username || 'admin', input.password);
        setCookie(response, token, SESSION_SECONDS);
        json(response, { ok: true });
        return;
      }
      if (method === 'DELETE') {
        await endSession(sessionToken(request));
        setCookie(response, '', 0);
        json(response, { ok: true });
        return;
      }
      if (method === 'GET') {
        json(response, { authenticated: !!(await currentUser(sessionToken(request))) });
        return;
      }
    }
    if (url.pathname === '/api/admin/billing') {
      const user = await requireUser(request);
      if (method === 'GET') {
        json(response, await workspace(await readBilling(), user));
        return;
      }
      if (method === 'POST') {
        const raw = await body(request) as Record<string, unknown>;
        const requestId = z.string().uuid().parse(raw.requestId);
        const input = commandSchema.parse(raw);
        const fingerprint = input.action === 'password'
          ? { action: input.action }
          : input.action === 'user.create'
            ? { action: input.action, username: input.value.username, name: input.value.name, role: input.value.role }
            : input;
        const data = await updateBilling(user, requestId, fingerprint, (data, client) => applyCommand(data, user, input, client));
        json(response, await workspace(data, user));
        return;
      }
    }
    if (url.pathname === '/api/admin/billing/backup' && method === 'GET') {
      const user = await requireUser(request);
      if (user.role !== 'Admin') throw new BillingError('Administrator access required.', 403);
      file(response, JSON.stringify({ exportedAt: new Date().toISOString(), workspace: await readBilling() }, null, 2),
        `digit-nepal-backup-${today()}.json`, 'application/json');
      return;
    }
    if (url.pathname === '/api/admin/billing/export' && method === 'GET') {
      await requireUser(request);
      const data = await readBilling();
      const query = (url.searchParams.get('search') || '').toLowerCase();
      const filter = url.searchParams.get('status') || 'All invoices';
      const from = url.searchParams.get('from') || '';
      const to = url.searchParams.get('to') || '';
      const invoices = data.invoices.filter(invoice =>
        (!from || invoice.date >= from) && (!to || invoice.date <= to)
        && `${invoice.number} ${invoice.client.name} ${invoice.client.email}`.toLowerCase().includes(query)
        && (filter === 'All invoices' || (filter === 'Due soon'
          ? balance(invoice, data.payments) > 0 && invoice.dueDate >= today() && invoice.dueDate <= addDays(today(), 7)
          : status(invoice, data.payments) === filter)),
      );
      file(response, invoiceCsv(invoices, data.payments), `digit-nepal-invoices-${today()}.csv`, 'text/csv; charset=utf-8');
      return;
    }
    json(response, { error: 'Not found.' }, 404);
  } catch (error) {
    if (error instanceof BillingError) return json(response, { error: error.message }, error.status);
    if (error instanceof z.ZodError) return json(response, { error: error.issues[0]?.message || 'Check the form values.' }, 400);
    if (error instanceof SyntaxError || error instanceof TypeError) return json(response, { error: 'Invalid request.' }, 400);
    console.error('Billing request failed:', error);
    json(response, { error: 'Unable to process the request.' }, 500);
  }
});

const bodySchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9._-]{3,40}$/).optional(),
  password: z.string().max(200),
});

server.listen(port, '0.0.0.0', () => console.log(`Billing server listening on ${port}`));
