import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-black mt-16 px-4 py-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold tracking-tight mb-1">
            peer<span className="bg-black text-white px-1.5 py-0.5 rounded-sm ml-0.5">fix</span>
          </p>
          <p className="mono text-xs text-gray-400">builders helping builders</p>
        </div>

        <div className="flex gap-6">
          <Link href="/problems" className="mono text-xs text-gray-400 hover:text-black transition-colors">
            browse
          </Link>
          <Link href="/expert/apply" className="mono text-xs text-gray-400 hover:text-black transition-colors">
            become an expert
          </Link>
          <Link href="/problems/new" className="mono text-xs text-gray-400 hover:text-black transition-colors">
            post a problem
          </Link>
        </div>

        <p className="mono text-xs text-gray-300">
          © {new Date().getFullYear()} peerfix.dev
        </p>
      </div>
    </footer>
  )
}
