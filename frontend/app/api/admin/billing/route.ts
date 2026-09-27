import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { currentUser, users } from '@/lib/admin/auth';
import { readBilling, updateBilling, BillingError } from '@/lib/admin/store';
import { backupStatus } from '@/lib/admin/database';
import { applyCommand, commandSchema } from '@/lib/admin/commands';
import type { BillingData, User } from '@/lib/admin/billing';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const json = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
function workspace(data: BillingData, user: User) { return { ...data, currentUser: user, users: user.role === 'Admin' ? users() : [], backup: backupStatus() }; }
export async function GET() {
  try {
    const user = await currentUser();
    if (!user) return json({ error: 'Your session has expired. Please log in again.' }, 401);
    return json(workspace(readBilling(), user));
  } catch (error) { console.error('Billing read failed:', error); return json({ error: 'Unable to read billing records. Check server storage.' }, 500); }
}
export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) return json({ error: 'Your session has expired. Please log in again.' }, 401);
    if (request.headers.get('origin') !== request.nextUrl.origin) return json({ error: 'Invalid request origin.' }, 403);
    const raw = await request.json();
    const requestId = z.string().uuid().parse(raw.requestId);
    const input = commandSchema.parse(raw);
    // Never retain passwords, or a fast hash derived from them, in the operation log.
    const fingerprint = input.action === 'password' ? { action: input.action } : input.action === 'user.create' ? { action: input.action, username: input.value.username, name: input.value.name, role: input.value.role } : input;
    const data = updateBilling(user, requestId, fingerprint, data => applyCommand(data, user, input));
    return json(workspace(data, user));
  } catch (error) {
    if (error instanceof BillingError) return json({ error: error.message }, error.status);
    if (error instanceof z.ZodError) return json({ error: error.issues[0]?.message || 'Check the form values.' }, 400);
    if (error instanceof SyntaxError || error instanceof TypeError) return json({ error: 'Invalid request.' }, 400);
    console.error('Billing save failed:', error);
    return json({ error: 'Unable to save changes. Please try again.' }, 500);
  }
}
