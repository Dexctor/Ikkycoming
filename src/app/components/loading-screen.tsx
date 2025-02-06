"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/logo/logo.png"
            alt="MyIki Logo"
            width={100}
            height={100}
            className="drop-shadow-[0_0_30px_rgba(0,255,163,0.3)]"
          />
        </motion.div>
        
        {/* Barre de progression */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          transition={{ 
            duration: 1,
            delay: 0.2,
          }}
          className="h-0.5 bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF] mt-8 rounded-full"
        />
      </div>
    </motion.div>
  );
}; 