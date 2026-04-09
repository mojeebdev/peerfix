import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/lib/auth"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PeerFix — Builders helping builders",
  description: "Post a blocker, get free community help or pay an expert to solve it instantly.",
  metadataBase: new URL("https://peerfix.dev"),
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
  },
  openGraph: {
    title: "PeerFix — Builders helping builders",
    description: "Post a blocker, get free community help or pay an expert to solve it instantly.",
    url: "https://peerfix.dev",
    siteName: "PeerFix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PeerFix — Builders helping builders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PeerFix — Builders helping builders",
    description: "Post a blocker, get free community help or pay an expert to solve it instantly.",
    images: ["/twitter-card.png"],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />
          <main className="min-h-screen bg-white">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
