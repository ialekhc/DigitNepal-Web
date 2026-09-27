import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/admin/auth';
import { readBilling } from '@/lib/admin/store';
import { today } from '@/lib/admin/billing';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'Please log in.' }, { status: 401 });
  if (user.role !== 'Admin') return NextResponse.json({ error: 'Administrator access required.' }, { status: 403 });
  return new NextResponse(JSON.stringify({ exportedAt: new Date().toISOString(), workspace: readBilling() }, null, 2), { headers: { 'Content-Type': 'application/json', 'Content-Disposition': `attachment; filename="digit-nepal-backup-${today()}.json"`, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}
