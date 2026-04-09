"use client"

import { useState, useEffect } from "react"
import ExpertCard from "./ExpertCard"
import { ExpertWithUser } from "@/types"
import EmptyState from "@/components/ui/EmptyState"
import Spinner from "@/components/ui/Spinner"

export default function ExpertQueue() {
  const [experts, setExperts] = useState<ExpertWithUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/expert/available")
      .then((r) => r.json())
      .then((data) => setExperts(data.experts || []))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    )
  }

  if (experts.length === 0) {
    return <EmptyState message="no experts available right now — try free community help" />
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {experts.map((expert) => (
        <ExpertCard key={expert.id} expert={expert} />
      ))}
    </div>
  )
}
