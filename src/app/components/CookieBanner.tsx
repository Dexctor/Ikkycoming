'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import Link from 'next/link';
import { COLORS } from '@/app/constants/theme';

const bannerVariants = {
  hidden: { 
    opacity: 0, 
    y: 100,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  },
  exit: { 
    opacity: 0,
    y: 50,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const buttonVariants = {
  initial: { 
    scale: 1
  },
  tap: { 
    scale: 0.97,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15
    }
  }
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState<boolean | null>(null);

  useEffect(() => {
    // On vérifie le consentement au montage du composant
    checkCookieConsent();
  }, []);

  const checkCookieConsent = () => {
    try {
      const consent = localStorage.getItem('cookie-consent');
      setShowBanner(consent === null);
    } catch (error) {
      // En cas d'erreur avec localStorage (ex: navigation privée)
      setShowBanner(true);
    }
  };

  const handleCookieConsent = (accepted: boolean) => {
    try {
      localStorage.setItem('cookie-consent', accepted ? 'accepted' : 'refused');
      // Si accepté, on initialise Google Analytics
      if (accepted && typeof window !== 'undefined') {
        // @ts-ignore
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
      }
      setShowBanner(false);
    } catch (error) {
      console.error('Error setting cookie consent:', error);
    }
  };

  // Ne rien afficher pendant la vérification initiale
  if (showBanner === null) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-0 sm:bottom-6 left-0 sm:left-1/2 w-full sm:-translate-x-1/2 
            z-50 sm:w-[95%] sm:max-w-3xl
            p-4 sm:p-6 sm:rounded-2xl shadow-2xl shadow-black/25
            bg-gradient-to-br from-zinc-900/95 via-zinc-800/95 to-zinc-900/95
            backdrop-blur-xl border-t sm:border sm:border-white/10"
        >
          <motion.div 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center justify-between gap-4 sm:gap-6
              max-w-3xl mx-auto"
          >
            <div className="text-sm text-white/90 space-y-2 w-full">
              <motion.h3 
                className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.3 }
                }}
              >
                🍪 Cookies & Confidentialité
              </motion.h3>
              <motion.p 
                className="text-sm leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.4 }
                }}
              >
                Nous utilisons des cookies pour améliorer votre expérience. 
                En continuant à utiliser notre site, vous acceptez notre{' '}
                <Link 
                  href="/politique-confidentialite" 
                  className="text-green-400 hover:text-green-300 underline
                    transition-colors duration-200"
                >
                  politique de confidentialité
                </Link>.
              </motion.p>
            </div>
            <div className="flex flex-row gap-3 w-full sm:w-auto">
              <motion.button
                variants={buttonVariants}
                whileTap="tap"
                className="flex-1 sm:flex-initial"
              >
                <Button
                  onClick={() => handleCookieConsent(false)}
                  variant="secondary"
                  className="w-full text-sm h-11 sm:h-10 px-4 sm:px-6
                    border border-white/10 hover:bg-red-500/10
                    transition-colors duration-300"
                >
                  Refuser
                </Button>
              </motion.button>
              <motion.button
                variants={buttonVariants}
                whileTap="tap"
                className="flex-1 sm:flex-initial"
              >
                <Button
                  onClick={() => handleCookieConsent(true)}
                  className="w-full text-sm h-11 sm:h-10 px-4 sm:px-6
                    bg-gradient-to-r from-green-400 to-violet-500
                    hover:from-green-500 hover:to-violet-600
                    transition-colors duration-300
                    shadow-lg shadow-violet-500/20"
                >
                  Accepter
                </Button>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Ajoutez ces styles dans votre fichier CSS global
// @keyframes pulse-subtle {
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0.95; }
// }
// .animate-pulse-subtle {
//   animation: pulse-subtle 3s ease-in-out infinite;
// } 