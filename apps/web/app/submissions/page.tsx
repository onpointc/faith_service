'use client';
import { useEffect, useState } from 'react';

export default function SubmissionsPage() {
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8787');
  const [list, setList] = useState<any[]>([]);
  const [filter, setFilter] = useState('PENDING');

  const load = async () => {
    const r = await fetch(`${base}/submissions?status=${filter}`);
    const j = await r.json();
    setList(j);
  };

  useEffect(()=>{ load(); },[filter]);

  const reply = async (id: string, content: string) => {
    await fetch(`${base}/submissions/${id}/reply`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ content })
    });
    await load();
  };

  const approve = async (id: string, approve: boolean, points: number) => {
    await fetch(`${base}/submissions/${id}/approve`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ approve, points })
    });
    await load();
  };

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold">Submissions</h1>
      <div className="mt-4 flex gap-2">
        {['PENDING','APPROVED','REJECTED'].map(s=>(
          <button key={s} onClick={()=>setFilter(s)} className={`px-3 py-1 rounded border ${filter===s?'bg-teal-600 text-white':'bg-white'}`}>{s}</button>
        ))}
      </div>
      <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-gray-500"><th>Student</th><th>Activity</th><th>Date</th><th>Minutes</th><th>Points</th><th>Actions</th></tr></thead>
          <tbody>
            {list.map((s:any)=>(
              <tr key={s.id} className="border-t">
                <td>{s.student?.user?.fullName || s.studentId}</td>
                <td>{s.activity?.title}</td>
                <td>{new Date(s.dateCompleted).toLocaleDateString()}</td>
                <td>{s.minutesSpent}</td>
                <td>{s.pointsAwarded}</td>
                <td className="space-x-2">
                  <button onClick={()=>approve(s.id,true,s.activity?.points || 0)} className="px-2 py-1 rounded bg-teal-600 text-white">Approve</button>
                  <button onClick={()=>approve(s.id,false,0)} className="px-2 py-1 rounded border">Reject</button>
                  <button onClick={()=>reply(s.id, prompt('Reply to student?') || '')} className="px-2 py-1 rounded border">Reply</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
