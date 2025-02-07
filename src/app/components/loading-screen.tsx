"use client";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

export const LoadingScreen = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.05, 1],
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    });
  }, [controls]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1)_0%,rgba(0,0,0,0.95)_100%)] backdrop-blur-lg"
      >
        <div className="relative flex flex-col items-center">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36">
            {/* Effet de particules en arrière-plan */}
            <motion.div
              animate={controls}
              className="absolute inset-[-150%] opacity-20"
            >
              <div className="w-full h-full bg-[url('/images/hex-grid.png')] bg-center bg-repeat-space opacity-30 mix-blend-screen" />
            </motion.div>

            {/* Cercle lumineux pulsant */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(245,158,11,0.2)",
                  "0 0 60px rgba(249,115,22,0.4)",
                  "0 0 20px rgba(245,158,11,0.2)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Logo avec animation améliorée */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ 
                y: [-4, 4, -4],
                rotateZ: [-1, 1, -1],
                scale: [0.95, 1.05, 0.95]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/logo/logo.png"
                alt="MyIKKI Logo"
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                style={{ filter: "brightness(1.2)" }}
              />
            </motion.div>

            {/* Anneaux rotatifs */}
            <motion.div
              className="absolute inset-[-20%] border-2 border-amber-500/10 rounded-full"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute inset-[-30%] border border-orange-500/5 rounded-full"
              animate={{
                rotate: [360, 0],
                scale: [1.1, 1, 1.1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Barre de progression moderne */}
            <div className="absolute -bottom-20 sm:-bottom-24 left-1/2 -translate-x-1/2 w-48 sm:w-56 md:w-64">
              <motion.div 
                className="h-[3px] bg-black/30 rounded-full overflow-hidden backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="h-full w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                    scaleX: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Points de progression avec effet de vague */}
              <div className="flex justify-center gap-3 mt-4">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Message de chargement avec effet de fondu */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-28 text-amber-500/70 text-sm font-light tracking-wider"
          >
            Chargement en cours...
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};