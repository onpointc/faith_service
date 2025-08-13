'use client';
import { useEffect, useState } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase';

export default function ProfilePage() {
  const supabase = getSupabaseBrowser();
  const [user, setUser] = useState<any>(null);
  useEffect(()=>{ supabase.auth.getUser().then(({data})=>setUser(data.user)); },[]);
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold">Profile</h1>
      {user ? (
        <pre className="bg-white border rounded p-4 mt-4 overflow-auto text-sm">{JSON.stringify(user, null, 2)}</pre>
      ) : (
        <p className="text-gray-600 mt-2">Not signed in.</p>
      )}
    </main>
  );
}
