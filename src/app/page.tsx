/* eslint-disable react/no-unescaped-entities */
'use client';

import { SignupForm } from '@/app/components/SignupForm';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BackgroundBeams } from './components/background-beams';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      <BackgroundBeams className="absolute inset-0" />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-16"
          >
            <Image
              src="/images/logo/logo.png"
              alt="MyIki Logo"
              width={150}
              height={150}
              className="drop-shadow-[0_0_30px_rgba(0,255,163,0.3)]"
            />
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF] leading-tight mb-6">
                Révolutionnez l'investissement immobilier
              </h1>
              <p className="text-xl text-white/60 max-w-xl mx-auto lg:mx-0">
                Participez aux projets de rénovation les plus prometteurs
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 max-w-xl mx-auto lg:mx-0">
                {[
                  { value: '500+', label: 'Investisseurs' },
                  { value: '3', label: 'Projets' },
                  { value: '100€', label: 'Minimum' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SignupForm />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}