import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { ANIMATIONS } from '@/app/constants/animations';
import { useMemo } from 'react';

export const SocialButtons = () => {
  const socialLinks = useMemo(() => [
    { Icon: FaTwitter, href: "https://x.com/MyIkki_Network", color: "hover:text-green-400" },
    { Icon: FaLinkedin, href: "https://www.linkedin.com/company/myikki/", color: "hover:text-violet-500" },
    { Icon: FaInstagram, href: "https://www.instagram.com/myikki_network/", color: "hover:text-pink-500" },
  ], []);

  return (
    <motion.div 
      className="flex justify-center space-x-4 mt-8"
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
    >
      {socialLinks.map(({ Icon, href, color }) => (
        <motion.a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            p-3 rounded-full transition-all duration-300 
            hover:scale-110 hover:shadow-lg text-white/70
            ${color} bg-white/10 backdrop-blur-sm
          `}
          variants={ANIMATIONS.item}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon className="w-6 h-6" />
        </motion.a>
      ))}
    </motion.div>
  );
}; 