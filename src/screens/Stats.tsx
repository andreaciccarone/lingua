export default function Stats() {
  return (
    <div className="pt-4">
      <h1 className="mb-6 text-2xl font-bold">Stats</h1>
      <div className="grid grid-cols-2 gap-3">
        {[
          ['Streak', '0 days'],
          ['XP today', '0'],
          ['Words learned', '0'],
          ['Topics gold', '0'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-400">{label}</p>
            <p className="text-xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
