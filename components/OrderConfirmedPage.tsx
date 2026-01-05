'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Clock, Package, ShoppingCart, ArrowLeft, Home, Sparkles, PartyPopper } from 'lucide-react'
import Footer from './Footer'

export default function OrderConfirmedPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderInfo, setOrderInfo] = useState<{
    orderId: string
    estimatedTime: number
    itemCount: number
    total: number
    timestamp: string
  } | null>(null)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Get order info from URL params or localStorage
    const orderId = searchParams.get('id')
    const estimatedTime = searchParams.get('time')
    const itemCount = searchParams.get('items')
    const total = searchParams.get('total')

    if (orderId && estimatedTime && itemCount && total) {
      setOrderInfo({
        orderId,
        estimatedTime: parseInt(estimatedTime),
        itemCount: parseInt(itemCount),
        total: parseFloat(total),
        timestamp: new Date().toISOString(),
      })
    } else {
      // If no params, redirect to menu
      router.push('/menu')
    }

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [searchParams, router])

  // Confetti colors matching the brand
  const confettiColors = ['#FBBF24', '#DC2626', '#F59E0B', '#22C55E', '#3B82F6', '#8B5CF6']

  // Generate confetti particles
  const generateConfetti = () => {
    if (typeof window === 'undefined') return null
    
    return Array.from({ length: 80 }).map((_, i) => {
      const size = Math.random() * 12 + 6 // 6-18px
      const startX = Math.random() * 100 // 0-100%
      const delay = Math.random() * 0.8 // 0-0.8s delay
      const duration = Math.random() * 2 + 4 // 4-6s duration
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)]
      const shape = Math.random() > 0.5 ? 'circle' : 'square'
      const rotation = Math.random() * 720 - 360 // -360 to 360 degrees

      return (
        <motion.div
          key={i}
          initial={{
            x: `${startX}vw`,
            y: -30,
            opacity: 1,
            rotate: 0,
            scale: 1,
          }}
          animate={{
            y: window.innerHeight + 150,
            x: `${startX + (Math.random() * 30 - 15)}vw`,
            rotate: rotation,
            opacity: [1, 1, 0.8, 0],
            scale: [1, 1.3, 1, 0.5],
          }}
          transition={{
            duration,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            position: 'fixed',
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: shape === 'circle' ? '50%' : shape === 'square' ? '20%' : '0%',
            top: 0,
            left: 0,
            zIndex: 9999,
            pointerEvents: 'none',
            boxShadow: `0 0 ${size}px ${color}40`,
          }}
        />
      )
    })
  }

  if (!orderInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-neutral-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {generateConfetti()}
        </div>
      )}

      {/* Main Content */}
      <section className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Menu</span>
              </Link>
            </motion.div>

            {/* Success Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden"
            >
              {/* Success Header */}
              <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 px-8 md:px-12 py-16 md:py-20 text-center relative overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                     radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                     radial-gradient(circle at 40% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                  }} />
                </div>

                {/* Decorative Sparkles */}
                <div className="absolute inset-0 opacity-30">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0.5, 0],
                        scale: [0, 1.2, 0.8, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.25,
                        ease: 'easeInOut',
                      }}
                      className="absolute"
                      style={{
                        left: `${(i * 8.33) % 100}%`,
                        top: `${(i * 12) % 100}%`,
                      }}
                    >
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, type: 'spring', delay: 0.2 }}
                  className="relative z-10"
                >
                  {/* Success Icon with Pulse Effect */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.7, type: 'spring', delay: 0.3 }}
                    className="relative inline-block mb-8"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.1, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute inset-0 bg-white rounded-full blur-xl"
                    />
                    <div className="relative w-28 h-28 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-2xl">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                      >
                        <CheckCircle className="w-20 h-20 md:w-24 md:h-24 text-success-600" strokeWidth={2.5} />
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 tracking-tight"
                  >
                    Order Confirmed!
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4"
                  >
                    <PartyPopper className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold text-sm">Celebration Time!</span>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-lg md:text-xl text-neutral-800 max-w-2xl mx-auto leading-relaxed"
                  >
                    Thank you for your order. We've received it and will start preparing right away.
                  </motion.p>
                </motion.div>
              </div>

              {/* Order Details */}
              <div className="p-8 md:p-10">
                <div className="space-y-3 mb-10">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="group flex items-center justify-between p-5 bg-neutral-100 rounded-xl border border-neutral-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow"
                      >
                        <Package className="w-7 h-7 text-primary-600" strokeWidth={2} />
                      </motion.div>
                      <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1.5 font-medium">Order ID</p>
                        <p className="font-bold text-neutral-900 font-mono text-base tracking-wider">{orderInfo.orderId}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="group flex items-center justify-between p-5 bg-neutral-100 rounded-xl border border-neutral-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow"
                      >
                        <ShoppingCart className="w-7 h-7 text-primary-600" strokeWidth={2} />
                      </motion.div>
                      <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1.5 font-medium">Items</p>
                        <p className="font-bold text-neutral-900 text-lg">
                          {orderInfo.itemCount} {orderInfo.itemCount === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="group flex items-center justify-between p-5 bg-neutral-100 rounded-xl border border-neutral-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow"
                      >
                        <Clock className="w-7 h-7 text-primary-600" strokeWidth={2} />
                      </motion.div>
                      <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1.5 font-medium">Estimated Time</p>
                        <p className="font-bold text-neutral-900 text-lg">{orderInfo.estimatedTime} minutes</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 0.5, type: 'spring' }}
                    className="flex items-center justify-between p-6 md:p-7 bg-red-50 rounded-xl border border-red-200 shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: -10 }}
                        className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg"
                      >
                        <span className="text-white font-bold text-2xl">$</span>
                      </motion.div>
                      <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2 font-semibold">Total Amount</p>
                        <p className="font-bold text-3xl md:text-4xl text-primary-600">${orderInfo.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Info Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-6 md:p-8 mb-10 shadow-sm"
                >
                  <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2 text-lg">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Sparkles className="w-6 h-6 text-primary-600" />
                    </motion.div>
                    What's Next?
                  </h3>
                  <ul className="space-y-3 text-neutral-800">
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-primary-600 mt-0.5 font-bold text-lg">✓</span>
                      <span className="text-base">Your order is being prepared with fresh ingredients</span>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-primary-600 mt-0.5 font-bold text-lg">✓</span>
                      <span className="text-base">You'll receive updates on your order status</span>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-primary-600 mt-0.5 font-bold text-lg">✓</span>
                      <span className="text-base">Our delivery team will contact you when your order is ready</span>
                    </motion.li>
                  </ul>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/menu" className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-neutral-900 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-base"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Order More
                    </motion.button>
                  </Link>
                  <Link href="/" className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md text-base"
                    >
                      <Home className="w-5 h-5" />
                      Go Home
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}

