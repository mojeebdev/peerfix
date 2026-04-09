import Link from "next/link"

export const metadata = {
  title: "Terms of Service — PeerFix",
  description: "PeerFix terms of service.",
}

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="mb-10 pb-6 border-b border-black">
        <p className="mono text-xs text-gray-400 uppercase tracking-widest mb-2">legal</p>
        <h1 className="text-3xl font-semibold tracking-tighter">Terms of Service</h1>
        <p className="mono text-xs text-gray-400 mt-2">Last updated: April 2026</p>
      </div>

      <div className="flex flex-col gap-8 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="font-semibold text-black text-base mb-2">Acceptance</h2>
          <p>By using PeerFix, you agree to these terms. If you do not agree, do not use the platform. We may update these terms at any time — continued use means acceptance.</p>
        </section>

        <section>
          <h2 className="font-semibold text-black text-base mb-2">What PeerFix is</h2>
          <p>PeerFix is a marketplace where builders can post technical problems and receive help — either free from the community or paid from verified experts. We facilitate the connection but are not responsible for the quality of advice given.</p>
        </section>

        <section>
          <h2 className="font-semibold text-black text-base mb-2">Posting problems</h2>
          <p>You are responsible for the content you post. Do not post anything illegal, harmful, or misleading. Problems must be genuine technical blockers. Spam or abuse will result in account termination.</p>
        </section>

        <section>
          <h2 className="font-semibold text-black text-base mb-2">Paid help and payments</h2>
          <p>When you post a paid problem, funds are held in a smart contract escrow on Base. Upon accepting a solution, the contract automatically releases 85% to the expert and 15% to PeerFix as a platform fee. This is irreversible once triggered. Do not fund a problem unless you intend to pay.</p>
        </section>

        <section>
          <h2 className="font-semibold text-black text-base mb-2">Expert responsibilities</h2>
          <p>Approved experts agree to respond to paid problems in good faith, provide accurate and helpful solutions, and maintain a professional standard. Experts who consistently provide poor solutions may be removed from the platform.</p>
        </section>

        <section>
          <h2 className="font-semibold text-black text-base mb-2">Disputes</h2>
          <p>If you believe a paid solution was not delivered in good faith, you may raise a dispute. Disputes are reviewed by PeerFix admins who have the ability to trigger a refund via the smart contract. Our decision is final.</p>
        </section>

        <section>
          <h2 className="font-semibold text-black text-base mb-2">Crypto and on-chain activity</h2>
          <p>All crypto transactions on PeerFix are on-chain and publicly visible. You are responsible for the wallet address you provide. PeerFix is not liable for funds sent to incorrect addresses or lost due to user error.</p>
        </section>

        <section>
          <h2 className="font-semibold text-black text-base mb-2">Limitation of liability</h2>
          <p>PeerFix is provided as-is. We are not liable for any damages arising from use of the platform, including but not limited to financial loss, data loss, or incorrect technical advice. Use at your own risk.</p>
        </section>

        <section>
          <h2 className="font-semibold text-black text-base mb-2">Termination</h2>
          <p>We reserve the right to suspend or terminate any account that violates these terms, without notice. You may delete your account at any time by contacting us.</p>
        </section>

        <section>
          <h2 className="font-semibold text-black text-base mb-2">Contact</h2>
          <p>Questions? Email <a href="mailto:legal@peerfix.dev" className="underline">legal@peerfix.dev</a>.</p>
        </section>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-100 flex gap-4">
        <Link href="/privacy" className="mono text-xs text-gray-400 hover:text-black transition-colors">privacy policy →</Link>
        <Link href="/" className="mono text-xs text-gray-400 hover:text-black transition-colors">back to peerfix →</Link>
      </div>
    </div>
  )
}
