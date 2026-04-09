import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { auth } from "@/lib/auth"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Providers from "@/components/layout/Providers"
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
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32x32.png",
  },
  openGraph: {
    title: "PeerFix — Builders helping builders",
    description: "Post a blocker, get free community help or pay an expert to solve it instantly.",
    url: "https://peerfix.dev",
    siteName: "PeerFix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PeerFix" }],
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
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="96f81d83-0906-46b4-987b-1e4e4052f7ea"
        />
      </head>
      <body className={inter.className}>
        <Providers session={session}>
          <Navbar />
          <main className="min-h-screen bg-white">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
