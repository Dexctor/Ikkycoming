'use client'

import { motion } from 'framer-motion'
import React from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
}

const AnimatedSection = ({ children }: { children: React.ReactNode }) => (
  <motion.section 
    className="mb-16 p-8 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700/50 transition-colors"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.section>
)

export default function AnimatedPrivacyContent({ children }: { children: React.ReactNode }) {
  const wrappedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === 'section') {
        return <AnimatedSection>{child.props.children}</AnimatedSection>
      }
      if (child.type === 'h1') {
        return (
          <motion.h1 
            {...child.props}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        )
      }
    }
    return child
  })

  return (
    <motion.div 
      className="max-w-4xl mx-auto px-6 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {wrappedChildren}
    </motion.div>
  )
}