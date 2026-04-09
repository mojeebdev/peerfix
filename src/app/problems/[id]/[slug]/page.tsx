import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { notFound } from "next/navigation"
import { formatProblemNumber, timeAgo } from "@/lib/utils"
import ResponseForm from "@/components/problems/ResponseForm"
import ResponseCard from "@/components/problems/ResponseCard"
import Badge from "@/components/ui/Badge"
import PaymentModal from "@/components/payments/PaymentModal"

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>
}) {
  const session = await auth()
  const { id, slug } = await params
  const problemNumber = parseInt(id)

  const problem = await prisma.problem.findUnique({
    where: { problemNumber },
    include: {
      author: { select: { id: true, name: true, image: true, reputation: true } },
      responses: {
        include: {
          author: { select: { id: true, name: true, image: true, reputation: true } },
        },
        orderBy: [{ isAccepted: "desc" }, { createdAt: "asc" }],
      },
      payment: true,
    },
  })

  if (!problem) notFound()

  await prisma.problem.update({
    where: { id: problem.id },
    data: { views: { increment: 1 } },
  })

  const isAuthor = session?.user.id === problem.authorId

  const expert = problem.expertId
    ? await prisma.expert.findUnique({ where: { id: problem.expertId } })
    : null

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-2">
        <p className="mono text-xs text-gray-400">
          problem #{formatProblemNumber(problem.problemNumber)}
        </p>
      </div>

      <div className="border-b border-black pb-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h1 className="text-2xl font-semibold tracking-tight">{problem.title}</h1>
          <div className="flex gap-2 flex-shrink-0">
            <Badge type={problem.helpType} />
            <Badge type={problem.status} />
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span className="mono text-xs text-gray-400">
            by {problem.author.name} · {timeAgo(problem.createdAt)} · {problem.views} views
          </span>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-sm p-4 font-mono text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {problem.description}
        </div>

        {problem.tags.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {problem.tags.map((tag) => (
              <span key={tag} className="mono text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        )}

        {problem.helpType === "PAID" && problem.budget && !problem.payment && session && !isAuthor && expert?.walletAddress && (
          <div className="mt-4">
            <PaymentModal
              problem={problem as any}
              expertWallet={expert.walletAddress as `0x${string}`}
            />
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-4 mono">
          {problem.responses.length} response{problem.responses.length !== 1 ? "s" : ""}
        </h2>
        {problem.responses.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-sm p-8 text-center">
            <p className="mono text-xs text-gray-400">no responses yet — be the first to fix this</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {problem.responses.map((response) => (
              <ResponseCard
                key={response.id}
                response={response as any}
                isAuthor={isAuthor}
                problemId={problem.id}
                escrowId={problem.escrowId}
                isCryptoPaid={problem.payment?.status === "CONFIRMED"}
              />
            ))}
          </div>
        )}
      </div>

      {session && problem.status !== "SOLVED" && (
        <div className="border-t border-black pt-6">
          <h2 className="text-sm font-semibold mono mb-4">post a response</h2>
          <ResponseForm problemId={problem.id} />
        </div>
      )}

      {!session && (
        <div className="border border-black rounded-sm p-6 text-center">
          <p className="mono text-sm text-gray-600 mb-3">sign in to post a response</p>
          <a href="/login" className="mono text-xs bg-black text-white px-4 py-2 rounded-sm">
            sign in
          </a>
        </div>
      )}
    </div>
  )
}
