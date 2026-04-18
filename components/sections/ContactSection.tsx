"use client";

import { useState } from "react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Small delay to show loading state, then show success
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-black py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left */}
          <div className="flex items-center lg:w-80 shrink-0">
            <h2 className="text-4xl md:text-5xl font-light text-white leading-tight">
              Get in Touch
            </h2>
          </div>

          {/* Right — form */}
          <div className="flex-1">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F58220]/20 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F58220" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white text-xl font-semibold">Message sent!</p>
                <p className="text-gray-400 text-sm">We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-gray-300">
                      Full Name <span className="text-[#F58220]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      className="bg-black border border-gray-700 rounded-md px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#F58220] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-gray-300">
                      Company Name <span className="text-[#F58220]">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      className="bg-black border border-gray-700 rounded-md px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#F58220] transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-gray-300">
                    Email <span className="text-[#F58220]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="bg-black border border-gray-700 rounded-md px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#F58220] transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-gray-300">
                    Message <span className="text-[#F58220]">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="bg-black border border-gray-700 rounded-md px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#F58220] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#F58220] hover:bg-[#d96e10] disabled:opacity-60 text-white font-semibold py-4 rounded-md transition-colors text-base"
                >
                  {submitting ? "Sending…" : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
