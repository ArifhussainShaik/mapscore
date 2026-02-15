import SearchBar from "@/components/SearchBar";
import FAQ from "@/components/FAQ";
import config from "@/config";
import Link from "next/link";
import ButtonSignin from "@/components/ButtonSignin";

export default function LandingPage() {
  return (
    <>
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-brand-dark)]/80 backdrop-blur-lg border-b border-base-content/5">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <span className="text-lg font-bold text-white">
              Map<span className="text-emerald-400">score</span>
              <span className="text-xs text-base-content/40">.io</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-base-content/60 hover:text-base-content/90 transition-colors">How It Works</a>
            <a href="#features" className="text-sm text-base-content/60 hover:text-base-content/90 transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-base-content/60 hover:text-base-content/90 transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-base-content/60 hover:text-base-content/90 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <ButtonSignin text="Log in" extraStyle="btn-sm btn-ghost text-base-content/70" />
            <Link href="#pricing" className="btn btn-sm btn-brand">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <main className="bg-[var(--color-brand-dark)]">
        {/* ===== HERO ===== */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[128px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Used by 500+ Local SEO professionals
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
              How healthy is your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Google Business Profile
              </span>
              ?
            </h1>

            <p className="text-lg md:text-xl text-base-content/60 mt-6 max-w-2xl mx-auto leading-relaxed">
              Get a scored audit report with prioritized fixes, competitor comparison,
              and downloadable PDF —{" "}
              <span className="text-emerald-400 font-semibold">in 30 seconds</span>.
            </p>

            <div className="mt-10 flex justify-center">
              <SearchBar variant="hero" />
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-base-content/40">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free — no credit card
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Data-backed scoring
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                100-point analysis
              </span>
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section id="how-it-works" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">How It Works</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
                Three steps to a healthier GBP
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: "🔍",
                  title: "Enter Your Business",
                  desc: "Type your business name and city. We find your Google Business Profile automatically.",
                },
                {
                  step: "02",
                  icon: "⚡",
                  title: "Get Your Score",
                  desc: "Our algorithm checks 45+ factors against real ranking research and competitor data.",
                },
                {
                  step: "03",
                  icon: "🎯",
                  title: "Follow the Action Plan",
                  desc: "Prioritized fixes with exact instructions. Know what to fix first for maximum impact.",
                },
              ].map((item) => (
                <div key={item.step} className="glass-card p-8 text-center group hover:border-emerald-500/30 transition-all duration-300">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <span className="text-xs text-emerald-400 font-bold tracking-widest">STEP {item.step}</span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-3">{item.title}</h3>
                  <p className="text-base-content/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section id="features" className="py-24 px-6 bg-base-content/[0.02]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Features</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
                Not just another audit tool
              </h2>
              <p className="text-base-content/50 mt-3 max-w-xl mx-auto">
                Built on real ranking research, not generic pass/fail checks
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "📊", title: "100-Point Scoring", desc: "Weighted by Whitespark 2026 ranking factors and Search Atlas ML Study. Every point is data-backed." },
                { icon: "🏆", title: "Competitor Comparison", desc: "See how you stack up against top 3 competitors in your area. Know exactly where you win and lose." },
                { icon: "🎯", title: "Priority Action Plan", desc: "Step-by-step fixes sorted by impact. Not 'optimize your profile' — exact instructions with time estimates." },
                { icon: "📈", title: "45+ Checks", desc: "Profile completeness, reviews, photos, posts, website signals, and competitive positioning — all analyzed." },
                { icon: "📄", title: "PDF Export", desc: "Professional PDF reports ready to send to clients. White-label option for agencies." },
                { icon: "🔔", title: "Weekly Alerts", desc: "Save profiles and get notified when scores change. Stay on top of every client." },
              ].map((feature) => (
                <div key={feature.title} className="glass-card p-6 hover:border-emerald-500/20 transition-all duration-300">
                  <span className="text-3xl">{feature.icon}</span>
                  <h3 className="text-base font-bold text-white mt-3 mb-2">{feature.title}</h3>
                  <p className="text-sm text-base-content/60 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PRICING ===== */}
        <section id="pricing" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Pricing</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
                Simple, transparent pricing
              </h2>
              <p className="text-base-content/50 mt-3">
                Start free. Upgrade when you need more.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Free */}
              <div className="glass-card p-8">
                <h3 className="text-lg font-bold text-white">Free</h3>
                <p className="text-base-content/50 text-sm mt-1">Try before you buy</p>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-black text-white">$0</span>
                  <span className="text-base-content/40 text-sm">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "3 audits per month",
                    "Basic score & top 3 issues",
                    "Email required to view",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-base-content/70">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className="btn btn-outline w-full border-base-content/20 text-base-content/70">
                  Sign Up Free
                </Link>
              </div>

              {/* Pro */}
              <div className="glass-card p-8 border-emerald-500/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">Pro</h3>
                  <span className="badge badge-sm bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Popular</span>
                </div>
                <p className="text-base-content/50 text-sm mt-1">For freelancers & consultants</p>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-black text-white">$29</span>
                  <span className="text-base-content/40 text-sm">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {config.dodo.plans[0].features.map((f) => (
                    <li key={f.name} className="flex items-center gap-2 text-sm text-base-content/70">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f.name}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-brand w-full">
                  Get Pro
                </button>
              </div>

              {/* Agency */}
              <div className="glass-card p-8">
                <h3 className="text-lg font-bold text-white">Agency</h3>
                <p className="text-base-content/50 text-sm mt-1">For teams & agencies</p>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-black text-white">$79</span>
                  <span className="text-base-content/40 text-sm">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {config.dodo.plans[1].features.map((f) => (
                    <li key={f.name} className="flex items-center gap-2 text-sm text-base-content/70">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f.name}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-outline w-full border-base-content/20 text-base-content/70">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS / SOCIAL PROOF ===== */}
        <section className="py-24 px-6 bg-base-content/[0.02]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Testimonials</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
                Trusted by SEO professionals
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "I was spending 45 minutes per GBP audit. Now it takes 30 seconds. Game changer for my agency.",
                  name: "Sarah Mitchell",
                  role: "Local SEO Consultant",
                  stars: 5,
                },
                {
                  quote: "The competitor comparison alone is worth the price. My clients love seeing exactly where they stand.",
                  name: "James Chen",
                  role: "Agency Owner",
                  stars: 5,
                },
                {
                  quote: "Finally, an audit tool that actually tells you WHY something matters and HOW to fix it. Data-backed, not fluff.",
                  name: "Priya Sharma",
                  role: "Freelance Local SEO",
                  stars: 5,
                },
              ].map((t) => (
                <div key={t.name} className="glass-card p-6">
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-base-content/70 leading-relaxed mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-base-content/40">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BOTTOM CTA ===== */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to audit your GBP?
            </h2>
            <p className="text-base-content/50 mb-8 max-w-xl mx-auto">
              Join hundreds of SEO professionals who save hours every week with data-backed GBP audits.
            </p>
            <div className="flex justify-center">
              <SearchBar variant="hero" />
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <FAQ />

        {/* ===== FOOTER ===== */}
        <footer className="border-t border-base-content/10 py-12 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-lg">📊</span>
              <span className="text-sm font-bold text-white">
                Map<span className="text-emerald-400">score</span>
                <span className="text-xs text-base-content/40">.io</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-base-content/40">
              <Link href="/tos" className="hover:text-base-content/70 transition-colors">Terms</Link>
              <Link href="/privacy-policy" className="hover:text-base-content/70 transition-colors">Privacy</Link>
              <a href="mailto:support@mapscore.io" className="hover:text-base-content/70 transition-colors">Support</a>
            </div>
            <p className="text-xs text-base-content/30">
              © {new Date().getFullYear()} Mapscore.io. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
