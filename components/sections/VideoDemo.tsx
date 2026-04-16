"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export default function VideoDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-28 bg-gray-950" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-sm uppercase tracking-widest text-blue-400 font-semibold mb-4">
            See it in action
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Everything you need,{" "}
            <span className="text-blue-400">in one platform.</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Watch how teams use our platform to cut costs, improve safety scores,
            and run more efficiently from day one.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900"
        >
          {/* Aspect ratio wrapper */}
          <div className="relative aspect-video">
            {visible ? (
              /*
               * Replace the src with your Cloudflare Stream iframe URL:
               * https://iframe.cloudflarestream.com/YOUR_VIDEO_ID
               */
              <iframe
                src="about:blank"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Product demo"
              />
            ) : (
              /* Placeholder shown before intersection */
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 to-gray-950">
                <div className="w-20 h-20 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center mb-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">Loading video…</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
