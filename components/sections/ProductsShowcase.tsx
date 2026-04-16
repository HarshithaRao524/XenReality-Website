"use client";

import { motion } from "motion/react";
import Link from "next/link";

const PRODUCTS = [
  {
    slug: "xentrack",
    name: "XenTrack",
    label: "Footfall & Zone Analytics",
    description:
      "Understand how people move through your space with real-time footfall counting, zone dwell-time analytics, and AI-generated heatmaps.",
    features: [
      "Real-time people counting at entry & exit points",
      "Zone-level dwell time and engagement metrics",
      "AI-generated floor heatmaps updated live",
      "Peak-hour detection for staffing optimisation",
    ],
    color: "from-blue-600 to-blue-800",
    iconPath:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    slug: "xeninspect",
    name: "XenInspect",
    label: "AI Defect Detection",
    description:
      "Catch defects before they reach your customers. XenInspect runs custom Computer Vision models on your production line to flag faults in real time.",
    features: [
      "Production-speed defect detection on any line",
      "Custom model training on your products & defect types",
      "Automated QC reports per batch and shift",
      "REST API and OPC-UA integration ready",
    ],
    color: "from-indigo-600 to-indigo-800",
    iconPath:
      "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    slug: "xenread",
    name: "XenRead",
    label: "OCR & Document Intelligence",
    description:
      "Turn any document or image into clean, structured data instantly. XenRead extracts, validates and routes information from forms, invoices, labels and more.",
    features: [
      "50+ language OCR with field-level extraction",
      "Handwritten and printed form processing",
      "Automatic document classification and routing",
      "Simple REST API and webhook delivery",
    ],
    color: "from-violet-600 to-violet-800",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    slug: "xenscan",
    name: "XenScan",
    label: "Recognition & Profiling",
    description:
      "Enterprise-grade facial recognition, customer profiling and number plate recognition — designed for security, retail intelligence and access control.",
    features: [
      "Multi-feed facial recognition with sub-second latency",
      "Anonymised demographic customer profiling",
      "ANPR across entry points, car parks & roadways",
      "Instant watchlist alerts with GDPR-compliant modes",
    ],
    color: "from-cyan-600 to-cyan-800",
    iconPath:
      "M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-9a9 9 0 100 18A9 9 0 0012 3z",
  },
  {
    slug: "xencapture",
    name: "XenCapture",
    label: "AI 3D Content Creation",
    description:
      "Go from real world to photorealistic 3D in minutes. Capture with any smartphone — XenCapture reconstructs precise, AR/VR-ready 3D models automatically.",
    features: [
      "AI photogrammetry from any smartphone camera",
      "Exports to glTF, USDZ, FBX and OBJ",
      "Full-room and site spatial scanning",
      "Cloud processing — no specialist hardware needed",
    ],
    color: "from-teal-600 to-teal-800",
    iconPath:
      "M20 7l-8-4-8 4m16 0v10l-8 4m-8-4V7m16 10l-8-4m-8 4l8-4",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ProductsShowcase() {
  return (
    <section className="bg-white">
      {PRODUCTS.map((product, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={product.slug}
            id={product.slug}
            className={`py-24 ${isEven ? "bg-white" : "bg-gray-50"}`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div
                className={`flex flex-col lg:flex-row items-center gap-16 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Visual */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full lg:w-1/2 shrink-0"
                >
                  <div
                    className={`rounded-3xl bg-gradient-to-br ${product.color} p-16 flex items-center justify-center aspect-square max-w-md mx-auto shadow-2xl`}
                  >
                    <svg
                      width="120"
                      height="120"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-90"
                    >
                      <path d={product.iconPath} />
                    </svg>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="w-full lg:w-1/2"
                >
                  <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3">
                    {product.label}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-lg text-gray-500 leading-relaxed mb-8">
                    {product.description}
                  </p>

                  <ul className="space-y-3 mb-10">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-700 text-base">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0a2da8] to-[#55aaff] hover:opacity-90 text-white font-semibold px-8 py-3.5 rounded-full transition-opacity text-base"
                  >
                    Know more
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
