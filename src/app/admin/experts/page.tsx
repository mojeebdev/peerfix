import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ApplicantCard from "@/components/admin/ApplicantCard"

export default async function AdminExpertsPage() {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") redirect("/")

  const experts = await prisma.expert.findMany({
    include: {
      user: { select: { id: true, name: true, email: true, image: true, reputation: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  const pending = experts.filter((e) => e.status === "PENDING")
  const approved = experts.filter((e) => e.status === "APPROVED")
  const dismissed = experts.filter((e) => e.status === "DISMISSED")

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8 pb-6 border-b border-black">
        <p className="mono text-xs text-gray-400 uppercase tracking-widest mb-1">admin</p>
        <h1 className="text-3xl font-semibold tracking-tighter">Expert applications</h1>
        <div className="flex gap-4 mt-2">
          <span className="mono text-xs text-gray-400">{pending.length} pending</span>
          <span className="mono text-xs text-gray-400">{approved.length} approved</span>
          <span className="mono text-xs text-gray-400">{dismissed.length} dismissed</span>
        </div>
      </div>

      {pending.length > 0 && (
        <div className="mb-10">
          <h2 className="mono text-xs uppercase tracking-widest text-gray-400 mb-4">pending review</h2>
          <div className="grid grid-cols-1 gap-4">
            {pending.map((e) => <ApplicantCard key={e.id} expert={e as any} />)}
          </div>
        </div>
      )}

      {approved.length > 0 && (
        <div className="mb-10">
          <h2 className="mono text-xs uppercase tracking-widest text-gray-400 mb-4">approved</h2>
          <div className="grid grid-cols-1 gap-4">
            {approved.map((e) => <ApplicantCard key={e.id} expert={e as any} />)}
          </div>
        </div>
      )}

      {dismissed.length > 0 && (
        <div>
          <h2 className="mono text-xs uppercase tracking-widest text-gray-400 mb-4">dismissed</h2>
          <div className="grid grid-cols-1 gap-4 opacity-50">
            {dismissed.map((e) => <ApplicantCard key={e.id} expert={e as any} />)}
          </div>
        </div>
      )}
    </div>
  )
}
