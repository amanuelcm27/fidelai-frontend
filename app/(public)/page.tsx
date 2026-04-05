import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Roles } from "@/components/landing/roles";
import { AIPipeline } from "@/components/landing/ai-pipeline";
import { Marketplace } from "@/components/landing/marketplace";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export const metadata = {
  title: "FidelAI — AI Data Marketplace for Amharic Language",
  description:
    "Collect, annotate, validate, and sell high-quality Amharic datasets using AI-powered workflows and crowdsourcing.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Roles />
      <AIPipeline />
      <Marketplace />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
