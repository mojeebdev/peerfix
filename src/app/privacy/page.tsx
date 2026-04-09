import Link from "next/link"

export const metadata = {
  title: "Privacy Policy — PeerFix",
  description: "How PeerFix handles your data.",
}

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="mb-10 pb-6 border-b border-black">
        <p className="mono text-xs text-gray-400 uppercase tracking-widest mb-2">legal</p>
        <h1 className="text-3xl font-semibold tracking-tighter">Privacy Policy</h1>
        <p className="mono text-xs text-gray-400 mt-2">Last updated: April 2026</p>
      </div>

      <div className="flex flex-col gap-8 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="font-semibold text-black text-base mb-2">What we collect</h2>
          <p>When you sign in with Google or GitHub, we receive your name, email address, and profile picture. We store this to identify you on the platform. We also store the problems you post, responses you write, and any reputation points you earn.</p>
        </section>

        <section>
          <h2 className="font-semibold text-black text-base mb-2">Wallet addresses</h2>
          <p>If you apply as an expert, you provide a wallet address for receiving USDC payouts on Base. This address is stored in our database and visible to users who hire you. We do not store private keys or have access to your funds.</p>
        </section>

        <section>
          <h2 className="font-semibold text-black text-base mb-2">Payments</h2>
          <p>Paid help is handled via smart contract on Base. When you fund a problem, the transaction is on-chain and publicly visible. We store the transaction hash and escrow ID to track payment status. We take a 15% platform fee automatically via the smart contract.</p>
        </section>

        <section>
          <h2 className="font-semibold text-black text-base mb-2">How we use your data</h2>
          <p>We use your data solely to operate PeerFix — matching problems to experts, displaying your profile, sending email notifications via Resend, and calculating reputation. We do not sell your data or use it for advertising.</p>
        </section>

        <section>
          <h2 className="font-semibold text-black text-base mb-2">Third-party services</h2>
          <p>We use Supabase for database hosting, Vercel for deployment, and Resend for transactional emails. Each of these services has their own privacy policy. We use Google and GitHub OAuth solely for authentication.</p>
        </section>

        <section>
          <h2 className="font-semibold text-black text-base mb-2">Data retention</h2>
          <p>Your account and associated data remains stored as long as your account exists. You can request deletion by emailing us. Problems and responses may be retained in anonymised form for platform integrity.</p>
        </section>

        <section>
          <h2 className="font-semibold text-black text-base mb-2">Contact</h2>
          <p>Questions about your data? Email us at <a href="mailto:privacy@peerfix.dev" className="underline">privacy@peerfix.dev</a>.</p>
        </section>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-100 flex gap-4">
        <Link href="/terms" className="mono text-xs text-gray-400 hover:text-black transition-colors">terms of service →</Link>
        <Link href="/" className="mono text-xs text-gray-400 hover:text-black transition-colors">back to peerfix →</Link>
      </div>
    </div>
  )
}
