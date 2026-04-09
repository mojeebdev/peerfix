"use client"

import { useState } from "react"
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi"
import { parseUnits } from "viem"
import { ESCROW_ABI, USDC_ABI, ESCROW_ADDRESS, USDC_ADDRESS } from "@/contracts/PeerFixEscrow"
import Spinner from "@/components/ui/Spinner"

interface CryptoPaymentProps {
  problemId: string
  amount: number
  expertWallet: `0x${string}`
  onSuccess?: () => void
}

export default function CryptoPayment({
  problemId,
  amount,
  expertWallet,
  onSuccess,
}: CryptoPaymentProps) {
  const { address } = useAccount()
  const [step, setStep] = useState<"approve" | "fund" | "done">("approve")

  const { writeContract: approve, data: approveTx, isPending: approving } = useWriteContract()
  const { writeContract: fund, data: fundTx, isPending: funding } = useWriteContract()

  const { isLoading: waitingApprove } = useWaitForTransactionReceipt({
    hash: approveTx,
    onSuccess: () => setStep("fund"),
  } as any)

  const { isLoading: waitingFund } = useWaitForTransactionReceipt({
    hash: fundTx,
    onSuccess: async () => {
      setStep("done")
      await fetch("/api/payments/crypto/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId, txHash: fundTx }),
      })
      onSuccess?.()
    },
  } as any)

  const usdcAmount = parseUnits(amount.toString(), 6)

  if (!address) {
    return (
      <p className="mono text-xs text-gray-400 text-center py-3">
        connect wallet to pay with crypto
      </p>
    )
  }

  if (step === "done") {
    return (
      <div className="text-center py-3">
        <p className="mono text-xs text-black font-medium">payment confirmed</p>
        <p className="mono text-xs text-gray-400 mt-1">
          funds in escrow · auto-released when problem is solved
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-gray-50 rounded-sm p-3 border border-gray-100">
        <p className="mono text-xs text-gray-400 mb-1">paying</p>
        <p className="mono text-sm font-medium">${amount} USDC</p>
        <p className="mono text-[10px] text-gray-300 mt-1">
          held in escrow · auto-released on solve · 85% to expert · 15% platform fee
        </p>
      </div>

      {step === "approve" && (
        <button
          onClick={() =>
            approve({
              address: USDC_ADDRESS,
              abi: USDC_ABI,
              functionName: "approve",
              args: [ESCROW_ADDRESS, usdcAmount],
            })
          }
          disabled={approving || waitingApprove}
          className="w-full mono text-sm border border-black text-black py-2.5 rounded-sm hover:bg-black hover:text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {approving || waitingApprove
            ? <><Spinner size={14} /> approving usdc...</>
            : "step 1: approve usdc →"
          }
        </button>
      )}

      {step === "fund" && (
        <button
          onClick={() =>
            fund({
              address: ESCROW_ADDRESS,
              abi: ESCROW_ABI,
              functionName: "createAndFund",
              args: [problemId, expertWallet, usdcAmount],
            })
          }
          disabled={funding || waitingFund}
          className="w-full mono text-sm bg-black text-white py-2.5 rounded-sm hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {funding || waitingFund
            ? <><Spinner size={14} /> funding escrow...</>
            : "step 2: fund escrow →"
          }
        </button>
      )}
    </div>
  )
}
