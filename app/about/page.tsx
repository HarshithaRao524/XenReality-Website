import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about XenReality's mission to simplify Vision AI for businesses worldwide.",
};

const TEAM = [
  { name: "Zeba Khan",          title: "Founder, CEO"         },
  { name: "Shehzaman Khatib",   title: "Founder, CTO"         },
  { name: "Arjun Gurudev",      title: "Co-Founder, BDO"      },
  { name: "Rishab Shivkumar",   title: "Head of Product"      },
  { name: "Netto Varghese",     title: "Head of Operations"   },
  { name: "Shashank P",         title: "Software Engineer"    },
  { name: "Navneet Kanna",      title: "Senior ML Engineer"   },
  { name: "Vrushabhnath K",     title: "Software Engineer"    },
];

const ADVISORS = [
  {
    name:    "Mustafa Wajid",
    title:   "Co-Founder & Chairman",
    company: "MD & CEO, MEHER Group",
  },
  {
    name:    "Tejas Goenka",
    title:   "Advisor & Angel Investor",
    company: "MD, TALLY Solutions",
  },
  {
    name:    "Prabhu Rajagopal",
    title:   "Advisor",
    company: "Professor, IIT Madras",
  },
];

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section
          className="flex items-center -mt-16"
          style={{
            background: "linear-gradient(120deg, #010101 49%, #1b2a36 100%)",
            minHeight: "calc(100vh + 120px)",
          }}
        >
          <div className="max-w-7xl mx-auto w-full px-8 lg:px-16 pt-52 pb-24">
            <p className="text-xs font-semibold text-white uppercase tracking-[0.18em] mb-6">
              Company
            </p>
            <h1
              className="text-[36px] lg:text-[48px] xl:text-[56px] font-medium text-white mb-4"
              style={{ letterSpacing: "-0.02rem", lineHeight: "104%" }}
            >
              About XenReality.
            </h1>
            <p
              className="font-normal max-w-xl text-[16px] md:text-[18px]"
              style={{ color: "#ccc", letterSpacing: "-0.08px", lineHeight: "150%", marginTop: "16px" }}
            >
              We strive to simplify Vision AI, making it universally accessible and transformative across industries.
            </p>
          </div>
        </section>

        {/* ── Vision ── */}
        <section className="rounded-t-[2.5rem] relative z-10 -mt-10 bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_2fr] gap-16 items-start">
            <div>
              <p className="text-xs font-semibold text-[#2E3192] uppercase tracking-widest mb-3">
                Our Vision
              </p>
              <h2
                className="text-[28px] md:text-[34px] font-medium text-gray-900"
                style={{ letterSpacing: "-0.02rem", lineHeight: "115%" }}
              >
                Simplifying Vision AI for the world.
              </h2>
            </div>
            <div className="flex flex-col gap-5 text-gray-600 text-base leading-relaxed">
              <p>
                At XenReality, our vision is to offer sector-agnostic plug-and-play Visual Models and Deep Learning Neural Network solutions globally.
              </p>
              <p>
                We aim to simplify Vision AI solutions for businesses, starting with the manufacturing sector and ultimately offering sector-agnostic plug-and-play Vision Models &amp; Deep Learning Neural Network solutions.
              </p>
              <p>
                Unlike the commercial vision AI models available in the market, we aim to offer smaller and more precise visual models which are faster, cost-effective and more accurate for each specific use-case that we target.
              </p>
            </div>
          </div>
        </section>

        {/* ── Core Team ── */}
        <section className="bg-gray-50 py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-semibold text-[#2E3192] uppercase tracking-widest mb-3">
                Core Team
              </p>
              <h2
                className="text-[28px] md:text-[36px] font-medium text-gray-900 mb-3"
                style={{ letterSpacing: "-0.02rem", lineHeight: "115%" }}
              >
                The people behind XenReality
              </h2>
              <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
                Our diverse team brings together experts in AI, engineering and business innovation, driven by a shared passion to democratise Vision AI technology for businesses worldwide.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col items-center text-center gap-4"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg shrink-0"
                    style={{ background: "linear-gradient(135deg, #2E3192, #00AEEF)" }}
                  >
                    {initials(member.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{member.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Advisors ── */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-semibold text-[#2E3192] uppercase tracking-widest mb-3">
                Advisors
              </p>
              <h2
                className="text-[28px] md:text-[36px] font-medium text-gray-900 mb-3"
                style={{ letterSpacing: "-0.02rem", lineHeight: "115%" }}
              >
                Guided by experience
              </h2>
              <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
                We are guided by a distinguished group of advisors who bring deep expertise across enterprise technology, manufacturing, AI, engineering and business strategy.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {ADVISORS.map((advisor) => (
                <div
                  key={advisor.name}
                  className="rounded-2xl border border-gray-100 p-8 flex flex-col gap-4"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
                    style={{ background: "linear-gradient(135deg, #2E3192, #00AEEF)" }}
                  >
                    {initials(advisor.name)}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-900">{advisor.name}</p>
                    <p className="text-sm text-[#2E3192] font-medium mt-0.5">{advisor.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{advisor.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="rounded-t-[2.5rem] relative z-10 -mt-10 bg-[#0d0f1a] py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-semibold text-[#00AEEF] uppercase tracking-widest mb-4">
              Get in touch
            </p>
            <h2 className="text-[36px] font-medium text-white leading-[1.1] mb-5">
              Want to work with us?
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-10">
              Whether you&apos;re looking to deploy Vision AI or join our team, we&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#2E3192] hover:bg-[#252880] text-white font-semibold text-sm px-10 py-4 rounded-full transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center justify-center border border-white/20 hover:border-white/40 text-white font-semibold text-sm px-10 py-4 rounded-full transition-colors"
              >
                View Open Roles
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
