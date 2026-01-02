'use client'

import { motion } from 'framer-motion'
import { UtensilsCrossed, Globe, Heart } from 'lucide-react'

const features = [
  {
    icon: UtensilsCrossed,
    title: 'DELICIOUS RECIPE',
    description: 'Our pizzas are made with authentic recipes passed down through generations, ensuring every bite is a masterpiece of flavor.',
  },
  {
    icon: Globe,
    title: 'GLOBAL FLAVOURS',
    description: 'Experience tastes from around the world with our diverse menu featuring classic Italian and innovative fusion options.',
  },
  {
    icon: Heart,
    title: 'DELIGHTFUL TASTE',
    description: 'Made with fresh, high-quality ingredients and cooked to perfection, every pizza delivers an unforgettable dining experience.',
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary-600 text-2xl md:text-3xl font-serif italic mb-2">
            Our Spicy Creature
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 uppercase tracking-tight">
            FEATURES
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <Icon className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold uppercase text-xs hover:bg-primary-700 transition-colors shadow-md"
                >
                  Read More
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

