"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ResponseForm({ problemId }: { problemId: string }) {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch(`/api/problems/${problemId}/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
      setContent("")
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <textarea
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your solution or response..."
        rows={5}
        className="w-full border border-gray-200 focus:border-black rounded-sm px-3 py-2.5 text-sm font-mono outline-none transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="mono text-sm bg-black text-white px-5 py-2.5 rounded-sm self-start hover:bg-gray-900 transition-colors disabled:opacity-50"
      >
        {loading ? "posting..." : "post response →"}
      </button>
    </form>
  )
}
