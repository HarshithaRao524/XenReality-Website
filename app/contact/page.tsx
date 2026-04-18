import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with XenReality Technologies.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-16">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
