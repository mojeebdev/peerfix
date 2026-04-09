import { prisma } from "@/lib/prisma"
import ProblemFeed from "@/components/problems/ProblemFeed"
import FilterTabs from "@/components/problems/FilterTabs"
import Link from "next/link"

export default async function ProblemsPage({
  searchParams,
}: {
  searchParams: { helpType?: string; status?: string; tag?: string }
}) {
  const problems = await prisma.problem.findMany({
    where: {
      ...(searchParams.helpType && { helpType: searchParams.helpType as any }),
      ...(searchParams.status && { status: searchParams.status as any }),
      ...(searchParams.tag && { tags: { has: searchParams.tag } }),
    },
    include: {
      author: { select: { id: true, name: true, image: true } },
      _count: { select: { responses: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 40,
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-black">
        <div>
          <h1 className="text-3xl font-semibold tracking-tighter">problems</h1>
          <p className="mono text-xs text-gray-400 mt-1">{problems.length} open right now</p>
        </div>
        <div className="flex items-center gap-3">
          <FilterTabs />
          <Link
            href="/problems/new"
            className="mono text-xs bg-black text-white px-4 py-2 rounded-sm"
          >
            + post problem
          </Link>
        </div>
      </div>
      <ProblemFeed initialProblems={problems as any} />
    </div>
  )
}
