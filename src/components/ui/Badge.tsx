"use client"

const config: Record<string, { label: string; className: string }> = {
  FREE:        { label: "free",        className: "border-gray-300 text-gray-500" },
  PAID:        { label: "paid",        className: "border-black text-black" },
  OPEN:        { label: "open",        className: "border-gray-300 text-gray-500" },
  IN_PROGRESS: { label: "in progress", className: "border-blue-400 text-blue-600" },
  SOLVED:      { label: "solved",      className: "border-green-500 text-green-700" },
  CLOSED:      { label: "closed",      className: "border-gray-200 text-gray-400" },
}

export default function Badge({ type }: { type: string }) {
  const c = config[type] || { label: type.toLowerCase(), className: "border-gray-200 text-gray-400" }
  return (
    <span className={`mono text-[10px] px-2 py-0.5 rounded-sm border ${c.className}`}>
      {c.label}
    </span>
  )
}
