"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import XenRealityLogo from "@/components/ui/XenRealityLogo";

// ── Types ──────────────────────────────────────────────────────────────────────

type PlainLink = { kind: "link"; label: string; href: string };
type MegaItem  = { kind: "mega"; label: string; panelId: string };
type NavItem   = PlainLink | MegaItem;

interface MegaSection {
  heading: string;
  columns: 1 | 2;
  items: { label: string; href: string; description?: string }[];
}

interface MegaAside {
  tag: string;
  headline: string;
  href: string;
  gradientClass: string;
}

interface MegaPanel {
  sections: MegaSection[];
  aside?: MegaAside;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { kind: "link", label: "Home",         href: "/"             },
  { kind: "mega", label: "Products",     panelId: "products"   },
  { kind: "link", label: "Case Studies", href: "#case-studies" },
  { kind: "mega", label: "Company",      panelId: "company"    },
  { kind: "link", label: "Blog",         href: "/blog"         },
  { kind: "link", label: "Contact",      href: "#contact"      },
];

const MEGA_PANELS: Record<string, MegaPanel> = {
  products: {
    sections: [
      {
        heading: "OUR PRODUCTS",
        columns: 2,
        items: [
          { label: "XenTrack",   href: "/#xentrack",   description: "Footfall, zone timings and dwell time analytics" },
          { label: "XenInspect", href: "/#xeninspect", description: "Custom defect detection using Computer Vision" },
          { label: "XenRead",    href: "/#xenread",    description: "OCR, detection and information extraction from images" },
          { label: "XenScan",    href: "/#xenscan",    description: "Facial recognition, customer profiling and number plate recognition" },
          { label: "XenCapture", href: "/#xencapture", description: "AI Powered 3D Content Creation Tool" },
        ],
      },
    ],
    aside: {
      tag: "New",
      headline: "Introducing XenCapture — AI-powered 3D content creation for any industry.",
      href: "#",
      gradientClass: "from-blue-600 via-blue-700 to-indigo-800",
    },
  },

  company: {
    sections: [
      {
        heading: "COMPANY",
        columns: 1,
        items: [
          { label: "About",               href: "#about",       description: "Our mission and story" },
          { label: "Careers",             href: "#careers",     description: "Join the team" },
          { label: "Partnership Program", href: "#partnership", description: "Work with us" },
          { label: "News",                href: "#news",        description: "Latest updates and announcements" },
        ],
      },
    ],
  },
};

// ── MegaMenuPanel ──────────────────────────────────────────────────────────────

function MegaMenuPanel({ panelId }: { panelId: string }) {
  const panel = MEGA_PANELS[panelId];
  if (!panel) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      exit={{   opacity: 0, y: -6, scale: 0.98  }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden min-w-[580px]"
    >
      <div className="flex gap-8 p-8 items-start">
        {/* Sections */}
        <div className="flex gap-10 flex-1">
          {panel.sections.map((section) => (
            <div key={section.heading} className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                {section.heading}
              </p>
              <div
                className={`grid gap-x-8 ${
                  section.columns === 2 ? "grid-cols-2" : "grid-cols-1"
                }`}
              >
                {section.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex flex-col py-2 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="text-xs text-gray-400 mt-0.5 leading-snug">
                        {item.description}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Aside card */}
        {panel.aside && (
          <div className="shrink-0 w-56 border-l border-gray-100 pl-8">
            <div
              className={`h-36 rounded-xl bg-gradient-to-br ${panel.aside.gradientClass} mb-3 overflow-hidden relative`}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                }}
              />
              {/* Decorative badge in corner */}
              <div className="absolute bottom-3 right-3 bg-white/20 rounded-lg px-2 py-1">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                  {panel.aside.tag}
                </span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
              {panel.aside.tag}
            </span>
            <p className="text-sm font-semibold text-gray-900 mt-1 leading-snug">
              {panel.aside.headline}
            </p>
            <Link
              href={panel.aside.href}
              className="text-sm text-blue-600 font-medium mt-2 inline-block hover:underline"
            >
              Read story →
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled]             = useState(false);
  const [activePanel, setActivePanel]       = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openPanel(id: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActivePanel(id);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActivePanel(null), 150);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  // Navbar turns white only on scroll — NOT on hover
  const isLight = scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLight
          ? "bg-white shadow-sm"
          : "bg-gray-950 border-b border-white/10"
      }`}
    >
      {/* Main nav bar */}
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <XenRealityLogo onDark={!isLight} />
        </Link>

        {/* Center nav — flex-1 so it never overlaps logo or right actions */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          {NAV_ITEMS.map((item) => {
            if (item.kind === "link") {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-2 text-base font-semibold transition-colors ${
                    isLight
                      ? "text-gray-600 hover:text-gray-900"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }
            const isActive = activePanel === item.panelId;
            return (
              <button
                key={item.label}
                onMouseEnter={() => openPanel(item.panelId)}
                onMouseLeave={scheduleClose}
                className={`px-3.5 py-2 text-base font-semibold transition-colors flex items-center gap-1 relative ${
                  isLight
                    ? isActive
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                    : isActive
                      ? "text-white"
                      : "text-white hover:text-white/80"
                }`}
              >
                {item.label}
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Active underline — always blue */}
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full bg-blue-500" />
                )}
              </button>
            );
          })}
        </div>


        {/* Mobile hamburger */}
        <button
          className={`ml-auto lg:hidden p-2 rounded-md transition-colors ${
            scrolled ? "text-gray-700" : "text-white"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Desktop mega-menu — floating rounded card, centered below nav */}
      <AnimatePresence>
        {activePanel && (
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-40"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <MegaMenuPanel panelId={activePanel} />
          </div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                if (item.kind === "link") {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-sm font-medium text-gray-700 py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }
                const expanded = mobileExpanded === item.panelId;
                return (
                  <div key={item.label}>
                    <button
                      className="w-full flex items-center justify-between text-sm font-medium text-gray-700 py-2"
                      onClick={() => setMobileExpanded(expanded ? null : item.panelId)}
                    >
                      {item.label}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {expanded && (
                      <div className="pl-4 pb-2 flex flex-col gap-1">
                        {MEGA_PANELS[item.panelId]?.sections.flatMap((s) =>
                          s.items.map((link) => (
                            <Link
                              key={link.label}
                              href={link.href}
                              className="text-sm text-gray-600 hover:text-blue-600 py-1.5"
                              onClick={() => setMobileOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
