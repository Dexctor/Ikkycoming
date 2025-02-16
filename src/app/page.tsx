/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { COLORS } from '@/app/constants/theme';
import { ANIMATIONS } from '@/app/constants/animations';
import { useInitialLoading } from '@/hooks/useInitialLoading';
import { AnimatedLogo } from '@/app/components/AnimatedLogo';
import { Features } from '@/app/components/Features';
import { SocialButtons } from '@/app/components/SocialButtons';
import { LoadingScreen } from '@/app/components/LoadingScreen';
import { LaunchAnnouncement } from '@/app/components/LaunchAnnouncement';
import { GradientBackground } from '@/app/components/GradientBackground';

const SignupForm = dynamic(
  () => import('@/app/components/SignupForm').then(mod => mod.SignupForm),
  {
    loading: () => <div className="animate-pulse h-96 bg-white/5 rounded-xl" />,
    ssr: false
  }
);

const Footer = dynamic(
  () => import('@/app/components/Footer').then(mod => mod.Footer),
  {
    ssr: false,
    loading: () => null
  }
);

export default function Home() {
  const { isLoading, isMounted } = useInitialLoading();

  if (!isMounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="min-h-screen relative overflow-hidden bg-black">
            <div className="absolute inset-0" />
            
            <motion.div 
              className="relative"
              variants={ANIMATIONS.container}
              initial="hidden"
              animate="visible"
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-20">
                <AnimatedLogo />

                <motion.div variants={ANIMATIONS.item} className="text-center mb-12 sm:mb-16 relative">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold 
                    bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-violet-500
                    leading-tight mb-4 sm:mb-6 [text-wrap:balance] [content-visibility:auto]">
                    L'Immobilier Réinventé par les Jumeaux Numériques
                  </h1>
                  <p className="text-base sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                    Préparez-vous à découvrir prochainement MyIKKI et notre projet de création de la première plateforme immersive qui révolutionne l'expérience immobilière. <br />Inscrivez-vous dès maintenant pour
                    être parmi les premiers à découvrir notre plateforme immersive de jumeaux numériques. <br /> <br /> 
                    <span className="block text-2xl sm:text-3xl font-bold py-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-400 to-violet-600">
                      Explorez, sublimez et transformez vos espaces de vie et de travail en révélant tout leur potentiel.
                    </span>
                  </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-start">
                  <Features />
                  <motion.div variants={ANIMATIONS.item} className="relative">
                    <GradientBackground />
                    <SignupForm />
                    <SocialButtons />
                  </motion.div>
                </div>

                <LaunchAnnouncement />
              </div>
            </motion.div>

            <Footer />
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}