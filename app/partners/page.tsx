import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnership Program",
  description: "Partner with XenReality and grow your business with Vision AI technology.",
};

// ── Data ──────────────────────────────────────────────────────────────────────

const PILLARS = [
  "Build with XenReality's technology to deliver Vision AI solutions to customers faster.",
  "Grow your business with XenReality resources and support to help drive demand.",
  "Increase profits and customer numbers by capturing more opportunities.",
];

const PARTNER_TYPES = [
  {
    title: "Technology",
    description:
      "Build integrations with XenReality's Vision AI platform. Access our APIs and SDKs to embed intelligence directly into your products.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Reseller",
    description:
      "Sell XenReality solutions directly to your customers. Earn competitive margins on every deal with full sales enablement support.",

    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    title: "Referral",
    description:
      "Refer customers to XenReality and earn commissions on every successful deal — no direct selling or technical expertise required.",

    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Strategic",
    description:
      "Joint go-to-market for large enterprise opportunities. Co-sell, co-develop, and co-market alongside the XenReality team.",

    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a9 9 0 00-6 15.46V20a1 1 0 001 1h10a1 1 0 001-1v-2.54A9 9 0 0012 2z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "System Integrator",
    description:
      "Deploy and implement XenReality Vision AI solutions for enterprise clients. Get certified and access exclusive implementation resources.",

    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M9 10l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Industry",
    description:
      "Bring Vision AI to your specific vertical — Manufacturing, Energy, Retail, Healthcare, and more. Build sector-specific solutions together.",

    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section
          className="flex items-center -mt-16"
          style={{
            background: "linear-gradient(120deg, #010101 49%, #1b2a36 100%)",
            minHeight: "calc(100vh + 120px)",
          }}
        >
          <div className="max-w-7xl mx-auto w-full px-8 lg:px-16 grid lg:grid-cols-[55%_45%] gap-12 items-center pt-52 pb-24">

            {/* Left — text */}
            <div>
              <p className="text-xs font-semibold text-white uppercase tracking-[0.18em] mb-6">
                Partnerships
              </p>
              <h1
                className="text-[32px] lg:text-[38px] xl:text-[48px] font-medium text-white mb-4 whitespace-nowrap"
                style={{ letterSpacing: "-0.02rem", lineHeight: "104%" }}
              >
                Partner with XenReality.
              </h1>
              <p
                className="font-normal mb-10 text-[16px] md:text-[18px] max-w-lg"
                style={{ color: "#ccc", letterSpacing: "-0.08px", lineHeight: "150%", marginTop: "16px" }}
              >
                Grow your business with the leader in Vision AI and unlock enhanced safety, productivity, and operational intelligence solutions.
              </p>
              <Link
                href="mailto:partnerships@xenreality.com"
                className="inline-flex items-center justify-center bg-[#2E3192] hover:bg-[#252880] text-white font-semibold text-sm px-8 py-4 rounded-full transition-colors"
              >
                Become a XenReality partner
              </Link>
            </div>

            {/* Right — photo (replace src with an actual team / event photo) */}
            <div className="hidden lg:block rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <div className="w-full h-full bg-gradient-to-br from-[#1a1e35] via-[#1e2340] to-[#111827] flex flex-col items-center justify-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/XenRealityMark.png" alt="XenReality" className="w-16 h-16 object-contain opacity-20" />
                <p className="text-gray-600 text-sm">Replace with a team / event photo</p>
              </div>
            </div>

          </div>
        </section>

        {/* ── Go further, faster, together ── */}
        <section className="bg-white rounded-t-[2.5rem] relative z-10 -mt-10 py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-300">

                {/* Left — heading + subtext */}
                <div className="p-10 md:p-14">
                  <h2
                    className="text-[30px] md:text-[36px] font-medium text-gray-900 mb-4"
                    style={{ letterSpacing: "-0.02rem", lineHeight: "115%" }}
                  >
                    Go further, faster, together
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    XenReality provides the tools, technology, and support designed to scale, drive revenue, and stand out.
                  </p>
                </div>

                {/* Right — key benefits */}
                <div className="p-10 md:p-14">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-7">
                    Key Benefits
                  </p>
                  <ul className="flex flex-col gap-6">
                    {PILLARS.map((text) => (
                      <li key={text} className="flex items-start gap-3">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#2E3192] shrink-0 mt-0.5">
                          <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm text-gray-700 leading-relaxed">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Partnership programs ── */}
        <section className="bg-gray-50 py-20 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Left-aligned header — matches Motive's ecosystem section */}
            <div className="mb-16">
              <h2
                className="text-[30px] md:text-[38px] font-medium text-gray-900 mb-3"
                style={{ letterSpacing: "-0.02rem", lineHeight: "115%" }}
              >
                XenReality partner ecosystem
              </h2>
              <p className="text-sm text-gray-500">
                Build a partnership best suited to meet your business needs.
              </p>
            </div>

            {/* Open 3-col grid — no card borders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
              {PARTNER_TYPES.map((pt) => (
                <div key={pt.title}>
                  <div className="w-12 h-12 rounded-xl bg-[#2E3192] flex items-center justify-center text-white mb-5">
                    {pt.icon}
                  </div>
                  <h3 className="text-[20px] font-semibold text-gray-900 mb-3">{pt.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{pt.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="rounded-t-[2.5rem] relative z-10 -mt-10 bg-[#0d0f1a] py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-semibold text-[#00AEEF] uppercase tracking-widest mb-4">Get started</p>
            <h2 className="text-[36px] font-medium text-white leading-[1.1] mb-5">
              Ready to become a partner?
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-10">
              Join our growing ecosystem of technology, reseller, and strategic partners. Our team will reach out within 2 business days.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#2E3192] hover:bg-[#252880] text-white font-semibold text-sm px-10 py-4 rounded-full transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
