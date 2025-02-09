import { motion } from 'framer-motion';

export const GradientBackground = () => (
  <motion.div
    className="absolute inset-0 -z-10"
    animate={{
      background: [
        'radial-gradient(circle at 50% 50%, rgba(74,240,160,0.08) 0%, transparent 70%)',
        'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)',
      ],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: [0.4, 0, 0.2, 1],
      repeatType: "mirror",
    }}
  />
); 