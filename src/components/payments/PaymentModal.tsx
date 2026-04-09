"use client"

import { useState } from "react"
import CryptoPayment from "./CryptoPayment"

interface Problem {
  id: string
  title: string
  budget: number
  expertId?: string | null
}

export default function PaymentModal({ problem, expertWallet }: { problem: Problem; expertWallet: `0x${string}` }) {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mono text-xs bg-black text-white px-3 py-1.5 rounded-sm hover:bg-gray-900 transition-colors"
      >
        pay ${problem.budget} →
      </button>
    )
  }

  return (
    <div
      style={{ minHeight: 400 }}
      className="bg-black bg-opacity-40 flex items-center justify-center rounded-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
    >
      <div className="bg-white border border-black rounded-sm p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold tracking-tight text-sm">pay for expert help</h3>
          <button
            onClick={() => setOpen(false)}
            className="mono text-xs text-gray-400 hover:text-black transition-colors"
          >
            close
          </button>
        </div>

        <CryptoPayment
          problemId={problem.id}
          amount={problem.budget}
          expertWallet={expertWallet}
          onSuccess={() => setOpen(false)}
        />

        <p className="mono text-[10px] text-gray-300 text-center mt-4">
          powered by base · usdc · auto-split on solve
        </p>
      </div>
    </div>
  )
}
