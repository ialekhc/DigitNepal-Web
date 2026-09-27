import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/auth';
import { readBilling } from '@/lib/admin/store';
import { invoiceCsv, status, today, addDays, balance } from '@/lib/admin/billing';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Please log in again.' }, { status: 401 });
  try {
    const data = await readBilling();
    const query = (request.nextUrl.searchParams.get('search') || '').toLowerCase();
    const filter = request.nextUrl.searchParams.get('status') || 'All invoices';
    const from = request.nextUrl.searchParams.get('from') || '';
    const to = request.nextUrl.searchParams.get('to') || ''; 
    const invoices = data.invoices.filter(invoice => (!from || invoice.date >= from) && (!to || invoice.date <= to) && `${invoice.number} ${invoice.client.name} ${invoice.client.email}`.toLowerCase().includes(query) && (filter === 'All invoices' || (filter === 'Due soon' ? balance(invoice, data.payments) > 0 && invoice.dueDate >= today() && invoice.dueDate <= addDays(today(), 7) : status(invoice, data.payments) === filter)));
    return new NextResponse(invoiceCsv(invoices, data.payments), { headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="digit-nepal-invoices-${today()}.csv"`,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    } });
  } catch (error) {
    console.error('Invoice export failed:', error);
    return NextResponse.json({ error: 'Unable to export billing records.' }, { status: 500 });
  }
}

