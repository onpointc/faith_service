'use client';
import { useEffect, useState } from 'react';

export default function ActivitiesPage() {
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState({ title:'', description:'', date:'', points:0, yearGroups:'Y10' });

  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8787' + '/activities')
      .then(r=>r.json()).then(setList).catch(()=>{});
  },[]);

  const create = async () => {
    const res = await fetch((process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8787') + '/activities', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({
        ...form,
        yearGroups: [form.yearGroups]
      })
    });
    const a = await res.json();
    setList([a, ...list]);
  };

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold">Activities</h1>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <h2 className="font-medium mb-2">Create Activity</h2>
          <div className="grid gap-2">
            <input className="border p-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
            <textarea className="border p-2 rounded" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
            <input type="datetime-local" className="border p-2 rounded" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
            <input type="number" className="border p-2 rounded" placeholder="Points" value={form.points} onChange={e=>setForm({...form,points:Number(e.target.value)})}/>
            <select className="border p-2 rounded" value={form.yearGroups} onChange={e=>setForm({...form,yearGroups:e.target.value})}>
              {['Y7','Y8','Y9','Y10','Y11','Y12'].map(y=><option key={y}>{y}</option>)}
            </select>
            <button onClick={create} className="bg-teal-600 text-white rounded-lg py-2">Create</button>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <h2 className="font-medium mb-2">Upcoming</h2>
          <ul className="divide-y">
            {list.map(a=> (
              <li key={a.id} className="py-3">
                <div className="font-medium">{a.title} <span className="text-xs text-gray-500">{a.points} pts</span></div>
                <div className="text-sm text-gray-600">{a.description}</div>
                <div className="text-xs text-gray-500">{new Date(a.date).toLocaleString()} · {a.yearGroups?.join(', ')}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
