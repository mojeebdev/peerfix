import Link from "next/link"

export const revalidate = 0

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Hero */}
      <section className="py-20 border-b border-black">
        <p className="mono text-xs text-gray-400 tracking-widest uppercase mb-3">
          peerfix.dev · productized service for builders
        </p>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter text-black leading-none mb-6">
          Fix your landing page.<br />
          <span className="underline decoration-2 underline-offset-4">Then keep fixing it.</span>
        </h1>
        <p className="text-base text-gray-600 mb-8 max-w-xl leading-relaxed">
          Unlimited landing page redesigns, AI automation setup, and technical SEO — one request at a time, delivered async. Built for indie SaaS, AI tools, and hackathon projects that need to convert after launch day.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="https://cal.com/mojeeb/peerfix"
            className="mono text-sm bg-black text-white px-5 py-2.5 rounded-sm hover:bg-gray-900 transition-colors"
          >
            book a 15-min call
          </Link>
          <Link
            href="#pricing"
            className="mono text-sm border border-black text-black px-5 py-2.5 rounded-sm hover:bg-gray-50 transition-colors"
          >
            see pricing →
          </Link>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 border-b border-black">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">What PeerFix does</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Landing page redesign</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Clearer messaging, better hierarchy, stronger CTA, and a design that actually matches what you're selling. AI drafts + human polish.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">AI automation setup</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Wire simple agent workflows, form-to-CRM, lead routing, or MCP-friendly surfaces so your product works with AI tools out of the box.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Technical SEO basics</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Schema, meta, Core Web Vitals, clean structure, and agent-readable markup. Not ranking promises — the foundations that make ranking possible.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 border-b border-black">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">How it works</h2>
        <ol className="space-y-6 text-sm text-gray-700">
          <li className="flex gap-4">
            <span className="mono text-xs text-gray-400 mt-0.5">01</span>
            <div>
              <strong className="text-black">Subscribe or book a sprint.</strong>
              <p>One flat monthly queue or a fixed-price redesign. Pause anytime.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="mono text-xs text-gray-400 mt-0.5">02</span>
            <div>
              <strong className="text-black">Drop requests in the queue.</strong>
              <p>Async. One active request at a time. Average turnaround under 48 hours for most tasks.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="mono text-xs text-gray-400 mt-0.5">03</span>
            <div>
              <strong className="text-black">Get polished work back.</strong>
              <p>Design files, deployed pages, or configured automations. Revisions until it's right.</p>
            </div>
          </li>
        </ol>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 border-b border-black">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">Pricing</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-black p-6">
            <p className="mono text-xs text-gray-400 mb-2">MONTHLY</p>
            <div className="text-3xl font-semibold mb-1">$1,995<span className="text-base font-normal text-gray-500">/mo</span></div>
            <p className="text-sm text-gray-600 mb-4">Unlimited queue · one request at a time · pause anytime</p>
            <ul className="text-sm text-gray-700 space-y-1 mb-6">
              <li>• Landing page redesigns & iterations</li>
              <li>• AI automation & agent-ready setup</li>
              <li>• Technical SEO foundations</li>
              <li>• Revisions until satisfied</li>
            </ul>
            <Link href="https://cal.com/mojeeb/peerfix" className="mono text-sm bg-black text-white px-4 py-2 inline-block rounded-sm">
              start monthly
            </Link>
          </div>
          <div className="border border-black p-6">
            <p className="mono text-xs text-gray-400 mb-2">SPRINT</p>
            <div className="text-3xl font-semibold mb-1">$1,495<span className="text-base font-normal text-gray-500"> once</span></div>
            <p className="text-sm text-gray-600 mb-4">One full landing page redesign · delivered in 7 days</p>
            <ul className="text-sm text-gray-700 space-y-1 mb-6">
              <li>• Messaging + layout + CTA</li>
              <li>• Mobile-first, fast, clean code</li>
              <li>• Basic schema & on-page SEO</li>
              <li>• 2 rounds of revisions</li>
            </ul>
            <Link href="https://cal.com/mojeeb/peerfix" className="mono text-sm border border-black text-black px-4 py-2 inline-block rounded-sm">
              book a sprint
            </Link>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">Prices are starting points. Exact scope confirmed on the intro call.</p>
      </section>

      {/* Who it's for */}
      <section className="py-16 border-b border-black">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Built for</h2>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• Indie founders shipping AI tools or SaaS who need a better public face</li>
          <li>• Hackathon and early builds that need to convert after the demo</li>
          <li>• Teams that want DesignJoy-style speed without the $5k/month price</li>
          <li>• Anyone who wants AI leverage on the page and behind the form</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">Ready to fix the page?</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">15-minute intro. No pitch deck. We look at what you have and tell you what we can ship.</p>
        <Link
          href="https://cal.com/mojeeb/peerfix"
          className="mono text-sm bg-black text-white px-6 py-3 rounded-sm hover:bg-gray-900 transition-colors"
        >
          book the call
        </Link>
      </section>
    </div>
  )
}
