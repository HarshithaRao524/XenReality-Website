"use client";

import Image from "next/image";
import { motion } from "motion/react";

const products = [
  {
    id: "xentrack",
    label: "XenTrack",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "from-blue-600 to-blue-800",
  },
  {
    id: "xeninspect",
    label: "XenInspect",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="M8 11h6M11 8v6" />
      </svg>
    ),
    color: "from-indigo-600 to-indigo-800",
  },
  {
    id: "xenread",
    label: "XenRead",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    color: "from-violet-600 to-violet-800",
  },
  {
    id: "xenscan",
    label: "XenScan",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    color: "from-cyan-600 to-cyan-800",
  },
  {
    id: "xencapture",
    label: "XenCapture",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    color: "from-teal-600 to-teal-800",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: -30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const LINE_X = [80, 240, 400, 560, 720];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function PlatformDiagram() {
  return (
    <section id="platform" className="py-28 bg-gray-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-blue-400 font-semibold mb-4">
            Integrated Operations Platform
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            A fully integrated suite of products,{" "}
            <span className="text-blue-400">powered by AI.</span>
          </h2>
        </motion.div>

        {/* Diagram */}
        <div className="relative flex flex-col items-center">

          {/* Product cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full"
          >
            {products.map((product) => (
              <motion.button
                key={product.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.04 }}
                onClick={() => scrollToSection(product.id)}
                className="group cursor-pointer text-left"
              >
                <div
                  className={`bg-gradient-to-br ${product.color} rounded-2xl p-5 flex flex-col items-center gap-3 text-center border border-white/10 shadow-xl transition-shadow duration-300 group-hover:shadow-2xl`}
                >
                  <div className="text-white/90">{product.icon}</div>
                  <span className="text-xs font-semibold text-white/80 leading-tight">
                    {product.label}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Connecting lines */}
          <svg
            className="w-full max-w-4xl h-28 pointer-events-none hidden md:block"
            viewBox="0 0 800 112"
            fill="none"
          >
            {LINE_X.map((x, i) => (
              <motion.line
                key={i}
                x1={x} y1="0" x2="400" y2="112"
                stroke="#3b82f6"
                strokeWidth="1"
                strokeOpacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.07 }}
              />
            ))}
          </svg>

          {/* Central hub — XenReality logomark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative z-10 w-20 h-20 rounded-2xl shadow-2xl shadow-blue-600/40 overflow-hidden"
          >
            <Image
              src="/XenRealitymark.png"
              alt="XenReality"
              width={80}
              height={80}
              unoptimized
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
