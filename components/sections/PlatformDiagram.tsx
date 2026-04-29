"use client";

import { motion } from "motion/react";

// Brand color progression: #2E3192 (dark) → #00AEEF (light) across 5 cards
const products = [
  {
    id: "xentrack",
    label: "XenTrack",
    bg: "#2E3192",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "xeninspect",
    label: "XenInspect",
    bg: "#1a5cac",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="M8 11h6M11 8v6" />
      </svg>
    ),
  },
  {
    id: "xenread",
    label: "XenRead",
    bg: "#0680c2",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: "xenscan",
    label: "XenScan",
    bg: "#029ad9",
    icon: (
      // Facial recognition / object tracking — corner brackets + face
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 7V4a1 1 0 0 1 1-1h3" />
        <path d="M22 7V4a1 1 0 0 0-1-1h-3" />
        <path d="M2 17v3a1 1 0 0 0 1 1h3" />
        <path d="M22 17v3a1 1 0 0 1-1 1h-3" />
        <circle cx="12" cy="10" r="3" />
        <path d="M9 17c0-1.66 1.34-3 3-3s3 1.34 3 3" />
      </svg>
    ),
  },
  {
    id: "xencapture",
    label: "XenCapture",
    bg: "#00AEEF",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function PlatformDiagram() {
  return (
    <section id="platform" className="rounded-t-[2.5rem] relative z-10 -mt-10 pt-24 pb-20 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Eyebrow — small */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Plug-n-play Vision AI Platform for industrial automation.
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Automate vision-based tasks<br />
            with our lightweight, edge-optimised AI modules:
          </h2>
        </motion.div>

        {/* Dark product panel — Motive style */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="bg-[#050a14] rounded-3xl px-10 pt-12 pb-8"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mb-8"
          >
            {products.map((product) => (
              <motion.button
                key={product.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.05 }}
                onClick={() => scrollToSection(product.id)}
                className="group cursor-pointer"
              >
                <div
                  className="rounded-2xl p-6 flex flex-col items-center gap-4 text-center border border-white/10 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:border-white/20"
                  style={{ backgroundColor: product.bg }}
                >
                  <div className="text-white">{product.icon}</div>
                  <span className="text-sm font-semibold text-white leading-tight">
                    {product.label}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Tagline inside dark panel */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-sm text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis pb-4"
          >
            Transform how your business interacts with visual data, providing new opportunities for improving efficiency, profitability &amp; innovation.
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}
