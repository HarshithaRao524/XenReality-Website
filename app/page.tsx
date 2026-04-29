import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import WhatIsVisionAI from "@/components/sections/WhatIsVisionAI";
import PlatformDiagram from "@/components/sections/PlatformDiagram";
import ProductsShowcase from "@/components/sections/ProductsShowcase";
import WhyXenReality from "@/components/sections/WhyXenReality";
import ReadyToBusiness from "@/components/sections/ReadyToBusiness";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatIsVisionAI />
        <PlatformDiagram />
        <ProductsShowcase />
        <WhyXenReality />
        <ReadyToBusiness />
      </main>
      <Footer />
    </>
  );
}
