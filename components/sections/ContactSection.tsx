"use client";

import { useState } from "react";

const PRODUCTS = [
  "XenTrack — Footfall & Zone Analytics",
  "XenInspect — AI Defect Detection",
  "XenRead — OCR & Document Intelligence",
  "XenScan — Recognition & Profiling",
  "XenCapture — AI 3D Content Creation",
  "Customize — Build a custom solution",
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="bg-white py-24 px-6">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Message sent!</h2>
          <p className="text-gray-500 text-sm">We&apos;ll get back to you shortly.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-[32px] md:text-[40px] font-medium text-gray-900 mb-2">
            Contact Us
          </h1>
          <p className="text-gray-500 text-base">Tell us how we can help.</p>
        </div>

        {/* Form card */}
        <div className="border border-gray-200 rounded-2xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Row 1 — Full Name + Company Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="John Smith"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2E3192] focus:ring-1 focus:ring-[#2E3192] transition-colors bg-white"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Acme Corp"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2E3192] focus:ring-1 focus:ring-[#2E3192] transition-colors bg-white"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="john@company.com"
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2E3192] focus:ring-1 focus:ring-[#2E3192] transition-colors bg-white"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="How can we help?"
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2E3192] focus:ring-1 focus:ring-[#2E3192] transition-colors bg-white"
              />
            </div>

            {/* Products dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Product <span className="text-red-500">*</span>
              </label>
              <select
                name="product"
                required
                defaultValue=""
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#2E3192] focus:ring-1 focus:ring-[#2E3192] transition-colors bg-white appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
              >
                <option value="" disabled>Select a product…</option>
                {PRODUCTS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={5}
                placeholder="Tell us more about your use case or question…"
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2E3192] focus:ring-1 focus:ring-[#2E3192] transition-colors bg-white resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#2E3192] hover:bg-[#252880] disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg transition-colors text-sm mt-1"
            >
              {submitting ? "Sending…" : "Submit"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
