'use client'

import { motion } from 'framer-motion'
import { UtensilsCrossed, Leaf, Smile, Truck } from 'lucide-react'

const features = [
  {
    icon: UtensilsCrossed,
    title: 'All kinds of Foods',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    icon: Leaf,
    title: 'Fresh Foods',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    icon: Smile,
    title: 'Best Taste',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    icon: Truck,
    title: 'On Time Delivery',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
]

export default function Features() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute left-0 top-20 opacity-20">
        <div className="text-6xl">🌿</div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary-600 text-lg md:text-xl font-semibold mb-2 uppercase tracking-wide">
            Our Strength
          </p>
          <div className="w-20 h-1 bg-primary-600 mx-auto mb-4"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
            Why We Are The Best?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

