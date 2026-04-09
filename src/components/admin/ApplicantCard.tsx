"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Avatar from "@/components/ui/Avatar"
import { ExpertWithUser } from "@/types"

export default function ApplicantCard({ expert }: { expert: ExpertWithUser }) {
  const [loading, setLoading] = useState<"approve" | "dismiss" | null>(null)
  const router = useRouter()

  async function updateStatus(status: "APPROVED" | "DISMISSED") {
    setLoading(status === "APPROVED" ? "approve" : "dismiss")
    await fetch(`/api/expert/${expert.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    router.refresh()
    setLoading(null)
  }

  return (
    <div className="border border-gray-200 rounded-sm p-5">
      <div className="flex items-start gap-3 mb-4">
        <Avatar name={expert.user.name} image={expert.user.image} size={36} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm">{expert.user.name}</p>
            <span className={`mono text-[10px] px-2 py-0.5 rounded-sm border ${
              expert.status === "PENDING"   ? "border-gray-200 text-gray-400" :
              expert.status === "APPROVED"  ? "bg-black text-white border-black" :
              "border-gray-200 text-gray-300 line-through"
            }`}>
              {expert.status.toLowerCase()}
            </span>
          </div>
          <p className="mono text-xs text-gray-400">{expert.user.email}</p>
          {expert.github && (
            <a href={`https://${expert.github}`} target="_blank" rel="noreferrer" className="mono text-xs text-blue-500 hover:underline">
              {expert.github}
            </a>
          )}
        </div>
      </div>

      <div className="mb-3">
        <p className="mono text-[10px] text-gray-400 uppercase tracking-widest mb-1">expertise</p>
        <div className="flex flex-wrap gap-1.5">
          {expert.expertise.map((skill) => (
            <span key={skill} className="mono text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-sm">{skill}</span>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-sm p-3 text-xs text-gray-600 font-mono mb-3 border-l-2 border-black">
        "{expert.bio}"
      </div>

      <div className="flex gap-4 mb-4">
        <span className="mono text-xs text-gray-400">exp: <span className="text-black">{expert.yearsExp} yrs</span></span>
        <span className="mono text-xs text-gray-400">rate: <span className="text-black">${expert.hourlyRate}/hr</span></span>
        <span className="mono text-xs text-gray-400">rep: <span className="text-black">{expert.user.reputation}</span></span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => updateStatus("APPROVED")}
          disabled={!!loading || expert.status === "APPROVED"}
          className="flex-1 mono text-xs bg-black text-white py-2 rounded-sm hover:bg-gray-900 transition-colors disabled:opacity-40"
        >
          {loading === "approve" ? "approving..." : expert.status === "APPROVED" ? "approved" : "approve"}
        </button>
        <button
          onClick={() => updateStatus("DISMISSED")}
          disabled={!!loading || expert.status === "DISMISSED"}
          className="flex-1 mono text-xs border border-gray-200 text-gray-500 py-2 rounded-sm hover:border-black hover:text-black transition-colors disabled:opacity-40"
        >
          {loading === "dismiss" ? "dismissing..." : expert.status === "DISMISSED" ? "dismissed" : "dismiss"}
        </button>
      </div>
    </div>
  )
}
