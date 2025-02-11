"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { memo } from "react";

// Optimisation des animations pour réduire la charge CPU
const ANIMATIONS = {
  logo: {
    scale: [1, 1.01, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  },
  progressBar: {
    scaleX: [0, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    }
  }
};

// Utilisation de memo pour éviter les re-rendus inutiles
export const LoadingScreen = memo(() => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      >
        <div className="relative flex flex-col items-center">
          <motion.div 
            animate={ANIMATIONS.logo}
            className="relative w-24 h-24"
          >
            <Image
              src="/images/logo/logo.webp"
              alt="MyIKKI Logo"
              width={96}
              height={96}
              priority
              className="object-contain"
              loading="eager"
            />
          </motion.div>
          
          <motion.div 
            animate={ANIMATIONS.progressBar}
            className="w-32 h-0.5 mt-4 overflow-hidden"
          >
            <div className="w-full h-full bg-gradient-to-r from-amber-500 to-orange-500" />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

LoadingScreen.displayName = 'LoadingScreen';