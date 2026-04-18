"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section
      id="contact"
      className="py-28 bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden relative"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Ready to automate your operations with Vision AI?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-xl text-blue-100 max-w-2xl"
        >
          Partner with XenReality to deploy intelligent Vision AI solutions
          tailored to your industry — faster than you think.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:scale-105 shadow-xl shadow-blue-900/30 text-lg"
          >
            Get started
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 border border-white/30 text-lg"
          >
            Read our blog
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
