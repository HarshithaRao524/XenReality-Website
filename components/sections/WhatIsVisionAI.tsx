"use client";

import { motion } from "motion/react";

const bullets = [
  "Machine learning models, are utilised to analyse and interpret visual data in image/video formats",
  "Training using labelled visual datasets helps to identify and understand various patterns and features",
  "Applying learned patterns to comprehend new visual data",
];

// Concentric ring definitions — varying radius, dash pattern, opacity and offset
const RINGS = [
  { r: 260, dx: 10,  dy: -20, dash: "3 9",  opacity: 0.12 },
  { r: 210, dx: -5,  dy: 10,  dash: "2 8",  opacity: 0.18 },
  { r: 165, dx: 15,  dy: 5,   dash: "4 7",  opacity: 0.22 },
  { r: 120, dx: -10, dy: -8,  dash: "3 6",  opacity: 0.28 },
  { r: 82,  dx: 6,   dy: 12,  dash: "2 5",  opacity: 0.35 },
  { r: 48,  dx: -4,  dy: -4,  dash: "3 4",  opacity: 0.45 },
  { r: 22,  dx: 2,   dy: 2,   dash: "2 3",  opacity: 0.55 },
];

export default function WhatIsVisionAI() {
  return (
    <section className="text-white">
      <div className="flex flex-col lg:flex-row">

        {/* ── Left: dark panel with topographic circle viz ── */}
        <div className="relative w-full lg:w-1/2 bg-black min-h-[440px] lg:min-h-[520px] flex items-center justify-center overflow-hidden">

          {/* Topographic rings SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 600 520"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Centre point glow — shifted to upper area */}
            <circle cx="310" cy="155" r="3" fill="white" fillOpacity="0.9" />
            <circle cx="310" cy="155" r="10" fill="white" fillOpacity="0.06" />
            <circle cx="310" cy="155" r="22" fill="white" fillOpacity="0.03" />

            {/* Topographic rings — centred on upper portion, leaving lower area clear */}
            {RINGS.map((ring, i) => (
              <circle
                key={i}
                cx={310 + ring.dx}
                cy={155 + ring.dy}
                r={ring.r}
                stroke="white"
                strokeWidth="0.8"
                strokeDasharray={ring.dash}
                strokeOpacity={ring.opacity}
                fill="none"
              />
            ))}

            {/* Tilted ellipses */}
            <ellipse cx="305" cy="153" rx="140" ry="95"  stroke="white" strokeWidth="0.6" strokeDasharray="2 7" strokeOpacity="0.14" transform="rotate(-18 305 153)" fill="none" />
            <ellipse cx="315" cy="160" rx="195" ry="130" stroke="white" strokeWidth="0.6" strokeDasharray="3 8" strokeOpacity="0.10" transform="rotate(12 315 160)"  fill="none" />
          </svg>

          {/* Title — centred */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative z-10 text-center px-10"
          >
            <h2 className="text-4xl font-semibold text-white leading-snug">
              What is Vision AI?
            </h2>
          </motion.div>
        </div>

        {/* ── Right: text content ── */}
        <div className="w-full lg:w-1/2 bg-[#0d1117] flex items-center px-10 lg:px-16 py-16">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="w-full"
          >
            <p className="text-base text-gray-200 leading-relaxed mb-10">
              Vision AI involves the use of AI to analyse, understand &amp; respond to visual data
            </p>

            <ul className="space-y-6">
              {bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 text-base text-gray-300 leading-relaxed"
                >
                  <span className="mt-2 w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                  {bullet}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
