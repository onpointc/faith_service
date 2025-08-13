'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase';

export default function Header() {
  const supabase = getSupabaseBrowser();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => { sub?.subscription.unsubscribe(); };
  }, []);

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/" className="font-semibold">St. Thomas College</Link>
        <nav className="flex gap-3 text-sm text-gray-600">
          <Link href="/activities">Activities</Link>
          <Link href="/submissions">Submissions</Link>
          <Link href="/news">News</Link>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          {user ? (
            <>
              <Link href="/profile" className="text-sm">Profile</Link>
              <button
                onClick={() => supabase.auth.signOut()}
                className="px-3 py-1 rounded bg-gray-100 border"
              >Sign out</button>
            </>
          ) : (
            <Link href="/login" className="px-3 py-1 rounded bg-teal-600 text-white text-sm">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  );
}
