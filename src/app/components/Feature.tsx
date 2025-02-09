import { motion } from 'framer-motion';
import { Feature as FeatureType } from '@/app/constants/features';

interface FeatureProps extends FeatureType {
  index: number;
}

export const Feature = ({ title, desc, icon, color, index }: FeatureProps) => (
  <motion.div
    className="flex items-start space-x-4"
    variants={{
      hidden: { opacity: 0, x: -10 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.4,
          delay: 0.1 + index * 0.1,
          ease: [0.25, 0.1, 0.25, 1],
        }
      }
    }}
  >
    <motion.span
      className={`text-2xl bg-clip-text text-transparent bg-gradient-to-r ${color}`}
      variants={{
        hidden: { opacity: 0, scale: 0.5, rotate: -180 },
        animate: { 
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }
      }}
      animate="animate"
      initial="hidden"
    >
      {icon}
    </motion.span>
    <div className="flex-1">
      <h3 className="text-white font-medium text-xl mb-2">{title}</h3>
      <p className="text-white/70 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
); 