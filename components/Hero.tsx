'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
  };

  return (
    <section className="relative min-h-screen bg-frost-gradient overflow-hidden">
      {/* Floating abstract shapes */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-64 h-64 bg-ice-300 rounded-full blur-3xl opacity-30"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-ice-200 rounded-full blur-3xl opacity-20"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-dark leading-tight">
              Intelligent Cloud Migration Cost Optimization
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              AI-powered Azure & GCP to AWS cost comparison with real-time pricing and savings insights.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-ice-gradient text-white rounded-full font-semibold hover-glow text-center"
              >
                Get Started
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 bg-white border-2 border-ice-400 text-ice-600 rounded-full font-semibold hover:bg-ice-50 transition-all text-center"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={containerVariants} className="pt-8 flex flex-wrap gap-8">
              <motion.div variants={itemVariants}>
                <div className="text-4xl font-bold text-savings-green">60%</div>
                <div className="text-sm text-gray-600">Cost Savings</div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <div className="text-4xl font-bold text-ice-500">AI+SQL</div>
                <div className="text-sm text-gray-600">Smart Mapping</div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <div className="text-4xl font-bold text-ice-600">Real-Time</div>
                <div className="text-sm text-gray-600">AWS Pricing</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative lg:block hidden"
          >
            <div className="relative z-10">
              <Image
                src="/hero-image.svg"
                alt="Cloud Migration Dashboard"
                width={600}
                height={600}
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
