/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useRef } from 'react';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { isValidEmail } from '../../utils/validation';

type UserType = 'community' | 'investor';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType>('investor');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef as React.RefObject<Element>, {});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email format
    if (!isValidEmail(email.trim())) {
      setErrorMessage("Veuillez entrer une adresse email valide.");
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/signup', {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email.trim(), 
          type: userType 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
      } else if (response.status === 429) {
        setErrorMessage("Trop de tentatives. Veuillez réessayer plus tard.");
      } else {
        setErrorMessage(data.error || "Erreur lors de l'inscription. Réessayez plus tard.");
      }
    } catch (error) {
      setErrorMessage("Impossible de soumettre le formulaire.");
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
          className="glass rounded-xl p-4 md:p-6 space-y-3 md:space-y-4 border border-amber-400/10 
            hover:border-amber-400/20 bg-gradient-to-br from-black/40 to-black/20 transition-colors"
        >
          <div className="flex flex-col sm:flex-row gap-2 p-1 bg-gradient-to-r from-amber-500/5 
            to-orange-400/5 rounded-lg">
            <button
              type="button"
              onClick={() => setUserType('investor')}
              className={`flex-1 px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium 
                transition-all ${
                userType === 'investor'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-300 text-white/90 shadow-lg shadow-amber-500/10'
                  : 'text-white/80 hover:bg-white/5'
              }`}
            >
              Futur Investisseur
            </button>
            <button
              type="button"
              onClick={() => setUserType('community')}
              className={`flex-1 px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium 
                transition-all ${
                userType === 'community'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-300 text-white/90 shadow-lg shadow-amber-500/10'
                  : 'text-white/80 hover:bg-white/5'
              }`}
            >
              Communauté
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base 
                bg-gradient-to-r from-amber-500/5 to-orange-400/5 rounded-lg 
                text-black placeholder-gray-500 border border-amber-400/10 
                focus:outline-none focus:border-amber-400/30 focus:ring-2 
                focus:ring-amber-400/10 transition-all
                hover:border-amber-400/20"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-orange-500 text-sm text-center">{errorMessage}</p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-amber-400 to-orange-300 
              hover:from-amber-500 hover:to-orange-400
              text-white/90 font-medium shadow-lg shadow-amber-500/10
              hover:shadow-amber-500/20 transition-all
              disabled:from-amber-400/40 disabled:to-orange-300/40
              disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <motion.span
                  className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="ml-2">Envoi...</span>
              </span>
            ) : userType === 'investor' 
              ? 'Être informé en premier' 
              : 'Rejoindre la communauté'
            }
          </Button>

          <p className="text-xs text-center text-amber-500/40 hover:text-amber-500/60 transition-colors">
            {userType === 'investor' 
              ? 'Accès prioritaire • Projets en avant-première • Sans engagement'
              : 'Suivez l\'évolution • Donnez votre avis • Gratuit'}
          </p>

          <AnimatePresence>
            {submitted && (
              <div
                className="bg-gradient-to-r from-amber-400/5 to-orange-300/5 
                  backdrop-blur-sm rounded-lg border border-amber-400/10"
              >
                <div className="text-center p-6">
                  <span 
                    className="text-3xl mb-4 block"
                  >
                    {userType === 'investor' ? '🚀' : '🎉'}
                  </span>
                  <p className="text-white/90 font-medium bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text">
                    {userType === 'investor'
                      ? 'Merci ! Vous serez parmi les premiers informés du lancement.'
                      : 'Bienvenue dans la communauté !'}
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
