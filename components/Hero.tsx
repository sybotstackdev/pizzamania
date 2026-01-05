'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400 rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-yellow-400 text-neutral-900 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Fresh Daily • Made with Love</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight">
              Handmade, With an Extra Pinch of{' '}
              <span className="text-primary-600 relative">
                Love
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-2 left-0 h-3 bg-yellow-400 opacity-30 -z-10"
                />
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Experience the perfect blend of authentic Italian flavors and fresh ingredients. Every pizza is crafted with passion and delivered hot to your door.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-neutral-900 px-8 py-4 rounded-xl font-bold uppercase text-sm transition-all shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Order Now
                </motion.button>
              </Link>
              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-white hover:bg-neutral-50 text-neutral-900 border-2 border-neutral-300 px-8 py-4 rounded-xl font-bold uppercase text-sm transition-all shadow-md hover:shadow-lg"
                >
                  View Menu
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
              <div>
                <div className="text-3xl font-bold text-primary-600">1000+</div>
                <div className="text-sm text-neutral-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">50+</div>
                <div className="text-sm text-neutral-600">Pizza Varieties</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">30min</div>
                <div className="text-sm text-neutral-600">Avg Delivery</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Pizza Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Pizza Image Container */}
            <div className="relative">
              <div className="relative w-full h-80 sm:h-96 lg:h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=800&fit=crop"
                  alt="Delicious Pizza"
                  fill
                  priority
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Floating Promotional Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: -12 }}
                animate={{ opacity: 1, y: 0, rotate: -12 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="absolute -top-4 -right-4 lg:-right-8 bg-yellow-400 px-6 py-4 rounded-2xl shadow-2xl z-20 transform rotate-[-12deg]"
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl">🍕</span>
                  <div className="text-neutral-900 font-bold text-xs uppercase text-center leading-tight">
                    <div>BUY ONE</div>
                    <div>GET ONE</div>
                    <div className="text-primary-600">FREE</div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Circle */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-600 rounded-full opacity-10 blur-2xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
