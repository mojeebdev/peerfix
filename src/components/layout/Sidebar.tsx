import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function Sidebar() {
  const [trendingTags, onlineExperts] = await Promise.all([
    prisma.problem.findMany({
      select: { tags: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.expert.findMany({
      where: { status: "APPROVED", isAvailable: true },
      include: { user: { select: { name: true, image: true } } },
      take: 5,
    }),
  ])

  const tagCounts: Record<string, number> = {}
  trendingTags.forEach(({ tags }) => {
    tags.forEach((tag) => { tagCounts[tag] = (tagCounts[tag] || 0) + 1 })
  })
  const sorted = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 10)

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="sticky top-20 flex flex-col gap-6">
        <div>
          <p className="mono text-[10px] uppercase tracking-widest text-gray-400 mb-3">
            experts online ({onlineExperts.length})
          </p>
          <div className="flex flex-col gap-2">
            {onlineExperts.map((e) => (
              <div key={e.id} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-black flex-shrink-0" />
                <span className="text-xs text-gray-600 truncate">{e.user.name}</span>
              </div>
            ))}
            {onlineExperts.length === 0 && (
              <p className="mono text-xs text-gray-300">none online</p>
            )}
          </div>
        </div>

        <div>
          <p className="mono text-[10px] uppercase tracking-widest text-gray-400 mb-3">trending tags</p>
          <div className="flex flex-wrap gap-1.5">
            {sorted.map(([tag, count]) => (
              <Link
                key={tag}
                href={`/problems?tag=${tag}`}
                className="mono text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-sm hover:bg-black hover:text-white transition-colors"
              >
                {tag} <span className="text-gray-400">{count}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="border border-black rounded-sm p-4">
          <p className="font-semibold text-sm mb-1">stuck on something?</p>
          <p className="mono text-xs text-gray-400 mb-3">post your blocker and get fixed fast</p>
          <Link
            href="/problems/new"
            className="mono text-xs bg-black text-white px-3 py-2 rounded-sm block text-center hover:bg-gray-900 transition-colors"
          >
            post a problem →
          </Link>
        </div>
      </div>
    </aside>
  )
}
