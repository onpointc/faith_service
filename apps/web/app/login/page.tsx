'use client';
import { useState } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase';
import Link from 'next/link';

export default function LoginPage() {
  const supabase = getSupabaseBrowser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const signIn = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMsg(error ? error.message : 'Signed in! You can close this page.');
  };

  const signUp = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    setMsg(error ? error.message : 'Check your inbox to confirm your email.');
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <form className="grid gap-3" onSubmit={signIn}>
        <input className="border p-2 rounded" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="border p-2 rounded" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="bg-teal-600 text-white rounded py-2">Sign in</button>
        <button type="button" className="border rounded py-2" onClick={signUp}>Create account</button>
      </form>
      {msg && <p className="mt-3 text-sm text-gray-600">{msg}</p>}
      <p className="mt-6 text-sm"><Link href="/">Back to dashboard</Link></p>
    </main>
  );
}
