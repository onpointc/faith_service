export default function Page() {
  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold">Teacher Dashboard (Starter)</h1>
      <p className="text-gray-600 mt-2">Clean, modern base. Hook up data & styling to match your mockups.</p>
      <div className="mt-6 grid md:grid-cols-4 gap-4">
        {['Pending Approvals','Flagged Reflections','Risk Alerts','School Profile'].map((t)=> (
          <div key={t} className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="text-sm text-gray-500">{t}</div>
            <div className="text-2xl font-bold mt-2">--</div>
          </div>
        ))}
      </div>
    </main>
  );
}
