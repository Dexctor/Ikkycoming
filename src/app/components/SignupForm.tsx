/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useRef } from 'react';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { isValidEmail } from '../../utils/validation';
import { COLORS } from '@/app/constants/theme';
import Link from 'next/link';

type UserType = 'community';
type ToastType = 'success' | 'error';

interface Toast {
  type: ToastType;
  message: string;
}

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [userType] = useState<UserType>('community');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef as React.RefObject<Element>, {});
  const [acceptPolicy, setAcceptPolicy] = useState(false);

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000); // Disparaît après 5 secondes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptPolicy) {
      showToast('error', "Veuillez accepter la politique de confidentialité.");
      return;
    }

    if (!isValidEmail(email.trim())) {
      showToast('error', "Veuillez entrer une adresse email valide.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), type: userType }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast('success', 'Bienvenue dans la communauté !');
        setEmail('');
      } else if (response.status === 429) {
        showToast('error', "Trop de tentatives. Veuillez réessayer plus tard.");
      } else {
        showToast('error', data.error || "Erreur lors de l'inscription. Réessayez plus tard.");
      }
    } catch (error) {
      showToast('error', "Impossible de soumettre le formulaire.");
    }

    setLoading(false);
  };

  return (
    <div
      ref={formRef}
      className="relative"
    >
      <div className="relative">
        <form 
          onSubmit={handleSubmit} 
          className="glass rounded-2xl p-4 md:p-6 space-y-4 md:space-y-5 
            border border-transparent 
            bg-gradient-to-br from-zinc-900/60 via-zinc-800/40 to-zinc-900/30 
            backdrop-blur-xl shadow-2xl 
            hover:border-green-400/20 transition-all duration-300 
            ring-1 ring-white/5 hover:ring-green-400/10"
        >
          <div className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className={`w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base 
                bg-zinc-800/30 rounded-lg text-white placeholder-zinc-500 
                ${COLORS.glass.border}
                focus:outline-none ${COLORS.primary.border} focus:ring-2 
                focus:ring-green-400/20 transition-all duration-200
                hover:bg-zinc-800/40`}
              required
            />
            <input
              type="text"
              name="honeypot"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex items-start space-x-2 mt-4">
            <input
              type="checkbox"
              id="privacy-policy"
              checked={acceptPolicy}
              onChange={(e) => setAcceptPolicy(e.target.checked)}
              className="mt-1"
            />
            <label 
              htmlFor="privacy-policy" 
              className="text-sm text-white/70"
            >
              J'accepte la{' '}
              <Link 
                href="/politique-confidentialite"
                className="text-green-400 hover:text-green-300 underline"
              >
                politique de confidentialité
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-green-400 to-violet-500 
              text-white font-semibold 
              shadow-xl shadow-green-500/20
              transition-all duration-300 
              hover:shadow-xl hover:shadow-green-400/30
              hover:scale-[1.02]
              disabled:opacity-50 disabled:cursor-not-allowed
              disabled:hover:scale-100"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <motion.span
                  className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="ml-2">Envoi...</span>
              </span>
            ) : 'Rejoindre la communauté'}
          </Button>

          <p className="text-xs text-center text-gray-500 hover:text-green-400/80 transition-colors">
            Suivez l'évolution • Donnez votre avis • Gratuit
          </p>

          <AnimatePresence>
            {submitted && (
              <div
                className="bg-gradient-to-r from-green-400/5 to-violet-500/5 
                  backdrop-blur-sm rounded-lg border border-green-400/10"
              >
                <div className="text-center p-6">
                  <span 
                    className="text-3xl mb-4 block"
                  >
                    🎉
                  </span>
                  <p className="text-white/90 font-medium bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text">
                    Bienvenue dans la communauté !
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '100%' }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: '100%' }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg 
              backdrop-blur-md border z-50 max-w-md
              ${toast.type === 'success' 
                ? 'bg-gradient-to-r from-green-400/10 to-violet-500/10 border-green-400/20 text-green-400'
                : 'bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-500/20 text-red-400'
              }`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-xl">
                {toast.type === 'success' ? '🎉' : '⚠️'}
              </span>
              <p className="font-medium">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
