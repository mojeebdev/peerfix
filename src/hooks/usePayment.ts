import { useState } from "react"

export function usePayment() {
  const [loading, setLoading] = useState(false)

  async function payWithPaystack(problemId: string, amount: number) {
    setLoading(true)
    try {
      const res = await fetch("/api/payments/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId, amount }),
      })
      const data = await res.json()
      if (data.authorizationUrl) window.location.href = data.authorizationUrl
      return data
    } finally {
      setLoading(false)
    }
  }

  async function payWithCrypto(problemId: string, amount: number, problemTitle: string) {
    setLoading(true)
    try {
      const res = await fetch("/api/payments/crypto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId, amount, problemTitle }),
      })
      return res.json()
    } finally {
      setLoading(false)
    }
  }

  return { payWithPaystack, payWithCrypto, loading }
}
