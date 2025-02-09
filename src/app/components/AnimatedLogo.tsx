import { motion } from 'framer-motion';
import Image from 'next/image';
import { ANIMATIONS } from '@/app/constants/animations';

export const AnimatedLogo = () => (
  <motion.div variants={ANIMATIONS.item} className="relative flex justify-center mb-8">
    <Image
      src="/images/logo/logo.avif"
      alt="MyIKKI Logo"
      width={120}
      height={120}
      priority
      className="drop-shadow-[0_0_25px_rgba(74,240,160,0.25)]"
      loading="eager"
      fetchPriority="high"
    />
  </motion.div>
); 