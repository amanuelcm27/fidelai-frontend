"use client";

import { motion } from 'framer-motion';

export function CTASection() {
  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto rounded-2xl bg-gradient-to-r from-primary to-primary/70 p-12 text-center text-primary-foreground"
      >
        <h2 className="text-3xl font-bold md:text-4xl">
          Ready to Build Amharic AI Datasets?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-primary-foreground/80">
          Join thousands of contributors, annotators, and researchers on the platform.
        </p>
        <div className="mt-8">
          <a
            href="/register"
            className="rounded-lg bg-background px-8 py-3 font-medium text-foreground shadow hover:bg-background/90 transition-colors"
          >
            Start Contributing
          </a>
        </div>
      </motion.div>
    </section>
  );
}
