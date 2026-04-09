interface Stats {
  totalUsers: number
  totalProblems: number
  totalExperts: number
  totalSolved: number
  pendingExperts: number
  totalRevenue: number
}

export default function AdminStats({ stats }: { stats: Stats }) {
  const items = [
    { label: "total users",      value: stats.totalUsers.toLocaleString() },
    { label: "total problems",   value: stats.totalProblems.toLocaleString() },
    { label: "active experts",   value: stats.totalExperts.toLocaleString() },
    { label: "problems solved",  value: stats.totalSolved.toLocaleString() },
    { label: "pending experts",  value: stats.pendingExperts.toLocaleString() },
    { label: "total revenue",    value: `$${stats.totalRevenue.toLocaleString()}` },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div key={item.label} className="bg-gray-50 rounded-sm p-4">
          <div className="mono text-xs text-gray-400 mb-1">{item.label}</div>
          <div className="text-2xl font-semibold tracking-tight">{item.value}</div>
        </div>
      ))}
    </div>
  )
}
