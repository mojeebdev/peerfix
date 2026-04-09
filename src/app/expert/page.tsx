import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function ExpertDashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const expert = await prisma.expert.findUnique({
    where: { userId: session.user.id },
  })

  if (!expert || expert.status !== "APPROVED") redirect("/expert/apply")

  const assignedProblems = await prisma.problem.findMany({
    where: { expertId: expert.id, status: { in: ["OPEN", "IN_PROGRESS"] } },
    include: { author: { select: { name: true } }, _count: { select: { responses: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-black">
        <div>
          <p className="mono text-xs text-gray-400 uppercase tracking-widest mb-1">expert dashboard</p>
          <h1 className="text-3xl font-semibold tracking-tighter">Hey, {session.user.name?.split(" ")[0]}.</h1>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold">${expert.earnings.toFixed(2)}</div>
          <div className="mono text-xs text-gray-400">total earned</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "rate", value: `$${expert.hourlyRate}/hr` },
          { label: "experience", value: `${expert.yearsExp} yrs` },
          { label: "status", value: expert.isAvailable ? "available" : "busy" },
        ].map((s) => (
          <div key={s.label} className="border border-black rounded-sm p-4">
            <div className="mono text-xs text-gray-400 mb-1">{s.label}</div>
            <div className="font-semibold">{s.value}</div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-sm font-semibold mono mb-4">assigned problems ({assignedProblems.length})</h2>
        {assignedProblems.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-sm p-8 text-center">
            <p className="mono text-xs text-gray-400">no assigned problems — browse the feed</p>
            <Link href="/problems" className="mono text-xs bg-black text-white px-4 py-2 rounded-sm mt-3 inline-block">
              browse problems →
            </Link>
          </div>
        ) : (
          assignedProblems.map((p) => (
            <div key={p.id} className="border-t border-gray-100 py-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{p.title}</p>
                <p className="mono text-xs text-gray-400 mt-1">by {p.author.name} · {p._count.responses} responses</p>
              </div>
              <Link href={`/problems/${p.problemNumber}/${p.slug}`} className="mono text-xs border border-black px-3 py-1.5 rounded-sm">
                view →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
