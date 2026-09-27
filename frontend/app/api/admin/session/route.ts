import { NextRequest, NextResponse } from 'next/server';
import { endSession, loginUser, SESSION_COOKIE, SESSION_SECONDS } from '@/lib/admin/auth';
import { BillingError } from '@/lib/admin/store';

export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  try {
    const body = await request.json();
    const username = body.username || 'admin';
    if (typeof username !== 'string' || !/^[a-zA-Z0-9._-]{3,40}$/.test(username) || typeof body.password !== 'string' || body.password.length > 200) return NextResponse.json({ error: 'Enter a valid username and password.' }, { status: 400 });
    const token = loginUser(username, body.password);
    const response = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
    response.cookies.set(SESSION_COOKIE, token, { httpOnly: true, sameSite: 'strict', secure: request.nextUrl.protocol === 'https:', path: '/', maxAge: SESSION_SECONDS });
    return response;
  } catch (error) {
    if (error instanceof BillingError) return NextResponse.json({ error: error.message }, { status: error.status });
    if (error instanceof SyntaxError || error instanceof TypeError) return NextResponse.json({ error: 'Invalid login request.' }, { status: 400 });
    console.error('Login failed:', error);
    return NextResponse.json({ error: 'Unable to sign in. Please try again.' }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  await endSession();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, '', { httpOnly: true, sameSite: 'strict', path: '/', maxAge: 0 });
  return response;
}
