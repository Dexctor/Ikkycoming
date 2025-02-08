'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import Link from 'next/link';
import { COLORS } from '@/app/constants/theme';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà accepté les cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const refuseCookies = () => {
    localStorage.setItem('cookie-consent', 'refused');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-0 left-0 right-0 z-50 p-4 
            bg-gradient-to-r from-zinc-900/95 to-zinc-800/95 
            backdrop-blur-xl border-t ${COLORS.glass.border}`}
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-white/80">
              <p>
                Nous utilisons des cookies pour améliorer votre expérience. 
                En continuant à utiliser notre site, vous acceptez notre{' '}
                <Link 
                  href="/politique-confidentialite" 
                  className="text-green-400 hover:text-green-300 underline"
                >
                  politique de confidentialité
                </Link>.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={refuseCookies}
                variant="secondary"
                className="text-sm hover:bg-red-500/10"
              >
                Refuser
              </Button>
              <Button
                onClick={acceptCookies}
                className="text-sm bg-gradient-to-r from-green-400 to-violet-500"
              >
                Accepter
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 