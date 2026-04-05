"use client";

import { motion } from 'framer-motion';
import { Upload, Bot, CheckCircle, ShoppingBag } from 'lucide-react';

const features = [
  {
    icon: <Upload className="h-8 w-8" />,
    title: 'Upload & Contribute',
    description: 'Upload Amharic documents for AI processing and dataset creation.',
  },
  {
    icon: <Bot className="h-8 w-8" />,
    title: 'AI Processing',
    description: 'Automatic text extraction, chunking, and quality scoring powered by AI.',
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    title: 'Annotate & Validate',
    description: 'Distributed annotation with multi-level quality control and expert adjudication.',
  },
  {
    icon: <ShoppingBag className="h-8 w-8" />,
    title: 'Marketplace',
    description: 'Browse, purchase, and download production-ready Amharic datasets.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Platform Features</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          End-to-end data pipeline from collection to marketplace.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-xl border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-primary">{feature.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
