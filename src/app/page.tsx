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

// Déplacer l'interface Feature ici
interface Feature {
  title: string;
  desc: React.ReactNode;
  icon: string;
  color: string;
}

// Déplacer les features ici
const FEATURES: Feature[] = [
  {
    title: "Explorer en 3D",
    desc: "Vous pourrez explorer vos biens en 3D grâce à des maquettes numériques interactives. Vivez une expérience digitale ludique et inédite pour repenser et réimaginer chaque espace de manière innovante.",
    icon: "⬡",
    color: "from-green-400 to-violet-500"
  },
  {
    title: "Gérer vos Jumeaux Numériques",
    desc: (
      <>
        Vous pourrez exploiter des informations détaillées et conformes aux normes pour visualiser, concevoir et valoriser vos projets immobiliers grâce à la{' '}
        <span className="text-green-500 font-medium">Tokenisation</span>.
      </>
    ),
    icon: "⬢",
    color: "from-violet-500 to-green-400"
  },
  {
    title: "Collaborer dans notre Écosystème",
    desc: (
      <>
        Vous pourrez vous connecter à une plateforme riche en outils, services et expertises. Accédez à un réseau qui enrichit chacun de vos projets du concept à la réalisation grâce aux{' '}
        <span className="text-green-500 font-medium">Smart Contracts</span>.
      </>
    ),
    icon: "⬣",
    color: "from-violet-500 to-green-400"
  }
];

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
                    Préparez vous à découvrir prochainement MyIKKI et notre projet de création de la première plateforme.
                    MyIKKI arrive bientôt pour révolutionner l'expérience immobilière. Inscrivez-vous dès maintenant pour
                    être parmi les premiers à découvrir notre plateforme immersive de jumeaux numériques.
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