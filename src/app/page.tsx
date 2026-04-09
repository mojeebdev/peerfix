import { prisma } from "@/lib/prisma"
import ProblemFeed from "@/components/problems/ProblemFeed"
import FilterTabs from "@/components/problems/FilterTabs"
import Link from "next/link"

export const revalidate = 0

async function getStats() {
  const [solved, experts, problems] = await Promise.all([
    prisma.problem.count({ where: { status: "SOLVED" } }),
    prisma.expert.count({ where: { status: "APPROVED", isAvailable: true } }),
    prisma.problem.count(),
  ])
  return { solved, experts, problems }
}

async function getProblems() {
  return prisma.problem.findMany({
    include: {
      author: { select: { id: true, name: true, image: true } },
      _count: { select: { responses: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  })
}

export default async function HomePage() {
  const [stats, problems] = await Promise.all([getStats(), getProblems()])

  return (
    <div className="max-w-6xl mx-auto px-4">
      <section className="py-16 border-b border-black">
        <p className="mono text-xs text-gray-400 tracking-widest uppercase mb-3">
          peerfix.dev · builders helping builders
        </p>
        <h1 className="text-5xl font-semibold tracking-tighter text-black leading-none mb-4">
          Get your<br />
          <span className="underline decoration-2 underline-offset-4">fix.</span>
        </h1>
        <p className="text-sm text-gray-500 mb-8 max-w-md leading-relaxed">
          Post a blocker, get free community help or pay an expert to solve it instantly.
        </p>
        <div className="flex gap-3">
          <Link
            href="/problems/new"
            className="mono text-sm bg-black text-white px-5 py-2.5 rounded-sm hover:bg-gray-900 transition-colors"
          >
            post for free
          </Link>
          <Link
            href="/expert/apply"
            className="mono text-sm border border-black text-black px-5 py-2.5 rounded-sm hover:bg-gray-50 transition-colors"
          >
            become an expert →
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-4 border-b border-black">
        {[
          { value: stats.solved.toLocaleString(), label: "problems solved" },
          { value: stats.experts.toString(), label: "experts online" },
          { value: stats.problems.toLocaleString(), label: "total problems" },
          { value: "4m", label: "avg response" },
        ].map((s: any) => (
          <div key={s.label} className="py-4 px-4 border-r border-black last:border-r-0">
            <div className="text-2xl font-semibold text-black">{s.value}</div>
            <div className="mono text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-black">open problems</h2>
          <FilterTabs />
        </div>
        <ProblemFeed initialProblems={problems as any} />
      </section>
    </div>
  )
}
