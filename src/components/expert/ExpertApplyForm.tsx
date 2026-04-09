"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const EXPERTISE_OPTIONS = [
  "Next.js","React","Supabase","Prisma","Auth","Web3",
  "Wagmi","Solidity","Tailwind","PostgreSQL","DevOps",
  "TypeScript","Node.js","API","Python"
]

export default function ExpertApplyForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [expertise, setExpertise] = useState<string[]>([])
  const [form, setForm] = useState({
    github: "",
    bio: "",
    yearsExp: "",
    hourlyRate: "",
    walletAddress: "",
  })

  function toggleExpertise(skill: string) {
    setExpertise(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/expert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, expertise }),
      })
      if (res.ok) router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="mono text-xs text-gray-400 uppercase tracking-widest block mb-2">github / portfolio</label>
        <input
          required
          value={form.github}
          onChange={e => setForm({ ...form, github: e.target.value })}
          placeholder="github.com/yourhandle"
          className="w-full border border-gray-200 focus:border-black rounded-sm px-3 py-2.5 text-sm outline-none transition-colors"
        />
      </div>

      <div>
        <label className="mono text-xs text-gray-400 uppercase tracking-widest block mb-2">expertise</label>
        <div className="flex flex-wrap gap-2">
          {EXPERTISE_OPTIONS.map(skill => (
            <button
              key={skill}
              type="button"
              onClick={() => toggleExpertise(skill)}
              className={`mono text-xs px-2.5 py-1 rounded-sm border transition-colors ${
                expertise.includes(skill)
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-500 hover:border-black"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mono text-xs text-gray-400 uppercase tracking-widest block mb-2">years of experience</label>
          <input
            required
            type="number"
            value={form.yearsExp}
            onChange={e => setForm({ ...form, yearsExp: e.target.value })}
            placeholder="5"
            className="w-full border border-gray-200 focus:border-black rounded-sm px-3 py-2.5 text-sm outline-none transition-colors"
          />
        </div>
        <div>
          <label className="mono text-xs text-gray-400 uppercase tracking-widest block mb-2">hourly rate (USD)</label>
          <div className="flex items-center gap-1">
            <span className="mono text-sm text-gray-400">$</span>
            <input
              required
              type="number"
              value={form.hourlyRate}
              onChange={e => setForm({ ...form, hourlyRate: e.target.value })}
              placeholder="50"
              className="w-full border border-gray-200 focus:border-black rounded-sm px-3 py-2.5 text-sm outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="mono text-xs text-gray-400 uppercase tracking-widest block mb-2">why should we approve you?</label>
        <textarea
          required
          value={form.bio}
          onChange={e => setForm({ ...form, bio: e.target.value })}
          placeholder="Describe your experience, notable projects, what kind of problems you solve best..."
          rows={4}
          className="w-full border border-gray-200 focus:border-black rounded-sm px-3 py-2.5 text-sm font-mono outline-none transition-colors resize-none"
        />
      </div>

      <div>
        <label className="mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
          wallet address <span className="text-gray-300 normal-case">(for payouts on Base)</span>
        </label>
        <input
          required
          value={form.walletAddress}
          onChange={e => setForm({ ...form, walletAddress: e.target.value })}
          placeholder="0x..."
          className="w-full border border-gray-200 focus:border-black rounded-sm px-3 py-2.5 text-sm font-mono outline-none transition-colors"
        />
        <p className="mono text-[10px] text-gray-400 mt-1">
          USDC on Base — 85% of each paid problem auto-sent on solve
        </p>
      </div>

      <button
        type="submit"
        disabled={loading || expertise.length === 0}
        className="mono text-sm bg-black text-white px-6 py-3 rounded-sm hover:bg-gray-900 transition-colors disabled:opacity-50"
      >
        {loading ? "submitting..." : "submit application →"}
      </button>
    </form>
  )
}
