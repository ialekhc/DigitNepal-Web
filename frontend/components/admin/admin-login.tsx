'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react';

export function AdminLogin() {
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError('');
    try {
      const form = new FormData(event.currentTarget);
      const password = form.get('password');
      const username = form.get('username');
      const response = await fetch('/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to sign in. Please try again.');
      window.location.assign('/admin/dashboard');
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to connect. Please try again.'); setBusy(false); }
  }

  return <main className="billing-login">
    <Link href="/" className="billing-back"><ArrowLeft size={17} />Back to website</Link>
    <div className="login-composition">
      <section className="login-story">
        <Image src="/brand/logo-light.png" alt="Digit Nepal" width={214} height={112} className="billing-logo" priority />
        <span className="billing-eyebrow"><span />THE BUSINESS SIDE OF BRILLIANT.</span>
        <h1>Great work.<br />Beautifully <em>billed.</em></h1>
        <p>A little less admin. A lot more possibility.<br />Your business, brought into focus.</p>
        <div className="login-feature-list">{['Invoices that make an impression', 'Every payment, in perspective', 'One space for all your clients'].map(text => <div key={text}><Check size={15} />{text}</div>)}</div>
        <div className="login-art" aria-hidden="true"><div className="login-art-icon"><Sparkles size={26} /></div><div><small>FROM PROJECT TO PAYMENT</small><strong>Keep the momentum.</strong></div><div className="mini-bars">{[25, 40, 33, 58, 48, 73, 88].map((height, i) => <span key={i} style={{ height }} />)}</div></div>
      </section>
      <section className="login-card" aria-labelledby="login-heading">
        <div className="login-lock"><LockKeyhole size={26} /></div>
        <span className="billing-eyebrow">ADMIN ACCESS</span>
        <h2 id="login-heading">Welcome back.</h2>
        <p>Your billing workspace is one step away.</p>
        <form onSubmit={login}>
          <label htmlFor="admin-username">Username</label>
          <div className="password-field login-username"><input id="admin-username" name="username" defaultValue="admin" autoComplete="username" required maxLength={40} /></div>
          <label htmlFor="admin-password">Password</label>
          <div className="password-field"><LockKeyhole size={18} /><input id="admin-password" name="password" type={visible ? 'text' : 'password'} placeholder="Enter your password" autoComplete="current-password" required maxLength={200} autoFocus aria-describedby={error ? 'login-error' : undefined} aria-invalid={!!error} /><button type="button" aria-label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible(!visible)}>{visible ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
          {error && <p id="login-error" role="alert" className="billing-error">{error}</p>}
          <button className="billing-primary login-submit" disabled={busy}>{busy ? 'Signing in…' : 'Login'}<ArrowRight size={18} /></button>
        </form>
        <div className="login-security"><ShieldCheck size={15} />Protected administrator workspace</div>
        <div className="login-card-footer">DIGIT NEPAL <span>BILLING STUDIO</span></div>
      </section>
    </div>
    <footer className="login-footer">Built for the work you do. Designed for what comes next.<span>© {new Date().getFullYear()} Digit Nepal</span></footer>
  </main>;
}
