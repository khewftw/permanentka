import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Works from "@/components/Works";
import Master from "@/components/Master";
import Faq from "@/components/Faq";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import PromoBar from "@/components/PromoBar";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <PromoBar />
        <Hero />
        <Services />
        <Works />
        <Master />
        <Faq />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
