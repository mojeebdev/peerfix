const COINBASE_API_KEY = process.env.COINBASE_COMMERCE_API_KEY!
const BASE_URL = "https://api.commerce.coinbase.com"

export async function createCryptoCharge({
  name,
  description,
  amount,
  currency = "USD",
  metadata,
}: {
  name: string
  description: string
  amount: number
  currency?: string
  metadata?: Record<string, any>
}) {
  const res = await fetch(`${BASE_URL}/charges`, {
    method: "POST",
    headers: {
      "X-CC-Api-Key": COINBASE_API_KEY,
      "X-CC-Version": "2018-03-22",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      pricing_type: "fixed_price",
      local_price: { amount: amount.toFixed(2), currency },
      metadata,
    }),
  })
  return res.json()
}

export async function getCryptoCharge(chargeId: string) {
  const res = await fetch(`${BASE_URL}/charges/${chargeId}`, {
    headers: {
      "X-CC-Api-Key": COINBASE_API_KEY,
      "X-CC-Version": "2018-03-22",
    },
  })
  return res.json()
}
