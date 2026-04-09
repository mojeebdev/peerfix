"use client"

import { ProblemWithAuthor } from "@/types"
import ProblemCard from "./ProblemCard"
import EmptyState from "@/components/ui/EmptyState"
import Link from "next/link"

export default function ProblemFeed({ initialProblems }: { initialProblems: ProblemWithAuthor[] }) {
  if (initialProblems.length === 0) {
    return (
      <EmptyState
        message="no problems yet — be the first"
        action={
          <Link href="/problems/new" className="mono text-xs bg-black text-white px-4 py-2 rounded-sm inline-block">
            post a problem
          </Link>
        }
      />
    )
  }

  return (
    <div>
      {initialProblems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  )
}
