"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

// ── Card data ──────────────────────────────────────────────────────────────────

type CardVariant = "geofence" | "fuel" | "safety";

interface HeroCard {
  id: string;
  variant: CardVariant;
}

const CARDS: HeroCard[] = [
  { id: "geofence", variant: "geofence" },
  { id: "fuel",     variant: "fuel"     },
  { id: "safety",   variant: "safety"   },
];

// ── Card visuals ───────────────────────────────────────────────────────────────

function GeofenceCard() {
  return (
    <div>
      {/* Map tile simulation */}
      <div className="rounded-xl overflow-hidden mb-4 relative aspect-[4/3] bg-slate-700">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-slate-500 rotate-3 opacity-50" />
          <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-slate-500 -rotate-2 opacity-40" />
          <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-slate-500 rotate-1 opacity-40" />
        </div>
        {[
          { top: "10%", left: "8%",  w: "18%", h: "14%", color: "bg-slate-600" },
          { top: "10%", left: "30%", w: "22%", h: "12%", color: "bg-slate-500" },
          { top: "55%", left: "55%", w: "16%", h: "18%", color: "bg-slate-600" },
          { top: "70%", left: "10%", w: "24%", h: "14%", color: "bg-slate-500" },
        ].map((b, i) => (
          <div
            key={i}
            className={`absolute ${b.color} rounded-sm opacity-80`}
            style={{ top: b.top, left: b.left, width: b.w, height: b.h }}
          />
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-red-400/70 bg-red-400/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
          <svg width="22" height="28" viewBox="0 0 24 30" fill="none">
            <path d="M12 2C7.03 2 3 6.03 3 11c0 7 9 17 9 17s9-10 9-17c0-4.97-4.03-9-9-9z" fill="#f87171" />
            <circle cx="12" cy="11" r="3.5" fill="white" />
          </svg>
        </div>
        <div className="absolute bottom-3 right-3 bg-gray-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13" rx="1" />
            <path d="M16 8h4l3 3v5h-7V8z" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          Truck #14
        </div>
      </div>
      <div className="flex items-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
        <div>
          <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">Geofence Alert</p>
          <p className="text-sm font-semibold text-white mt-0.5">Vehicle entered restricted zone</p>
          <p className="text-xs text-gray-400 mt-0.5">Truck #14 · 2 min ago</p>
        </div>
      </div>
    </div>
  );
}

function FuelCard() {
  return (
    <div>
      <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-4 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold shrink-0">
            MH
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-none">Mike Hageman</p>
            <p className="text-xs text-white/70 mt-0.5">Driver · Route A-14</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mb-3">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60 shrink-0">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-xs text-white/70">Levi&apos;s Stadium, Santa Clara</span>
        </div>
        <div className="bg-white/10 rounded-lg px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs text-white/80">Discount on fuel</span>
          </div>
          <span className="text-sm font-bold text-green-300">$39.51</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
        <p className="text-xs text-gray-400">Fuel discount applied automatically</p>
      </div>
    </div>
  );
}

function SafetyCard() {
  const score = 94;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (score / 100) * circumference;

  const metrics = [
    { label: "Harsh braking", value: 82, color: "bg-blue-500" },
    { label: "Speeding",      value: 96, color: "bg-green-500" },
    { label: "Phone use",     value: 100, color: "bg-green-500" },
  ];

  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <div className="relative shrink-0">
          <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
            <circle cx="44" cy="44" r={radius} stroke="#374151" strokeWidth="7" fill="none" />
            <circle
              cx="44" cy="44" r={radius}
              stroke="#3b82f6" strokeWidth="7" fill="none"
              strokeDasharray={`${strokeDash} ${circumference}`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-black text-white">
            {score}
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Safety Score</p>
          <p className="text-sm font-semibold text-white mt-0.5">Excellent</p>
          <p className="text-xs text-gray-400 mt-0.5">Top 5% of fleet</p>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-400">{m.label}</span>
              <span className="text-xs font-medium text-white">{m.value}</span>
            </div>
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardContent({ variant }: { variant: CardVariant }) {
  if (variant === "geofence") return <GeofenceCard />;
  if (variant === "fuel")     return <FuelCard />;
  return <SafetyCard />;
}

// ── Progress dots ──────────────────────────────────────────────────────────────

function ProgressDots({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to card ${i + 1}`}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === active ? "bg-blue-400 w-6" : "bg-gray-600 w-1.5 hover:bg-gray-500"
          }`}
        />
      ))}
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const as const },
  }),
};

export default function Hero() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveCard((c) => (c + 1) % CARDS.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen bg-gray-950 overflow-x-clip flex flex-col lg:flex-row">

      {/* ── LEFT: text panel ─────────────────────────────────────────────── */}
      <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-start px-12 lg:px-24 pt-52 pb-16 tracking-[-0.08px]">

        {/* Headline — exact gomotive DevTools: 38px / weight 500 / -0.84px tracking / 39.52px line-height */}
        <motion.h1
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="text-[42px] font-medium leading-[44px] tracking-[-0.84px] text-white max-w-[420px] mb-5"
        >
          Vision AI Solutions for Industrial Automation
        </motion.h1>

        {/* Subtext */}
        <motion.p
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-base md:text-lg text-gray-400 leading-relaxed mb-8 max-w-lg"
        >
          Automate workflows using advanced computer vision.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-row items-center gap-4"
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center bg-gradient-to-r from-[#0a2da8] to-[#55aaff] hover:opacity-90 text-white font-semibold text-base px-10 py-4 rounded-[40px] tracking-[-0.08px] transition-opacity"
          >
            Get started
          </Link>
          <button className="inline-flex items-center justify-center border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors text-sm">
            Watch demo
          </button>
        </motion.div>
      </div>

      {/* ── RIGHT: cycling content ────────────────────────────────────────── */}
      <div className="relative w-full h-80 lg:h-auto lg:w-[45%]">

        {/* ── Desktop: video frame — starts near top, extends below fold so user scrolls to see bottom ── */}
        <div className="hidden lg:block absolute inset-x-6 top-44 -bottom-16 z-10">
          {/* Blue corner bracket decorations — radius matches frame (20px) */}
          <div className="absolute -top-2.5 -left-2.5 w-10 h-10 border-t-2 border-l-2 border-blue-400 rounded-tl-[20px] pointer-events-none" />
          <div className="absolute -top-2.5 -right-2.5 w-10 h-10 border-t-2 border-r-2 border-blue-400 rounded-tr-[20px] pointer-events-none" />
          <div className="absolute -bottom-2.5 -left-2.5 w-10 h-10 border-b-2 border-l-2 border-blue-400 rounded-bl-[20px] pointer-events-none" />
          <div className="absolute -bottom-2.5 -right-2.5 w-10 h-10 border-b-2 border-r-2 border-blue-400 rounded-br-[20px] pointer-events-none" />

          {/* Frame — border-radius: 20px, cursor: grab, overflow: clip (per DevTools) */}
          <div className="w-full h-full bg-gray-800 rounded-[20px] border border-gray-700 shadow-2xl overflow-hidden flex flex-col items-center justify-center gap-8 p-10 cursor-grab">
            <div className="w-full max-w-[360px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={CARDS[activeCard].id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1   }}
                  exit={{   opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <CardContent variant={CARDS[activeCard].variant} />
                </motion.div>
              </AnimatePresence>
            </div>
            <ProgressDots count={CARDS.length} active={activeCard} onSelect={setActiveCard} />
          </div>
        </div>

        {/* ── Mobile: small centered card ── */}
        <div className="lg:hidden relative z-10 flex flex-col items-center justify-center h-full p-6">
          <div className="w-full max-w-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={CARDS[activeCard].id + "-m"}
                initial={{ opacity: 0, x: 30, scale: 0.97 }}
                animate={{ opacity: 1, x: 0,  scale: 1    }}
                exit={{   opacity: 0, x: -30, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
                className="bg-gray-800 rounded-2xl p-4 shadow-2xl border border-gray-700 mb-5"
              >
                <CardContent variant={CARDS[activeCard].variant} />
              </motion.div>
            </AnimatePresence>
            <ProgressDots count={CARDS.length} active={activeCard} onSelect={setActiveCard} />
          </div>
        </div>
      </div>

    </section>
  );
}
