import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import PlatformDiagram from "@/components/sections/PlatformDiagram";
import ProductsShowcase from "@/components/sections/ProductsShowcase";
import FeatureSpotlight from "@/components/sections/FeatureSpotlight";
import SocialProof from "@/components/sections/SocialProof";
import VideoDemo from "@/components/sections/VideoDemo";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PlatformDiagram />
        <ProductsShowcase />
        <FeatureSpotlight />
        <SocialProof />
        <VideoDemo />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
