import Avatar from "@/components/ui/Avatar"
import { ExpertWithUser } from "@/types"

export default function ExpertCard({ expert }: { expert: ExpertWithUser }) {
  return (
    <div className="border border-gray-200 rounded-sm p-4 hover:border-black transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <Avatar name={expert.user.name} image={expert.user.image} size={36} />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{expert.user.name}</p>
          <p className="mono text-xs text-gray-400">{expert.user.reputation} rep</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className={`w-2 h-2 rounded-full ${expert.isAvailable ? "bg-black" : "bg-gray-300"}`} />
          <span className="mono text-[10px] text-gray-400">
            {expert.isAvailable ? "available" : "busy"}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {expert.expertise.slice(0, 4).map((skill: any) => (
          <span key={skill} className="mono text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-sm">
            {skill}
          </span>
        ))}
        {expert.expertise.length > 4 && (
          <span className="mono text-[10px] text-gray-400">+{expert.expertise.length - 4}</span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="mono text-xs text-gray-400">
          ${expert.hourlyRate}<span className="text-gray-300">/hr</span>
        </span>
        <span className="mono text-xs text-gray-400">{expert.yearsExp} yrs exp</span>
      </div>
    </div>
  )
}
