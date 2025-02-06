/* eslint-disable react/no-unescaped-entities */
'use client';

import { SignupForm } from '@/app/components/SignupForm';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { BackgroundBeams } from './components/background-beams';
import { LoadingScreen } from './components/loading-screen';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="min-h-screen relative overflow-hidden bg-black">
              <BackgroundBeams className="absolute inset-0" />
              
              <div className="relative">
                <div className="max-w-6xl mx-auto px-6 pt-12 pb-20">
                  {/* Logo */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-center mb-12">
                      <Image
                        src="/images/logo/logo.png"
                        alt="MyIKKI Logo"
                        width={120}
                        height={120}
                        className="drop-shadow-[0_0_30px_rgba(0,255,163,0.3)]"
                      />
                    </div>
                  </motion.div>

                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="text-center lg:text-left space-y-10">
                        {/* Hero Section */}
                        <div className="space-y-6">
                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF] leading-tight">
                            L'immobilier rencontre le Web3
                          </h1>
                          <p className="text-2xl text-white/80 font-light">
                            Première plateforme de gestion immobilière basée sur les jumeaux numériques
                          </p>
                        </div>

                        {/* Key Features */}
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <span className="text-[#00FFA3] text-xl">⬢</span>
                            <p className="text-white/70 text-lg">
                              <span className="text-white font-medium">Jumeaux Numériques</span> — 
                              Visualisez et gérez vos biens en temps réel
                            </p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <span className="text-[#00FFA3] text-xl">⬢</span>
                            <p className="text-white/70 text-lg">
                              <span className="text-white font-medium">Smart Contracts</span> — 
                              Automatisez et sécurisez vos transactions
                            </p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <span className="text-[#00FFA3] text-xl">⬢</span>
                            <p className="text-white/70 text-lg">
                              <span className="text-white font-medium">Tokenisation</span> — 
                              Accédez à de nouvelles opportunités d'investissement
                            </p>
                          </div>
                        </div>

                        {/* Launch Info */}
                        <div className="inline-block bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                          <p className="text-white/80">
                            <span className="text-[#00FFA3] font-semibold">Early Access</span> — 
                            Rejoignez la whitelist pour un accès prioritaire et des avantages exclusifs
                          </p>
                        </div>

                        <div className="text-sm text-white/40">
                          🚧 Propriété intellectuelle MyIKKI
                        </div>
                      </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div>
                        <SignupForm />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}