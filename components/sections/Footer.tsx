import Link from "next/link";
import XenRealityLogo from "@/components/ui/XenRealityLogo";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

        {/* Left — brand + info */}
        <div className="flex flex-col gap-3">
          {/* Logo */}
          <Link href="/" className="mb-1">
            <XenRealityLogo onDark={true} />
          </Link>

          <p className="text-gray-400 text-sm">Headquartered in Bangalore, India.</p>
          <p className="text-gray-400 text-sm">
            Reach out to us at{" "}
            <a href="mailto:hello@xenreality.com" className="text-white hover:underline">
              hello@xenreality.com
            </a>
          </p>
          <p className="text-gray-500 text-xs mt-1">
            © 2025 by XenReality Technologies Private Limited
          </p>
        </div>

        {/* Right — social */}
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm font-medium">Follow Us On:</span>
          <a
            href="https://www.linkedin.com/company/xenreality"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full bg-[#0077b5] hover:opacity-90 flex items-center justify-center transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
        </div>

      </div>
    </footer>
  );
}
