'use client';
import { useEffect, useState } from 'react';

const base = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8787');

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [schoolId, setSchoolId] = useState('school-id-demo');

  useEffect(()=>{
    fetch(`${base}/news?schoolId=${schoolId}`).then(r=>r.json()).then(setPosts);
  },[]);

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold">School News</h1>
      <div className="mt-4 grid md:grid-cols-3 gap-4">
        {posts.map(p => (
          <article key={p.id} className="bg-white border rounded-xl overflow-hidden shadow-sm">
            {p.coverUrl && <img src={p.coverUrl} className="w-full h-40 object-cover" alt="" />}
            <div className="p-4">
              <h2 className="font-medium">{p.title}</h2>
              <div className="text-xs text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
