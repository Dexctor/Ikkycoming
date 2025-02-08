/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import React from 'react';
import { COLORS } from '@/app/constants/theme';

// Remplacer le debounce de lodash par une version plus légère
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Optimiser le chargement des composants dynamiques
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

// Simplifier les animations pour améliorer les performances
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  },
  item: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    }
  }
} as const;

// Optimiser le chargement des images
const AnimatedLogo = () => (
  <motion.div variants={ANIMATIONS.item} className="relative flex justify-center mb-8">
    <Image
      src="/images/logo/logo.avif"
      alt="MyIKKI Logo"
      width={120}
      height={120}
      priority
      className="drop-shadow-[0_0_25px_rgba(74,240,160,0.25)]"
      loading="eager"
      fetchPriority="high"
    />
  </motion.div>
);

// Composant pour les features
const Feature = React.memo(({ title, desc, icon, color, index }: {
  title: string;
  desc: React.ReactNode;
  icon: string;
  color: string;
  index: number;
}) => (
  <motion.div
    className="flex items-start space-x-4"
    variants={{
      hidden: { opacity: 0, x: -10 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.4,
          delay: 0.1 + index * 0.1,
          ease: [0.25, 0.1, 0.25, 1],
        }
      }
    }}
  >
    <motion.span
      className={`text-2xl bg-clip-text text-transparent bg-gradient-to-r ${color}`}
      variants={{
        hidden: { opacity: 0, scale: 0.5, rotate: -180 },
        animate: { 
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }
      }}
      animate="animate"
      initial="hidden"
    >
      {icon}
    </motion.span>
    <div className="flex-1">
      <h3 className="text-white font-medium text-xl mb-2">{title}</h3>
      <p className="text-white/70 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
));

// Composant pour les boutons sociaux
const SocialButtons = () => {
  const socialLinks = useMemo(() => [
    { Icon: FaTwitter, href: "https://x.com/MyIkki_Network", color: "hover:text-green-400" },
    { Icon: FaLinkedin, href: "https://www.linkedin.com/company/myikki/", color: "hover:text-violet-500" },
  ], []);

  return (
    <motion.div 
      className="flex justify-center space-x-4 mt-8"
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
    >
      {socialLinks.map(({ Icon, href, color }) => (
        <motion.a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            p-3 rounded-full transition-all duration-300 
            hover:scale-110 hover:shadow-lg text-white/70
            ${color} bg-white/10 backdrop-blur-sm
          `}
          variants={ANIMATIONS.item}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon className="w-6 h-6" />
        </motion.a>
      ))}
    </motion.div>
  );
};

// Features data
const FEATURES = [
  {
    title: "Une Immersion 3D Totale",
    desc: "Plongez au cœur de vos biens grâce à des maquettes numériques interactives. Vivez une expérience digitale ludique inédite qui vous permet de repenser et réimaginer chaque espace de manière innovante.",
    icon: "⬡",
    color: "from-green-400 to-violet-500"
  },
  {
    title: "Des Jumeaux Numériques Certifiés",
    desc: <>Exploitez des informations détaillées et conformes aux normes pour une visualisation, une conception précises et valoriser vos projets immobiliers grâce à la <span className="text-green-400">Tokénisation</span>.</>,
    icon: "⬢",
    color: "from-violet-500 to-green-400"
  },
  {
    title: "Un Écosystème intégré et collaboratif",
    desc: <>Connectez-vous à une plateforme riche en outils, services et expertises pour donner vie à vos ambitions. Accédez à un réseau qui enrichi chacun de vos projets du concept à la réalisation grâce aux <span className="text-green-400">Smart Contracts</span>.</>,
    icon: "⬣",
    color: "from-violet-500 to-green-400"
  }
] as const;

// Lazy loading des images non critiques
const backgroundImage = {
  loading: 'lazy',
  decoding: 'async'
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Réduire le temps de chargement initial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Réduit de 800ms à 300ms

    if (document.readyState === 'complete') {
      setIsLoading(false);
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-black flex items-center justify-center"
        >
          <Image
            src="/images/logo/logo.avif"
            alt="MyIKKI Logo"
            width={80}
            height={80}
            priority
            className="animate-pulse drop-shadow-[0_0_15px_rgba(74,240,160,0.2)]"
          />
        </motion.div>
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
                  <h1 
                    className={`
                      text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold 
                      bg-clip-text text-transparent 
                      bg-gradient-to-r ${COLORS.primary.gradient}
                      leading-tight mb-4 sm:mb-6
                      [text-wrap:balance]
                      [content-visibility:auto]
                    `}
                  >
                    L'Immobilier Réinventé par les Jumeaux Numériques
                  </h1>
                  <p className="text-base sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                    Découvrez MyIKKI, la première plateforme immersive qui révolutionne l'expérience immobilière. Grâce à nos jumeaux numériques, explorez, sublimez et transformez vos espaces de vie et de travail en révélant tout leur potentiel.
                  </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-start">
                  <motion.div variants={ANIMATIONS.item}>
                    <div className="text-center lg:text-left space-y-12">
                      <div className={`glass rounded-xl p-4 md:p-6 space-y-8 border 
                        ${COLORS.glass.border} ${COLORS.primary.hover}
                        bg-gradient-to-br ${COLORS.glass.background} transition-colors`}>
                        {FEATURES.map((feature, index) => (
                          <Feature key={feature.title} {...feature} index={index} />
                        ))}
                      </div>

                      <motion.div
                        className={`glass rounded-xl p-4 md:p-6 
                          ${COLORS.glass.border} ${COLORS.primary.hover}
                          bg-gradient-to-br ${COLORS.glass.background}`}
                        whileHover={{
                          scale: 1.01,
                          boxShadow: "0 0 30px rgba(74,240,160,0.05)",
                          borderColor: "rgba(74,240,160,0.1)",
                        }}
                      >
                        <h3 className={`${COLORS.primary.text} font-semibold text-xl mb-3`}>EARLY ACCESS</h3>
                        <p className="text-white/70 leading-relaxed">
                          Rejoignez-nous dès aujourd'hui et saisissez l'opportunité d'être à la pointe de l'innovation immobilière. Inscrivez-vous dès maintenant pour accéder en avant-première à MyIKKI et découvrir comment nous pouvons transformer ensemble l'avenir de l'immobilier et de l'architecture.
                        </p>
                      </motion.div>

                      <motion.div variants={ANIMATIONS.item} className="text-sm text-white/40">
                        🚧 Propriété intellectuelle MyIKKI
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div variants={ANIMATIONS.item} className="relative">
                    <motion.div
                      className="absolute inset-0 -z-10"
                      animate={{
                        background: [
                          'radial-gradient(circle at 50% 50%, rgba(74,240,160,0.08) 0%, transparent 70%)',
                          'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)',
                        ],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.2, 1],
                        repeatType: "mirror",
                      }}
                    />
                    <SignupForm />
                    <SocialButtons />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <Footer />
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}