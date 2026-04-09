"use client"

import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { wagmiConfig } from "@/lib/wagmi"
import { useState } from "react"

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode
  session: any
}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  )
}
