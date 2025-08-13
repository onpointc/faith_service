'use client';
import { useEffect, useState } from 'react';

const base = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8787');

export default function NewsAdminPage() {
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState({ title:'', body:'', coverUrl:'', tags:'' as any, published:true });
  const [schoolId, setSchoolId] = useState('school-id-demo');

  const loadAll = async () => {
    const r = await fetch(`${base}/news/all?schoolId=${schoolId}`);
    setList(await r.json());
  };

  useEffect(()=>{ loadAll(); },[]);

  const create = async () => {
    const r = await fetch(`${base}/news`, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({
        schoolId,
        title: form.title,
        body: form.body,
        coverUrl: form.coverUrl || undefined,
        tags: form.tags ? form.tags.split(',').map((t:string)=>t.trim()) : [],
        published: form.published
      })
    });
    if (r.ok) { setForm({ title:'', body:'', coverUrl:'', tags:'', published:true }); await loadAll(); }
  };

  const togglePublish = async (id:string, published:boolean) => {
    await fetch(`${base}/news/${id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ published })});
    await loadAll();
  };

  const remove = async (id:string) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`${base}/news/${id}`, { method:'DELETE' });
    await loadAll();
  };

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold">News / Blog (Admin)</h1>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="font-medium mb-2">Create Post</h2>
          <div className="grid gap-2">
            <input className="border p-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
            <textarea className="border p-2 rounded min-h-[120px]" placeholder="Body" value={form.body} onChange={e=>setForm({...form,body:e.target.value})}/>
            <input className="border p-2 rounded" placeholder="Cover Image URL" value={form.coverUrl} onChange={e=>setForm({...form,coverUrl:e.target.value})}/>
            <input className="border p-2 rounded" placeholder="Tags (comma separated)" value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})}/>
            <label className="text-sm flex items-center gap-2">
              <input type="checkbox" checked={form.published} onChange={e=>setForm({...form,published:e.target.checked})}/> Published
            </label>
            <button onClick={create} className="bg-teal-600 text-white rounded py-2">Publish</button>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="font-medium mb-2">All Posts</h2>
          <ul className="divide-y">
            {list.map(p=> (
              <li key={p.id} className="py-3 flex gap-3 items-start">
                {p.coverUrl ? <img src={p.coverUrl} alt="" className="w-20 h-14 object-cover rounded" /> : <div className="w-20 h-14 bg-gray-100 rounded"/>}
                <div className="flex-1">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-gray-500">{new Date(p.createdAt).toLocaleString()} · {p.published ? 'Published' : 'Draft'}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>togglePublish(p.id, !p.published)} className="px-2 py-1 rounded border">{p.published ? 'Unpublish' : 'Publish'}</button>
                  <button onClick={()=>remove(p.id)} className="px-2 py-1 rounded border">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
