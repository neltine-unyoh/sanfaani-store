import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import ShopCategories from "@/components/home/ShopCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import DeviceGuidance from "@/components/home/DeviceGuidance";
import RepairSection from "@/components/home/RepairSection";
import TrustSection from "@/components/home/TrustSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <ShopCategories />
        <FeaturedProducts />
        <DeviceGuidance />
        <RepairSection />
        <TrustSection />
      </main>

      <Footer />
    </>
  );
}