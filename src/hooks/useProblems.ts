import { useState, useEffect } from "react"
import { ProblemWithAuthor } from "@/types"

export function useProblems(filters?: { helpType?: string; status?: string; tag?: string }) {
  const [problems, setProblems] = useState<ProblemWithAuthor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams()
    if (filters?.helpType) params.set("helpType", filters.helpType)
    if (filters?.status) params.set("status", filters.status)
    if (filters?.tag) params.set("tag", filters.tag)

    fetch(`/api/problems?${params}`)
      .then((r) => r.json())
      .then((data) => setProblems(data.problems))
      .catch(() => setError("Failed to load problems"))
      .finally(() => setLoading(false))
  }, [filters?.helpType, filters?.status, filters?.tag])

  return { problems, loading, error }
}
