"use client";

import { motion } from "framer-motion";

export function PageHero({
  title,
  subtitle,
  gradient = "pink",
}: {
  title: string;
  subtitle?: string;
  gradient?: "pink" | "cyan" | "mixed";
}) {
  const gradients = {
    pink: "from-nidc-pink/20 via-transparent to-transparent",
    cyan: "from-nidc-cyan/20 via-transparent to-transparent",
    mixed: "from-nidc-pink/20 via-nidc-cyan/10 to-transparent",
  };

  return (
    <section
      className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden"
      aria-labelledby="page-hero-title"
    >
      {/* Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${gradients[gradient]}`}
        aria-hidden="true"
      />
      <div className="absolute inset-0 mesh-gradient opacity-50" aria-hidden="true" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-nidc-pink/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-nidc-cyan/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          id="page-hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black gradient-text mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
