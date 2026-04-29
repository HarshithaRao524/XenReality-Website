"use client";

import Navbar from "@/components/ui/Navbar";
import XenRealityLogo from "@/components/ui/XenRealityLogo";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const TABS = [
  { label: "Values",     href: "values"     },
  { label: "Culture",    href: "culture"    },
  { label: "Benefits",   href: "benefits"   },
  { label: "Open Roles", href: "open-roles" },
];

const VALUES = [
  {
    label: "Build with purpose",
    description: "Every product decision drives real-world impact across industries.",
    gradient: "from-[#2E3192] to-[#1a5cac]",
    glow: "rgba(46,49,146,0.35)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    ),
  },
  {
    label: "Move fast, stay precise",
    description: "Speed without accuracy is just noise. We ship fast and ship right.",
    gradient: "from-[#1a5cac] to-[#0680c2]",
    glow: "rgba(26,92,172,0.35)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    label: "Own the outcome",
    description: "From idea to production, we see every problem through to the end.",
    gradient: "from-[#0680c2] to-[#029ad9]",
    glow: "rgba(6,128,194,0.35)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Grow relentlessly",
    description: "We invest in people who invest in themselves. Learning never stops.",
    gradient: "from-[#029ad9] to-[#00AEEF]",
    glow: "rgba(2,154,217,0.35)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

const STATS = [
  { value: "20+",      label: "People & growing"   },
  { value: "5",        label: "Industries served"   },
  { value: "< 2 wks",  label: "Avg. deployment"     },
  { value: "100%",     label: "Remote-friendly"     },
];

const BENEFITS = [
  {
    label: "Health & wellness",
    gradient: "from-[#2E3192] to-[#1a5cac]",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a9 9 0 00-6 15.46V20a1 1 0 001 1h10a1 1 0 001-1v-2.54A9 9 0 0012 2z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    items: [
      "Health insurance",
      "Mental health support",
      "Flexible remote work policy",
      "Wellness stipend",
    ],
  },
  {
    label: "Paid time off",
    gradient: "from-[#1a5cac] to-[#0680c2]",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    items: [
      "Generous vacation days",
      "Local holidays",
      "Sick leave",
      "Enhanced parental leave",
    ],
  },
  {
    label: "Financial well-being",
    gradient: "from-[#0680c2] to-[#029ad9]",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v2m0 8v2M9.5 9.5a2.5 2.5 0 015 1c0 1.5-2.5 2-2.5 3.5m0 1h.01" />
      </svg>
    ),
    items: [
      "Competitive & equitable salaries",
      "Equity & stock options",
      "Work-from-home stipend",
      "Referral bonus program",
    ],
  },
  {
    label: "Learning & development",
    gradient: "from-[#029ad9] to-[#00AEEF]",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    items: [
      "Annual L&D budget",
      "Engineering & AI workshops",
      "Transparent career paths",
      "Conference & certification support",
    ],
  },
];

const ROLES: { dept: string; positions: { title: string; location: string; type: string }[] }[] = [
  {
    dept: "Engineering",
    positions: [
      { title: "Computer Vision Engineer",       location: "Remote", type: "Full-time" },
      { title: "Machine Learning Engineer",      location: "Remote", type: "Full-time" },
    ],
  },
  {
    dept: "Business & Sales",
    positions: [
      { title: "Enterprise Sales Executive",     location: "Hybrid", type: "Full-time" },
      { title: "Business Development Manager",   location: "Remote", type: "Full-time" },
    ],
  },
  {
    dept: "Operations",
    positions: [
      { title: "Customer Success Manager",       location: "Remote", type: "Full-time" },
    ],
  },
];

// ── Hero canvas ───────────────────────────────────────────────────────────────

function TeamCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    const makeNodes = (): Node[] => {
      const W = canvas!.width, H = canvas!.height;
      return Array.from({ length: 7 }, (_, i) => ({
        x: W * (0.15 + (i % 3) * 0.3 + Math.random() * 0.1),
        y: H * (0.2 + Math.floor(i / 3) * 0.3 + Math.random() * 0.1),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 28 + Math.random() * 14,
        hue: i,
      }));
    };
    let nodes = makeNodes();
    window.addEventListener("resize", () => { resize(); nodes = makeNodes(); });

    const COLORS = ["#2E3192", "#1a5cac", "#0680c2", "#029ad9", "#00AEEF", "#00A651", "#F58220"];
    const INITIALS = ["AR", "SM", "KP", "LM", "JD", "RK", "TP"];
    let frame = 0;

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width, H = canvas.height;
      frame++;

      ctx.fillStyle = "#111827";
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      const gs = 36;
      for (let x = 0; x < W; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 200) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,174,239,${0.12 * (1 - d / 200)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        const pad = n.r + 10;
        if (n.x < pad || n.x > W - pad) n.vx *= -1;
        if (n.y < pad || n.y > H - pad) n.vy *= -1;

        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2);
        g.addColorStop(0, COLORS[i % COLORS.length] + "33");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 2, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.font = `bold ${Math.round(n.r * 0.5)}px ui-sans-serif, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(INITIALS[i], n.x, n.y);

        const pulse = 0.7 + 0.3 * Math.sin(frame * 0.05 + i);
        ctx.fillStyle = `rgba(0,200,120,${pulse})`;
        ctx.beginPath(); ctx.arc(n.x + n.r * 0.65, n.y - n.r * 0.65, 5, 0, Math.PI * 2); ctx.fill();
      }

      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";

      const tagPulse = 0.85 + 0.15 * Math.sin(frame * 0.04);
      ctx.fillStyle = `rgba(245,130,32,${tagPulse})`;
      ctx.beginPath(); ctx.roundRect(W - 90, 20, 70, 26, 13); ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 10px ui-sans-serif, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("WE'RE HIRING", W - 55, 37);
      ctx.textAlign = "left";

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="w-full h-full block" />;
}

// ── Sticky section nav ────────────────────────────────────────────────────────

function SectionNav({ active }: { active: string }) {
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px" }
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div className={`sticky top-[64px] z-30 transition-colors duration-300 ${isStuck ? "bg-black px-6 py-2" : "bg-white py-4 px-6"}`}>
      <div className="max-w-4xl mx-auto">
        {isStuck ? (
          <div className="flex items-center">
            {TABS.map((tab) => (
              <button
                key={tab.href}
                onClick={() => scrollTo(tab.href)}
                className={`flex-1 whitespace-nowrap py-2.5 text-sm font-medium rounded-full transition-colors ${
                  active === tab.href
                    ? "bg-white text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-2xl flex items-center p-1.5">
            {TABS.map((tab) => (
              <button
                key={tab.href}
                onClick={() => scrollTo(tab.href)}
                className={`flex-1 whitespace-nowrap py-3 text-sm font-medium rounded-xl transition-colors ${
                  active === tab.href
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState("values");

  useEffect(() => {
    const NAV_BOTTOM = 130; // px from top where sticky nav ends
    function onScroll() {
      const viewH = window.innerHeight;
      let bestId = TABS[0].href;
      let bestVisible = -Infinity;
      for (const { href } of TABS) {
        const el = document.getElementById(href);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        const visible = Math.min(bottom, viewH) - Math.max(top, NAV_BOTTOM);
        if (visible > bestVisible) {
          bestVisible = visible;
          bestId = href;
        }
      }
      setActiveTab(bestId);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <main>
      <Navbar />

      {/* ── Hero — fills full viewport height, light section hidden below fold ── */}
      <section className="bg-black min-h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-[46%] flex flex-col px-8 md:px-14 lg:px-16 xl:px-24 pt-[36vh] pb-20">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5">Company</p>
          <h1 className="text-[38px] xl:text-[48px] font-medium text-white tracking-[-0.02rem] leading-[1.04] mb-4">
            Careers that make<br />an impact.
          </h1>
          <p className="text-[16px] xl:text-[18px] leading-[1.5] mb-10 max-w-sm" style={{ color: "#ccc" }}>
            Ready to build a career with a company that&apos;s transforming how industries see and think? You&apos;re in the right place.
          </p>
          <a
            href="#open-roles"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("open-roles");
              if (!el) return;
              window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
            }}
            className="self-start inline-flex items-center justify-center bg-gradient-to-r from-[#2E3192] to-[#00AEEF] hover:opacity-90 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-opacity"
          >
            Search open roles
          </a>
        </div>
        <div className="w-full lg:w-[54%] pt-[26vh] pr-5 pl-4 flex justify-center">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              height: "calc(74vh - 80px)",
              width: "calc(74vh - 80px)",
            }}
          >
            <TeamCanvas />
          </div>
        </div>
      </section>

      {/* ── Intro — light section, rounded top, starts well below viewport fold ── */}
      <section className="bg-white rounded-t-[2.5rem] relative z-10 pt-16 pb-10 px-6 text-center">
        <h2 className="text-[clamp(28px,3vw,42px)] font-medium text-gray-900 leading-[1.1] mb-5">
          Be part of something bigger.
        </h2>
        <p className="text-[16px] xl:text-[18px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
          At XenReality, we build Vision AI that transforms how industries see and think.
          Behind the technology, you&apos;ll find passionate, collaborative people who drive innovation together.
        </p>
      </section>

      {/* Sentinel: when this exits viewport top, nav turns dark */}
      <div id="nav-sentinel" className="h-px" />

      {/* ── Sticky section nav ── */}
      <SectionNav active={activeTab} />

      {/* ── Values ── */}
      <section id="values" className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#2E3192] uppercase tracking-widest mb-3">How we work</p>
            <h2 className="text-3xl font-semibold text-gray-900">Our values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div key={v.label} className="group flex gap-5 rounded-2xl p-6 border border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white transition-colors duration-200">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.gradient} flex items-center justify-center text-white shrink-0 shadow-sm`}>{v.icon}</div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1.5">{v.label}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Culture ── */}
      <section id="culture" className="bg-white py-20 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-[#2E3192] uppercase tracking-widest mb-3">Life at XenReality</p>
            <h2 className="text-3xl font-semibold text-gray-900">Built for people who care</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 px-6 py-8 shadow-sm">
                <p className="text-3xl font-bold text-[#2E3192] mb-2">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

        </div>

        {/* CEO quote card — full-width within section */}
        <div className="max-w-6xl mx-auto mt-10">
          <div className="rounded-2xl bg-gray-950 px-10 py-14 md:px-16 md:py-20">
            <div className="mb-10 brightness-0 invert">
              <XenRealityLogo />
            </div>
            <blockquote className="text-white text-[22px] md:text-[28px] font-medium leading-[1.35] mb-10">
              &ldquo;Great teams build great technology. Our success will be defined by the people we hire, the problems we solve, and the culture of excellence we create together.&rdquo;
            </blockquote>
            <hr className="border-white/20 mb-8" />
            <p className="text-white/70 text-sm">Founder and CEO, XenReality</p>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section id="benefits" className="bg-white py-24 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-semibold text-[#2E3192] uppercase tracking-widest mb-4">Benefits</p>
            <h2 className="text-[40px] font-medium text-gray-900 leading-[1.08] mb-5">Investing in you.</h2>
            <p className="text-base text-gray-500 max-w-xl leading-relaxed">
              We provide a variety of perks and benefits, so each team member can do their best work in and out of the office.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {BENEFITS.map((b) => (
              <div key={b.label}>
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${b.gradient} flex items-center justify-center text-white mb-4`}>
                  {b.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">{b.label}</h3>
                <ul className="flex flex-col gap-2.5">
                  {b.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2E3192] mt-0.5 shrink-0">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section id="open-roles" className="bg-white py-24 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#2E3192] uppercase tracking-widest mb-3">Open positions</p>
            <h2 className="text-3xl font-semibold text-gray-900">Find your role</h2>
          </div>
          <div className="flex flex-col gap-10">
            {ROLES.map((dept) => (
              <div key={dept.dept}>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 pb-3 border-b border-gray-200">
                  {dept.dept}
                </h3>
                <div className="flex flex-col gap-3">
                  {dept.positions.map((role) => (
                    <div key={role.title} className="flex items-center justify-between bg-white hover:bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors rounded-xl px-6 py-4 group shadow-sm">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{role.title}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">{role.location}</span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">{role.type}</span>
                        </div>
                      </div>
                      <a href="mailto:careers@xenreality.com" className="text-xs font-semibold text-[#2E3192] group-hover:text-[#00AEEF] transition-colors flex items-center gap-1.5 shrink-0">
                        Apply
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="bg-white border-t border-gray-100 py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Don&apos;t see your role?</h2>
          <p className="text-gray-500 text-sm mb-8">
            We&apos;re always looking for exceptional people. Send us a note and let&apos;s talk.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-[#F58220] hover:bg-[#d96e10] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors">
            Reach out anyway
          </Link>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
