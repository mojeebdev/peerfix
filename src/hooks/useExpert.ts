import { useState } from "react"

export function useExpert() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function applyAsExpert(data: {
    github: string
    bio: string
    expertise: string[]
    yearsExp: number
    hourlyRate: number
  }) {
    setLoading(true)
    try {
      const res = await fetch("/api/expert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      return res.json()
    } catch {
      setError("Application failed")
    } finally {
      setLoading(false)
    }
  }

  return { applyAsExpert, loading, error }
}
