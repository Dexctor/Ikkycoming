/* eslint-disable react/no-unescaped-entities */
'use client';

import { SignupForm } from '@/app/components/SignupForm';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { BackgroundBeams } from './components/background-beams';
import { LoadingScreen } from './components/loading-screen';
import { useState, useEffect, useMemo } from 'react';
import { FaDiscord, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

// Extraction des constantes d'animation
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
        ease: "easeOut",
        duration: 0.6,
      },
    },
  },
  item: {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
  },
  featureIcon: (index: number) => ({
    opacity: [0.6, 1, 0.6],
    scale: [1, 1.02, 1],
    rotate: [0, 1, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: [0.4, 0, 0.2, 1],
      delay: index * 0.1,
    }
  })
} as const;

// Composant pour le logo animé
const AnimatedLogo = () => (
  <motion.div
    variants={ANIMATIONS.item}
    className="relative flex justify-center mb-8 sm:mb-12"
  >
    <motion.div 
      className="relative cursor-pointer"
      animate={{
        y: [-2, 2, -2],
        rotate: [-0.5, 0.5, -0.5]
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror"
        },
        rotate: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror"
        }
      }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
      whileTap={{ 
        scale: 0.98,
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 17
        }
      }}
    >
      <Image
        src="/images/logo/logo.avif"
        alt="MyIKKI Logo"
        width={120}
        height={120}
        priority
        className="drop-shadow-[0_0_25px_rgba(245,158,11,0.25)] relative z-10 transition-all duration-300"
      />
    </motion.div>
  </motion.div>
);

// Composant pour les features
const Feature = ({ title, desc, icon, color, index }: {
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
);

// Composant pour les boutons sociaux
const SocialButtons = () => {
  const socialLinks = useMemo(() => [
    { Icon: FaTwitter, href: "https://x.com/MyIkki_Network", color: "text-[#1DA1F2]" },
    { Icon: FaLinkedin, href: "https://www.linkedin.com/company/myikki/", color: "text-[#0077B5]" },
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
            hover:scale-110 hover:shadow-lg 
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
    color: "from-amber-400 to-amber-300/70"
  },
  {
    title: "Des Jumeaux Numériques Certifiés",
    desc: <>Exploitez des informations détaillées et conformes aux normes pour une visualisation, une conception précises et valoriser vos projets immobiliers grâce à la <span className="text-amber-400">Tokénisation</span>.</>,
    icon: "⬢",
    color: "from-orange-300 to-amber-400/70"
  },
  {
    title: "Un Écosystème intégré et collaboratif",
    desc: <>Connectez-vous à une plateforme riche en outils, services et expertises pour donner vie à vos ambitions. Accédez à un réseau qui enrichi chacun de vos projets du concept à la réalisation grâce aux <span className="text-amber-400">Smart Contracts</span>.</>,
    icon: "⬣",
    color: "from-orange-300 to-orange-200/70"
  }
] as const;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.main
          key="main"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="min-h-screen relative overflow-hidden bg-black">
            <BackgroundBeams className="absolute inset-0" />
            
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
                    bg-clip-text text-transparent bg-gradient-to-r from-amber-400 
                    to-orange-300 leading-tight mb-4 sm:mb-6">
                    L'Immobilier Réinventé par les Jumeaux Numériques
                  </h1>
                  <p className="text-base sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                    Découvrez MyIKKI, la première plateforme immersive qui révolutionne l'expérience immobilière. Grâce à nos jumeaux numériques, explorez, sublimez et transformez vos espaces de vie et de travail en révélant tout leur potentiel.
                  </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-start">
                  <motion.div variants={ANIMATIONS.item}>
                    <div className="text-center lg:text-left space-y-12">
                      <div className="space-y-8">
                        {FEATURES.map((feature, index) => (
                          <Feature key={feature.title} {...feature} index={index} />
                        ))}
                      </div>

                      <motion.div
                        className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 
                          border border-white/5 hover:border-amber-400/10"
                        whileHover={{
                          scale: 1.01,
                          boxShadow: "0 0 30px rgba(245,158,11,0.05)",
                          borderColor: "rgba(245,158,11,0.1)",
                        }}
                      >
                        <h3 className="text-amber-400 font-semibold text-xl mb-3">EARLY ACCESS</h3>
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
                          'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.08) 0%, transparent 70%)',
                          'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.08) 0%, transparent 70%)',
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
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}