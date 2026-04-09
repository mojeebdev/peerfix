"use client"

import { useRouter, useSearchParams } from "next/navigation"

const tabs = [
  { label: "all", value: "" },
  { label: "free", value: "FREE" },
  { label: "paid", value: "PAID" },
  { label: "solved", value: "SOLVED" },
]

export default function FilterTabs() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get("helpType") || searchParams.get("status") || ""

  function handleTab(value: string) {
    const params = new URLSearchParams()
    if (value === "SOLVED") params.set("status", "SOLVED")
    else if (value) params.set("helpType", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex gap-1">
      {tabs.map((tab: any) => (
        <button
          key={tab.value}
          onClick={() => handleTab(tab.value)}
          className={`mono text-xs px-3 py-1.5 rounded-sm border transition-colors ${
            current === tab.value
              ? "bg-black text-white border-black"
              : "border-gray-200 text-gray-500 hover:border-black hover:text-black"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
