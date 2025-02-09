import { motion } from 'framer-motion';
import Image from 'next/image';

export const LoadingScreen = () => (
  <motion.div
    key="loading"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="min-h-screen bg-black flex items-center justify-center"
  >
    <Image
      src="/images/logo/logo.webp"
      alt="MyIKKI Logo"
      width={80}
      height={80}
      priority
      className="animate-pulse drop-shadow-[0_0_15px_rgba(74,240,160,0.2)]"
    />
  </motion.div>
); 