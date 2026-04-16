"use client";

import { motion, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const stats = [
  { value: 120000, suffix: "+", label: "Customers worldwide" },
  { value: 99, suffix: "%", label: "Uptime SLA" },
  { value: 30, suffix: "%", label: "Avg. reduction in accidents" },
  { value: 15, suffix: "min", label: "Average onboarding time" },
];

const logos = [
  "Acme Corp",
  "GlobalFreight",
  "SafeRoute",
  "FleetPro",
  "RoadMaster",
  "CargoFast",
  "TruckWorks",
  "LogiFlow",
];

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v: number) {
        setDisplay(Math.round(v));
      },
    });
    return controls.stop;
  }, [inView, value]);

  return (
    <span>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="social-proof"
      ref={sectionRef}
      className="py-24 bg-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3">
            Trusted at scale
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            The numbers speak for themselves.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-black text-blue-600 tabular-nums">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </p>
              <p className="mt-2 text-sm font-medium text-gray-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Logo strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-gray-200 pt-16"
        >
          <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-widest mb-10">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {logos.map((logo, i) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="text-gray-400 font-bold text-lg tracking-tight hover:text-gray-600 transition-colors cursor-default"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
