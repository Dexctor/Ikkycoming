import { motion } from 'framer-motion';
import { COLORS } from '@/app/constants/theme';
import { ANIMATIONS } from '@/app/constants/animations';

export const LaunchAnnouncement = () => (
  <div className="mt-20">
    <motion.div variants={ANIMATIONS.item} className="max-w-2xl mx-auto">
      <motion.div
        className={`glass rounded-xl p-4 md:p-6 text-center
          ${COLORS.glass.border} ${COLORS.primary.hover}
          bg-gradient-to-br ${COLORS.glass.background}`}
        whileHover={{
          scale: 1.01,
          boxShadow: "0 0 30px rgba(74,240,160,0.05)",
          borderColor: "rgba(74,240,160,0.1)",
        }}
      >
        <h3 className={`${COLORS.primary.text} font-semibold text-xl mb-3`}>
          🚀 LANCEMENT IMMINENT
        </h3>
        <p className="text-white/70 leading-relaxed">
          Ne manquez pas le lancement de MyIKKI ! Inscrivez-vous à notre liste d'attente exclusive pour être informé en premier et bénéficier d'un accès prioritaire dès l'ouverture de la plateforme.
        </p>
      </motion.div>
    </motion.div>
  </div>
); 