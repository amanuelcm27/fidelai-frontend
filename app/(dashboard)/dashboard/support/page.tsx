"use client";

import { Accordion } from "@/components/ui/accordion";
import { SupportForm } from "@/features/support/components/support-form";
import { mockFaqs } from "@/lib/mocks/dashboard";
import { BookOpen, LifeBuoy, Zap, Shield, Mail, FileText, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SupportPage() {
  const faqItems = mockFaqs.map((faq, i) => ({
    id: `faq-${i}`,
    title: faq.question,
    content: faq.answer,
  }));

  const docLinks = [
    { title: "Platform Guide", desc: "Introduction to FidelAI", icon: Zap },
    { title: "Dataset Quality", desc: "Understanding verification", icon: Shield },
    { title: "Earnings & Payments", desc: "How you get paid", icon: Mail },
    { title: "Expert Adjudication", desc: "Advanced QC workflows", icon: FileText },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-20"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">Find answers, learn more about the platform, or contact our team.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: FAQ & Documentation */}
        <div className="lg:col-span-2 space-y-12">
          <section className="bg-card rounded-2xl border p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8">
               <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                 <LifeBuoy size={20} />
               </div>
               <h3 className="text-xl font-bold">Frequently Asked Questions</h3>
             </div>
             
             <Accordion items={faqItems} className="max-w-3xl" />
          </section>

          <section className="space-y-6">
            <h3 className="text-lg font-bold px-1">Documentation & Guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {docLinks.map((link, i) => (
                <button
                  key={i}
                  className="flex items-center gap-4 p-5 rounded-2xl border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all group text-left"
                >
                  <div className="p-3 rounded-xl bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <link.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-sm tracking-tight">{link.title}</h5>
                    <p className="text-xs text-muted-foreground opacity-70">{link.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Contact Form & Resources */}
        <div className="space-y-8">
          <SupportForm />

          <div className="p-8 rounded-2xl border bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
            <div className="p-2.5 rounded-xl bg-primary text-white w-fit mb-4">
              <BookOpen size={20} />
            </div>
            <h4 className="font-bold text-lg mb-2 leading-tight tracking-tight">Technical Documentation</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
              Looking for API documentation or complex integration guides? Visit our technical resources center for more details.
            </p>
            <button className="text-xs font-black uppercase tracking-widest text-primary hover:underline underline-offset-4">
              Visit Resource Center &rarr;
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
