"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import Avatar from "@/components/ui/Avatar"
import { timeAgo } from "@/lib/utils"
import { ESCROW_ABI, ESCROW_ADDRESS } from "@/contracts/PeerFixEscrow"
import Spinner from "@/components/ui/Spinner"

interface Response {
  id: string
  content: string
  isAccepted: boolean
  createdAt: Date
  author: { id: string; name: string | null; image: string | null; reputation: number }
}

export default function ResponseCard({
  response,
  isAuthor,
  problemId,
  escrowId,
  isCryptoPaid,
}: {
  response: Response
  isAuthor: boolean
  problemId: string
  escrowId?: string | null
  isCryptoPaid?: boolean
}) {
  const [accepting, setAccepting] = useState(false)
  const router = useRouter()

  const { writeContract, data: releaseTx, isPending: releasing } = useWriteContract()

  const { isLoading: waitingRelease } = useWaitForTransactionReceipt({
    hash: releaseTx,
    query: {
      enabled: !!releaseTx,
      select: () => { router.refresh(); return null },
    },
  } as any)

  async function accept() {
    setAccepting(true)
    try {
      const res = await fetch(
        `/api/problems/${problemId}/responses/${response.id}/accept`,
        { method: "POST" }
      )
      const data = await res.json()

      if (data.requiresEscrowRelease && data.escrowId) {
        ;(writeContract as any)({
          address: ESCROW_ADDRESS,
          abi: ESCROW_ABI,
          functionName: "release",
          args: [data.escrowId as `0x${string}`],
        })
      } else {
        router.refresh()
      }
    } finally {
      setAccepting(false)
    }
  }

  const isProcessing = accepting || releasing || waitingRelease

  return (
    <div className={`border rounded-sm p-4 ${response.isAccepted ? "border-black bg-gray-50" : "border-gray-100"}`}>
      {response.isAccepted && (
        <div className="mono text-[10px] text-black font-medium mb-2 uppercase tracking-widest">
          accepted solution
        </div>
      )}

      <div className="flex items-center gap-2 mb-3">
        <Avatar name={response.author.name} image={response.author.image} size={22} />
        <span className="mono text-xs text-gray-600">{response.author.name}</span>
        <span className="mono text-xs text-gray-300">{timeAgo(new Date(response.createdAt))}</span>
        <span className="mono text-xs text-gray-300 ml-auto">{response.author.reputation} rep</span>
      </div>

      <p className="text-sm font-mono text-gray-700 whitespace-pre-wrap leading-relaxed">
        {response.content}
      </p>

      {isAuthor && !response.isAccepted && (
        <button
          onClick={accept}
          disabled={isProcessing}
          className="mono text-xs border border-black text-black px-3 py-1.5 rounded-sm mt-3 hover:bg-black hover:text-white transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isProcessing ? (
            <><Spinner size={12} />{releasing || waitingRelease ? "releasing escrow..." : "accepting..."}</>
          ) : (
            "mark as solution"
          )}
        </button>
      )}
    </div>
  )
}
