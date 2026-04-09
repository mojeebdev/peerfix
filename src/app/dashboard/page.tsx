import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { buildProblemUrl, timeAgo } from "@/lib/utils"

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const problems = await prisma.problem.findMany({
    where: { authorId: session.user.id },
    include: { _count: { select: { responses: true } } },
    orderBy: { createdAt: "desc" },
  })

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { reputation: true, _count: { select: { problems: true, responses: true } } },
  })

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-black">
        <div>
          <p className="mono text-xs text-gray-400 uppercase tracking-widest mb-1">dashboard</p>
          <h1 className="text-3xl font-semibold tracking-tighter">
            {session.user.name?.split(" ")[0]}.
          </h1>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold">{user?.reputation}</div>
          <div className="mono text-xs text-gray-400">reputation</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="border border-black rounded-sm p-4">
          <div className="text-2xl font-semibold">{user?._count.problems}</div>
          <div className="mono text-xs text-gray-400 mt-1">problems posted</div>
        </div>
        <div className="border border-black rounded-sm p-4">
          <div className="text-2xl font-semibold">{user?._count.responses}</div>
          <div className="mono text-xs text-gray-400 mt-1">responses given</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold mono">your problems</h2>
        <Link href="/problems/new" className="mono text-xs bg-black text-white px-3 py-1.5 rounded-sm">
          + new
        </Link>
      </div>

      {problems.length === 0 ? (
        <div className="border border-dashed border-gray-200 rounded-sm p-8 text-center">
          <p className="mono text-xs text-gray-400">no problems posted yet</p>
        </div>
      ) : (
        problems.map((p) => (
          <div key={p.id} className="border-t border-gray-100 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{p.title}</p>
              <p className="mono text-xs text-gray-400 mt-1">
                {p.status.toLowerCase()} · {p._count.responses} responses · {timeAgo(p.createdAt)}
              </p>
            </div>
            <Link
              href={buildProblemUrl(p.problemNumber, p.slug)}
              className="mono text-xs border border-black px-3 py-1.5 rounded-sm"
            >
              view →
            </Link>
          </div>
        ))
      )}
    </div>
  )
}
