import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t border-black mt-16 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <Link href="/" className="flex items-center mb-1">
              <Image
                src="/logo-light.png"
                alt="PeerFix"
                width={100}
                height={22}
                className="h-6 w-auto"
              />
            </Link>
            <p className="mono text-xs text-gray-400">builders helping builders</p>
          </div>

          <div className="flex gap-6 flex-wrap">
            <Link href="/problems" className="mono text-xs text-gray-400 hover:text-black transition-colors">browse</Link>
            <Link href="/expert/apply" className="mono text-xs text-gray-400 hover:text-black transition-colors">become an expert</Link>
            <Link href="/problems/new" className="mono text-xs text-gray-400 hover:text-black transition-colors">post a problem</Link>
            <Link href="/privacy" className="mono text-xs text-gray-400 hover:text-black transition-colors">privacy</Link>
            <Link href="/terms" className="mono text-xs text-gray-400 hover:text-black transition-colors">terms</Link>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 flex items-center justify-between flex-wrap gap-3">
          <p className="mono text-xs text-gray-300">© {new Date().getFullYear()} peerfix.dev</p>

          <div className="flex items-center gap-4">
            
              href="https://blindspotlab.xyz"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 mono text-xs text-gray-400 hover:text-black transition-colors"
            >
              <Image
                src="https://blindspotlab.xyz/logo.png"
                alt="BlindspotLab"
                width={16}
                height={16}
                className="w-4 h-4 rounded-sm"
              />
              an innovation by blindspotlab.xyz
            </a>

            <span className="text-gray-200">·</span>

            
              href="https://mojeeb.xyz"
              target="_blank"
              rel="noreferrer"
              className="mono text-xs text-gray-400 hover:text-black transition-colors"
            >
              made with ❤️ by{" "}
              
                href="https://x.com/mojeebeth"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                @mojeebeth
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
