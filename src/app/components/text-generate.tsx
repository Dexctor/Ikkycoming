"use client";
import { motion } from "framer-motion";

export const TextGenerateEffect = ({ words }: { words: string; className: string }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
   
    >
      {words}
    </motion.span>
  );
}; 