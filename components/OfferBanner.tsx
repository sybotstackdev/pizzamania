'use client'

import { motion } from 'framer-motion'

export default function OfferBanner() {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-yellow-400 border-b-2 border-yellow-500 shadow-md"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <motion.span 
            className="text-2xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            🍕
          </motion.span>
          <div className="text-center">
            <span className="text-neutral-900 font-bold text-sm sm:text-base uppercase tracking-wide">
              Buy One Get One <span className="text-primary-600 font-extrabold">FREE</span> - Limited Time Offer!
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

