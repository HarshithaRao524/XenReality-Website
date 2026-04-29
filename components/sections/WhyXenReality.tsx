"use client";

import { motion } from "motion/react";

const FEATURES = [
  {
    label: "Edge-optimised models",
    description: "Runs on edge hardware with minimal compute and near-zero latency.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
      </svg>
    ),
    gradient: "from-[#2E3192] to-[#1a5cac]",
    glow: "rgba(46,49,146,0.35)",
  },
  {
    label: "On-prem / private cloud",
    description: "Deploy entirely within your own environment — no data ever leaves.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <path d="M6 6h.01M6 18h.01" />
      </svg>
    ),
    gradient: "from-[#1a5cac] to-[#0680c2]",
    glow: "rgba(26,92,172,0.35)",
  },
  {
    label: "Safeguarded data",
    description: "Enterprise-grade security with full data sovereignty and compliance.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    gradient: "from-[#0680c2] to-[#029ad9]",
    glow: "rgba(6,128,194,0.35)",
  },
  {
    label: "Works on existing infra",
    description: "Integrates with your current CCTV, cameras, and systems — no rip-and-replace.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    gradient: "from-[#029ad9] to-[#00AEEF]",
    glow: "rgba(2,154,217,0.35)",
  },
  {
    label: "High accuracy, real-time",
    description: "Industry-leading precision with sub-second inference on every frame.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    ),
    gradient: "from-[#00AEEF] to-[#00A651]",
    glow: "rgba(0,174,239,0.35)",
  },
  {
    label: "< 2 weeks deployment",
    description: "Go from contract to live production in under two weeks, guaranteed.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    gradient: "from-[#00A651] to-[#2E3192]",
    glow: "rgba(0,166,81,0.35)",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const card = {
  hidden:  { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function WhyXenReality() {
  return (
    <section className="rounded-t-[2.5rem] relative z-10 -mt-10 bg-[#050a14] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Why choose XenReality?
          </h2>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.label}
              variants={card}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-2xl p-5 border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-300 cursor-default overflow-hidden flex flex-col items-center text-center"
              style={{ boxShadow: `0 0 0 0 ${f.glow}` }}
            >
              {/* Subtle glow blob behind card */}
              <div
                className="absolute -top-8 -left-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
                style={{ background: f.glow }}
              />

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white mb-4 shadow-lg`}
              >
                {f.icon}
              </div>

              {/* Text */}
              <h3 className="text-base font-semibold text-white leading-snug">
                {f.label}
              </h3>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
