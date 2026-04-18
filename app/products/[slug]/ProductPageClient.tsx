"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProductTab {
  label: string;
  heading: string;
  body: string;
  bullets: string[];
}

export interface ProductData {
  slug: string;
  name: string;
  label: string;
  tagline: string;
  heroSubtext: string;
  introHeadline: string;
  introSubtext: string;
  tabs: ProductTab[];
  useCases: string[];
}

// ── Hero mockups (product-specific UI cards) ──────────────────────────────────

function XenTrackMockup() {
  return (
    <div className="bg-gray-900 rounded-2xl border border-white/10 p-5 w-full max-w-sm shadow-2xl text-white font-sans text-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-white text-base">XenTrack Dashboard</span>
        <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          LIVE
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: "Footfall Today", value: "4,281", change: "+12%" },
          { label: "Active Zones",   value: "8",     change: "of 10" },
          { label: "Avg Dwell Time", value: "3.4m",  change: "+0.4m" },
          { label: "Peak Zone",      value: "Zone B", change: "now"  },
        ].map((m) => (
          <div key={m.label} className="bg-gray-800 rounded-xl p-3">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">{m.label}</p>
            <p className="text-white font-bold text-lg leading-none">{m.value}</p>
            <p className="text-green-400 text-[10px] mt-0.5">{m.change}</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-800 rounded-xl p-3">
        <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-2">Zone Occupancy</p>
        {[
          { zone: "Zone A", pct: 62, color: "bg-blue-500"  },
          { zone: "Zone B", pct: 84, color: "bg-green-500" },
          { zone: "Zone C", pct: 41, color: "bg-yellow-500"},
          { zone: "Zone D", pct: 23, color: "bg-gray-500"  },
        ].map((z) => (
          <div key={z.zone} className="flex items-center gap-2 mb-1.5 last:mb-0">
            <span className="text-gray-400 text-[10px] w-12 shrink-0">{z.zone}</span>
            <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full ${z.color} rounded-full`} style={{ width: `${z.pct}%` }} />
            </div>
            <span className="text-gray-300 text-[10px] w-7 text-right">{z.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function XenInspectMockup() {
  return (
    <div className="bg-gray-900 rounded-2xl border border-white/10 p-5 w-full max-w-sm shadow-2xl text-white font-sans text-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-white text-base">Production Line 3</span>
        <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          RUNNING
        </span>
      </div>
      {/* Camera view simulation */}
      <div className="relative bg-gray-800 rounded-xl overflow-hidden aspect-video mb-4 flex items-center justify-center">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-10">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border border-gray-500" />
          ))}
        </div>
        {/* Simulated product shape */}
        <div className="relative w-24 h-16 bg-gray-600 rounded-md">
          {/* Defect highlight box */}
          <div className="absolute top-2 right-3 w-7 h-5 border-2 border-red-400 rounded-sm">
            <span className="absolute -top-3 left-0 text-[8px] text-red-400 font-bold whitespace-nowrap">DEFECT</span>
          </div>
        </div>
        <div className="absolute bottom-2 left-2 text-[9px] text-gray-400">cam_line3_01 · 30fps</div>
      </div>
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-3">
        <p className="text-yellow-400 text-[10px] font-semibold uppercase tracking-wider mb-1">⚠ Defect Detected</p>
        <p className="text-white text-xs font-medium">Surface scratch — Confidence 94.2%</p>
        <p className="text-gray-400 text-[10px] mt-0.5">Action: Rejected · 2 min ago</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Inspected", value: "1,204", color: "text-white" },
          { label: "Passed",    value: "1,186", color: "text-green-400" },
          { label: "Rejected",  value: "18",    color: "text-red-400"  },
        ].map((s) => (
          <div key={s.label} className="bg-gray-800 rounded-xl p-2.5 text-center">
            <p className={`font-bold text-base ${s.color}`}>{s.value}</p>
            <p className="text-gray-500 text-[9px] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function XenReadMockup() {
  return (
    <div className="bg-gray-900 rounded-2xl border border-white/10 p-5 w-full max-w-sm shadow-2xl text-white font-sans text-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-white text-base">Document Extraction</span>
        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-medium">Complete</span>
      </div>
      {/* Document preview */}
      <div className="bg-white rounded-xl p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-800 text-[11px] font-bold">INVOICE</span>
          <span className="text-gray-500 text-[10px]">#INV-2026-0394</span>
        </div>
        {[
          { field: "Vendor",    value: "Acme Corp Ltd"  },
          { field: "Date",      value: "16 Apr 2026"    },
          { field: "Amount",    value: "$4,280.00"       },
          { field: "Due Date",  value: "30 Apr 2026"    },
        ].map((row) => (
          <div key={row.field} className="flex justify-between py-1 border-b border-gray-100 last:border-0">
            <span className="text-gray-500 text-[10px]">{row.field}</span>
            <span className="text-[10px] font-medium text-blue-700 bg-blue-50 px-1.5 rounded">{row.value}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {[
          { label: "Fields extracted", value: "8 / 8",   ok: true  },
          { label: "Confidence",        value: "98.4%",  ok: true  },
          { label: "Processing time",   value: "0.8s",   ok: true  },
          { label: "Language detected", value: "English",ok: true  },
        ].map((r) => (
          <div key={r.label} className="flex items-center justify-between bg-gray-800 rounded-lg px-3 py-2">
            <span className="text-gray-400 text-[10px]">{r.label}</span>
            <span className="text-green-400 text-[10px] font-semibold">✓ {r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function XenScanMockup() {
  return (
    <div className="bg-gray-900 rounded-2xl border border-white/10 p-5 w-full max-w-sm shadow-2xl text-white font-sans text-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-white text-base">Camera Feed 04</span>
        <span className="flex items-center gap-1.5 text-xs text-red-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          LIVE
        </span>
      </div>
      {/* Camera grid */}
      <div className="grid grid-cols-2 gap-1.5 mb-4">
        {[1, 2, 3, 4].map((cam) => (
          <div key={cam} className={`relative rounded-lg overflow-hidden aspect-video flex items-center justify-center ${cam === 2 ? "ring-2 ring-blue-400" : "bg-gray-800"}`} style={{ background: cam === 2 ? "#1e293b" : undefined }}>
            <div className="absolute inset-0 opacity-20 grid grid-cols-4 grid-rows-3">
              {Array.from({ length: 12 }).map((_, i) => <div key={i} className="border border-gray-600" />)}
            </div>
            {cam === 2 && (
              <>
                <div className="relative w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 12c2.7 0 4-1.3 4-4s-1.3-4-4-4-4 1.3-4 4 1.3 4 4 4zm0 2c-2.7 0-8 1.3-8 4v1h16v-1c0-2.7-5.3-4-8-4z"/></svg>
                  <div className="absolute inset-0 border-2 border-blue-400 rounded-full" />
                </div>
              </>
            )}
            <span className="absolute bottom-0.5 right-1 text-[8px] text-gray-500">CAM {cam}</span>
          </div>
        ))}
      </div>
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 mb-3">
        <p className="text-blue-400 text-[10px] font-semibold uppercase tracking-wider mb-1">✓ Match Found</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-xs font-medium">ID: #VIP-291</p>
            <p className="text-gray-400 text-[10px]">Access Granted</p>
          </div>
          <span className="text-2xl font-black text-blue-400">97.8%</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-800 rounded-xl p-2.5 text-center">
          <p className="text-white font-bold text-base">342</p>
          <p className="text-gray-500 text-[9px] mt-0.5">Plates today</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-2.5 text-center">
          <p className="text-red-400 font-bold text-base">2</p>
          <p className="text-gray-500 text-[9px] mt-0.5">Active alerts</p>
        </div>
      </div>
    </div>
  );
}

function XenCaptureMockup() {
  return (
    <div className="bg-gray-900 rounded-2xl border border-white/10 p-5 w-full max-w-sm shadow-2xl text-white font-sans text-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-white text-base">Capture Session</span>
        <span className="text-xs bg-teal-500/20 text-teal-400 px-2 py-0.5 rounded-full font-medium">✓ Complete</span>
      </div>
      {/* 3D wireframe simulation */}
      <div className="bg-gray-800 rounded-xl aspect-video mb-4 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 200 120" className="w-full h-full opacity-60" fill="none" stroke="#22d3ee" strokeWidth="0.8">
          {/* Wireframe cube */}
          <polygon points="70,30 130,30 160,60 100,60" strokeOpacity="0.8"/>
          <polygon points="70,30 100,60 100,95 70,65" strokeOpacity="0.6"/>
          <polygon points="130,30 160,60 160,95 130,65" strokeOpacity="0.5"/>
          <line x1="70" y1="65" x2="100" y2="95" strokeOpacity="0.6"/>
          <line x1="100" y1="95" x2="160" y2="95" strokeOpacity="0.5"/>
          <line x1="70" y1="65" x2="130" y2="65" strokeOpacity="0.4"/>
          {/* Interior lines */}
          <line x1="70" y1="30" x2="130" y2="65" strokeOpacity="0.2" strokeDasharray="2,2"/>
          <line x1="130" y1="30" x2="70" y2="65" strokeOpacity="0.2" strokeDasharray="2,2"/>
        </svg>
        <div className="absolute bottom-2 left-2 text-[9px] text-teal-400">Product_A_v2.glb</div>
        <div className="absolute top-2 right-2 text-[9px] text-gray-500">45,820 polys</div>
      </div>
      <div className="space-y-2 mb-3">
        {[
          { label: "Texture quality",  value: "4K PBR"   },
          { label: "File size",         value: "12.4 MB"  },
          { label: "Processing time",   value: "4m 12s"   },
        ].map((r) => (
          <div key={r.label} className="flex justify-between bg-gray-800 rounded-lg px-3 py-2">
            <span className="text-gray-400 text-[10px]">{r.label}</span>
            <span className="text-white text-[10px] font-semibold">{r.value}</span>
          </div>
        ))}
      </div>
      <div className="bg-gray-800 rounded-xl p-3">
        <p className="text-gray-400 text-[10px] mb-2">Export formats</p>
        <div className="flex gap-2">
          {["glTF", "USDZ", "FBX", "OBJ"].map((fmt) => (
            <span key={fmt} className="text-[10px] font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2 py-1 rounded-md">
              {fmt}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroMockup({ slug }: { slug: string }) {
  switch (slug) {
    case "xentrack":   return <XenTrackMockup />;
    case "xeninspect": return <XenInspectMockup />;
    case "xenread":    return <XenReadMockup />;
    case "xenscan":    return <XenScanMockup />;
    case "xencapture": return <XenCaptureMockup />;
    default:           return null;
  }
}

// ── Page client ───────────────────────────────────────────────────────────────

export default function ProductPageClient({ product }: { product: ProductData }) {
  const [activeTab, setActiveTab] = useState(0);
  const tab = product.tabs[activeTab];

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen bg-gray-950 overflow-x-clip flex flex-col lg:flex-row pt-16">
          {/* Left — text */}
          <div className="relative z-10 w-full lg:w-[52%] flex flex-col justify-center px-10 lg:px-20 pt-20 pb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-5">
              {product.label}
            </p>
            <h1 className="text-[42px] font-bold leading-[48px] tracking-tight text-white max-w-[480px] mb-6">
              {product.tagline}
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-lg">
              {product.heroSubtext}
            </p>
            <div className="flex flex-row items-center gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#2E3192] to-[#00AEEF] hover:opacity-90 text-white font-semibold text-base px-10 py-3.5 rounded-[40px] transition-opacity"
              >
                Get started
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center border border-white/30 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors text-base"
              >
                ← Back
              </Link>
            </div>
          </div>

          {/* Right — mockup */}
          <div className="relative w-full lg:w-[48%] flex items-center justify-center px-8 py-16 lg:py-0">
            <HeroMockup slug={product.slug} />
          </div>
        </section>

        {/* ── Intro ─────────────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              {product.introHeadline}
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              {product.introSubtext}
            </p>
          </div>
        </section>

        {/* ── Feature tabs ──────────────────────────────────────────────── */}
        <section className="pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">

            {/* Tab bar */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {product.tabs.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                    i === activeTab
                      ? "bg-gray-900 text-white border-gray-900 shadow-md"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Text */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-3xl font-bold text-gray-900 mb-5 leading-snug">
                  {tab.heading}
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  {tab.body}
                </p>
                <ul className="space-y-3">
                  {tab.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-700">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual — reuse the hero mockup */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="w-full max-w-sm">
                  <HeroMockup slug={product.slug} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Use cases ─────────────────────────────────────────────────── */}
        <section className="py-20 bg-gray-950">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">
              Industries
            </p>
            <h2 className="text-3xl font-bold text-white mb-10">
              Built for the industries that need it most.
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {product.useCases.map((uc) => (
                <span
                  key={uc}
                  className="px-6 py-3 rounded-full border border-white/20 text-white/80 text-sm font-medium hover:border-white/40 transition-colors"
                >
                  {uc}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-5">
              Ready to see {product.name} in action?
            </h2>
            <p className="text-lg text-gray-500 mb-10">
              Talk to our team and get a personalised demo for your use case.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2E3192] to-[#00AEEF] hover:opacity-90 text-white font-semibold px-10 py-4 rounded-full transition-opacity text-base"
            >
              Request a demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
