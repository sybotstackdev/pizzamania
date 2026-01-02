'use client'

import { motion } from 'framer-motion'
import { Percent, Tag } from 'lucide-react'

const offers = [
  {
    id: '1',
    discount: '50% OFF',
    code: 'LPNEW50',
    description: 'Use Code LPNEW50',
  },
  {
    id: '2',
    discount: '50% OFF',
    code: 'LPFLAT50',
    description: 'Use Code LPFLAT50',
  },
  {
    id: '3',
    discount: null,
    code: 'B2G1',
    description: 'Use Code B2G1 FREE',
  },
]

export default function OffersSection() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-primary-400"></div>
          <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
          <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex-1 h-px bg-neutral-300"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 uppercase tracking-wide">
              TOP OFFERS
            </h2>
            <div className="flex-1 h-px bg-neutral-300"></div>
          </div>
        </motion.div>

        {/* Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto px-4">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-4 relative overflow-hidden hover:shadow-xl transition-shadow border border-neutral-200"
            >
              {offer.discount && (
                <div className="absolute top-0 left-0 bg-success-500 text-white px-3 py-1.5 text-base font-bold rounded-br-lg">
                  {offer.discount}
                </div>
              )}

              <div className="mt-6">
                <div className="mb-3">
                  <p className="text-neutral-600 text-xs mb-1.5">Use Code</p>
                  <div className="inline-flex items-center gap-2 border-2 border-dashed border-success-500 rounded-full px-3 py-1.5">
                    <span className="text-success-600 font-bold text-sm">{offer.code}</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-3 right-3">
                <div className="relative">
                  <Tag className="w-8 h-8 text-success-600 rotate-[-15deg]" />
                  <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-success-500 rounded-full flex items-center justify-center">
                    <Percent className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Carousel Dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-primary-400"></div>
          <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
          <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
        </div>
      </div>
    </section>
  )
}

