'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Sparkles } from 'lucide-react'
import { useRef } from 'react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), {
    stiffness: 300,
    damping: 30
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    stiffness: 300,
    damping: 30
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
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
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }}
          >
            {/* Main Pizza Image Container with 3D Effect */}
            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
              {/* 3D Floating Animation Container */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 4,
                    ease: 'easeInOut'
                  }
                }}
                className="relative w-full h-80 sm:h-96 lg:h-[500px]"
              >
                {/* Enhanced Shadow Layer */}
                <div 
                  className="absolute inset-0 rounded-full blur-3xl"
                  style={{ 
                    transform: 'translateZ(-50px) scale(1.2)',
                    filter: 'blur(40px)',
                    background: 'radial-gradient(circle, rgba(0,0,0,0.2) 0%, transparent 70%)'
                  }}
                />
                
                {/* Main Image - Children Eating Pizza with 3D Depth */}
                <motion.div
                  className="relative w-full h-full"
                  style={{
                    transform: 'translateZ(30px)',
                    filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.3))',
                  }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=800&fit=crop"
                    alt="Children enjoying pizza"
                    fill
                    priority
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>

                {/* Additional Depth Layers */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full"
                  style={{ transform: 'translateZ(20px)' }}
                />
              </motion.div>

              {/* Enhanced Decorative Circles with 3D effect */}
              <motion.div 
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-600 rounded-full opacity-10 blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: 'easeInOut'
                }}
                style={{ transform: 'translateZ(-30px)' }}
              />
              
              {/* Additional 3D glow effect */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"
                style={{ transform: 'translateZ(-100px) translate(-50%, -50%)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
