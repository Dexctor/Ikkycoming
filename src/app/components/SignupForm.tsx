/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useRef } from 'react';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence, useInView } from 'framer-motion';

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
    if (!email.trim()) {
      setErrorMessage("Veuillez entrer un email valide.");
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: userType }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        setErrorMessage("Erreur lors de l'inscription. Réessayez plus tard.");
      }
    } catch (error) {
      setErrorMessage("Impossible de soumettre le formulaire.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <form 
          onSubmit={handleSubmit} 
          className="glass rounded-xl p-6 space-y-4 border border-white/10"
        >
          <div className="flex gap-2 p-1 bg-white/5 rounded-lg">
            <button
              type="button"
              onClick={() => setUserType('investor')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                userType === 'investor'
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Futur Investisseur
            </button>
            <button
              type="button"
              onClick={() => setUserType('community')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                userType === 'community'
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/10'
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
              className="w-full px-4 py-3 bg-white/5 rounded-lg text-white placeholder-white/50 border border-white/10 focus:outline-none focus:border-white/20 transition-colors"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Envoi..." : userType === 'investor' 
              ? 'Être informé en premier' 
              : 'Rejoindre la communauté'}
          </Button>

          <p className="text-xs text-center text-white/40">
            {userType === 'investor' 
              ? 'Accès prioritaire • Projets en avant-première • Sans engagement'
              : 'Suivez l\'évolution • Donnez votre avis • Gratuit'}
          </p>

          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
            
              >
                <div className="text-center p-6">
                  <span className="text-3xl mb-4 block">
                    {userType === 'investor' ? '🚀' : '🎉'}
                  </span>
                  <p className="text-white font-medium">
                    {userType === 'investor'
                      ? 'Merci ! Vous serez parmi les premiers informés du lancement.'
                      : 'Bienvenue dans la communauté !'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </motion.div>
  );
}
