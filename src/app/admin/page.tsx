import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import AdminStats from "@/components/admin/AdminStats"
import Link from "next/link"

export default async function AdminPage() {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") redirect("/")

  const [totalUsers, totalProblems, totalExperts, totalSolved, pendingExperts, totalPayments] =
    await Promise.all([
      prisma.user.count(),
      prisma.problem.count(),
      prisma.expert.count({ where: { status: "APPROVED" } }),
      prisma.problem.count({ where: { status: "SOLVED" } }),
      prisma.expert.count({ where: { status: "PENDING" } }),
      prisma.payment.aggregate({ where: { status: "CONFIRMED" }, _sum: { amount: true } }),
    ])

  const recentProblems = await prisma.problem.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8 pb-6 border-b border-black">
        <p className="mono text-xs text-gray-400 uppercase tracking-widest mb-1">admin</p>
        <h1 className="text-3xl font-semibold tracking-tighter">Overview</h1>
      </div>

      <AdminStats
        stats={{
          totalUsers,
          totalProblems,
          totalExperts,
          totalSolved,
          pendingExperts,
          totalRevenue: totalPayments._sum.amount || 0,
        }}
      />

      <div className="mt-10 grid grid-cols-2 gap-4 mb-8">
        <Link
          href="/admin/experts"
          className="border border-black rounded-sm p-5 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-sm">expert applications</h2>
            {pendingExperts > 0 && (
              <span className="mono text-xs bg-black text-white px-2 py-0.5 rounded-sm">
                {pendingExperts} pending
              </span>
            )}
          </div>
          <p className="mono text-xs text-gray-400">review, approve, or dismiss applicants</p>
        </Link>

        <Link
          href="/problems"
          className="border border-gray-200 rounded-sm p-5 hover:bg-gray-50 transition-colors"
        >
          <h2 className="font-semibold text-sm mb-2">all problems</h2>
          <p className="mono text-xs text-gray-400">browse and moderate the problem feed</p>
        </Link>
      </div>

      <div>
        <h2 className="mono text-xs uppercase tracking-widest text-gray-400 mb-4">recent problems</h2>
        {recentProblems.map((p) => (
          <div key={p.id} className="border-t border-gray-100 py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{p.title}</p>
              <p className="mono text-xs text-gray-400 mt-0.5">
                by {p.author.name} · {p.status.toLowerCase()}
              </p>
            </div>
            <Link
              href={`/problems/${p.problemNumber}/${p.slug}`}
              className="mono text-xs border border-gray-200 px-3 py-1.5 rounded-sm hover:border-black transition-colors"
            >
              view →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
