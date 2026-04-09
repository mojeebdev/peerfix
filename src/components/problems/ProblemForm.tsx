"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { buildProblemUrl } from "@/lib/utils"

const SKILL_OPTIONS = ["Next.js","React","Supabase","Prisma","Auth","Web3","Wagmi","Solidity","Tailwind","PostgreSQL","DevOps","TypeScript","Node.js","API","CSS","Python"]

export default function ProblemForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [helpType, setHelpType] = useState<"FREE" | "PAID">("FREE")
  const [tags, setTags] = useState<string[]>([])
  const [form, setForm] = useState({ title: "", description: "", budget: "" })

  function toggleTag(tag: string) {
    setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/problems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, helpType, tags, budget: form.budget ? parseFloat(form.budget) : null }),
      })
      const data = await res.json()
      if (data.problem) {
        router.push(buildProblemUrl(data.problem.problemNumber, data.problem.slug))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="mono text-xs text-gray-400 uppercase tracking-widest block mb-2">title</label>
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="NextAuth v5 session drops after Vercel deploy"
          className="w-full border border-gray-200 focus:border-black rounded-sm px-3 py-2.5 text-sm outline-none transition-colors"
        />
      </div>

      <div>
        <label className="mono text-xs text-gray-400 uppercase tracking-widest block mb-2">description</label>
        <textarea
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe what you tried, what you expected, what happened. Include error messages and relevant code..."
          rows={6}
          className="w-full border border-gray-200 focus:border-black rounded-sm px-3 py-2.5 text-sm font-mono outline-none transition-colors resize-none"
        />
      </div>

      <div>
        <label className="mono text-xs text-gray-400 uppercase tracking-widest block mb-2">tags</label>
        <div className="flex flex-wrap gap-2">
          {SKILL_OPTIONS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`mono text-xs px-2.5 py-1 rounded-sm border transition-colors ${
                tags.includes(tag) ? "bg-black text-white border-black" : "border-gray-200 text-gray-500 hover:border-black"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mono text-xs text-gray-400 uppercase tracking-widest block mb-2">help type</label>
        <div className="flex gap-2">
          {(["FREE", "PAID"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setHelpType(type)}
              className={`mono text-xs px-4 py-2 rounded-sm border transition-colors ${
                helpType === type ? "bg-black text-white border-black" : "border-gray-200 text-gray-500 hover:border-black"
              }`}
            >
              {type.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {helpType === "PAID" && (
        <div>
          <label className="mono text-xs text-gray-400 uppercase tracking-widest block mb-2">budget (USD)</label>
          <div className="flex items-center gap-2">
            <span className="mono text-sm text-gray-400">$</span>
            <input
              type="number"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              placeholder="50"
              className="w-32 border border-gray-200 focus:border-black rounded-sm px-3 py-2.5 text-sm outline-none transition-colors"
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mono text-sm bg-black text-white px-6 py-3 rounded-sm hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "posting..." : "post problem →"}
      </button>
    </form>
  )
}
