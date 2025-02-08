'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full py-6 mt-8 border-t border-violet-500/10"
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
           
         
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-2">
            <p className="text-sm text-white/40">
              © {currentYear} MyIKKI. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
} 