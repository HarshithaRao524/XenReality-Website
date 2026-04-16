"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    id: "driver-safety",
    badge: "Driver Safety",
    headline: "Use accurate AI to reduce risk on the road.",
    description:
      "Protect your drivers with 360° visibility and AI that alerts in real time to prevent collisions. Automatically coach drivers on unsafe behaviours and track safety scores over time.",
    cta: { label: "Learn more", href: "#" },
    image: "/feature-driver-safety.jpg",
    imagePlaceholder: "bg-gradient-to-br from-blue-900 to-blue-700",
    reverse: false,
  },
  {
    id: "fleet",
    badge: "Fleet Management",
    headline: "Complete visibility into every vehicle and asset.",
    description:
      "Track locations in real time, set geofences, and get instant alerts when vehicles leave approved zones. Reduce idle time, fuel costs, and unauthorized usage.",
    cta: { label: "Learn more", href: "#" },
    image: "/feature-fleet.jpg",
    imagePlaceholder: "bg-gradient-to-br from-indigo-900 to-indigo-700",
    reverse: true,
  },
  {
    id: "ai-vision",
    badge: "AI Vision",
    headline: "Detect incidents before they become accidents.",
    description:
      "Dual-facing cameras with on-board AI identify harsh braking, distracted driving, and fatigue. Exonerate drivers with timestamped video and sensor data.",
    cta: { label: "Learn more", href: "#" },
    image: "/feature-ai-vision.jpg",
    imagePlaceholder: "bg-gradient-to-br from-violet-900 to-violet-700",
    reverse: false,
  },
];

const slideIn = (reverse: boolean) => ({
  hidden: { opacity: 0, x: reverse ? 40 : -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const slideInOpposite = (reverse: boolean) => ({
  hidden: { opacity: 0, x: reverse ? -40 : 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 },
  },
});

export default function FeatureSpotlight() {
  return (
    <section id="features" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-32">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`flex flex-col ${
              feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center gap-16`}
          >
            {/* Text */}
            <motion.div
              variants={slideIn(feature.reverse)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex-1 flex flex-col gap-5"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 uppercase tracking-wider">
                <span className="w-4 h-0.5 bg-blue-600" />
                {feature.badge}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {feature.headline}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              <Link
                href={feature.cta.href}
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-200 mt-2 w-fit"
              >
                {feature.cta.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>

            {/* Image / visual */}
            <motion.div
              variants={slideInOpposite(feature.reverse)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex-1 w-full"
            >
              <div
                className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ${feature.imagePlaceholder}`}
              >
                {/* Replace with real Image once you have assets */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-sm font-medium">
                    {feature.badge} screenshot
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
