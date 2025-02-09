import { motion } from 'framer-motion';
import { COLORS } from '@/app/constants/theme';
import { FEATURES } from '@/app/constants/features';
import { Feature } from '@/app/components/Feature';
import { ANIMATIONS } from '@/app/constants/animations';

export const Features = () => {
  return (
    <motion.div variants={ANIMATIONS.item}>
      <div className="space-y-12">
        <div className={`glass rounded-xl p-4 md:p-6 space-y-8 border 
          ${COLORS.glass.border} ${COLORS.primary.hover}
          bg-gradient-to-br ${COLORS.glass.background} transition-colors`}>
          <h3 className={`${COLORS.primary.text} font-semibold text-xl mb-6 text-center lg:text-left`}>
            Sur MyIKKI vous pourrez :
          </h3>
          {FEATURES.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>

        <motion.div variants={ANIMATIONS.item} className="text-center text-sm text-white/40">
          🚧 Propriété intellectuelle MyIKKI
        </motion.div>
      </div>
    </motion.div>
  );
}; 