import Link from "next/link"
import { buildProblemUrl, formatProblemNumber, timeAgo, truncate } from "@/lib/utils"
import Badge from "@/components/ui/Badge"
import Avatar from "@/components/ui/Avatar"
import { ProblemWithAuthor } from "@/types"

export default function ProblemCard({ problem }: { problem: ProblemWithAuthor }) {
  return (
    <div className="border-t border-gray-100 py-4 hover:bg-gray-50 transition-colors px-2 -mx-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="mono text-[10px] text-gray-300">
              #{formatProblemNumber(problem.problemNumber)}
            </span>
            <Badge type={problem.helpType} />
            <Badge type={problem.status} />
          </div>
          <Link
            href={buildProblemUrl(problem.problemNumber, problem.slug)}
            className="text-sm font-medium text-black hover:underline underline-offset-2 line-clamp-1"
          >
            {problem.title}
          </Link>
          <p className="mono text-xs text-gray-400 mt-1 line-clamp-1">
            {truncate(problem.description, 120)}
          </p>
          <div className="flex items-center gap-3 mt-2">
            {problem.tags.slice(0, 3).map((tag: any) => (
              <span key={tag} className="mono text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="flex items-center gap-1.5 justify-end mb-1">
            <Avatar name={problem.author.name} image={problem.author.image} size={18} />
            <span className="mono text-[10px] text-gray-400">{problem.author.name?.split(" ")[0]}</span>
          </div>
          <p className="mono text-[10px] text-gray-300">{timeAgo(new Date(problem.createdAt))}</p>
          <p className="mono text-[10px] text-gray-300">{problem._count.responses} replies</p>
          {problem.budget && (
            <p className="mono text-[10px] font-medium text-black mt-1">${problem.budget}</p>
          )}
        </div>
      </div>
    </div>
  )
}
