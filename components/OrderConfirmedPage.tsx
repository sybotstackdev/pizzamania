'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Clock, Package, ShoppingCart, ArrowLeft, Home } from 'lucide-react'
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
  }, [searchParams, router])

  if (!orderInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Split Layout */}
      <section className="min-h-screen flex">
        {/* Left Side - Success Illustration */}
        <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-primary-500 to-primary-700">
          <div className="relative z-10 h-full flex items-center justify-center p-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
                className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
              >
                <CheckCircle className="w-20 h-20 text-success-500" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-4 uppercase">Order Confirmed!</h2>
              <p className="text-xl text-primary-100 leading-relaxed max-w-md">
                Your delicious pizza is on its way
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Order Details */}
        <div className="w-full lg:w-1/2 bg-neutral-50">
          <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-12 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Back Button */}
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary-600 mb-8 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Menu</span>
              </Link>

              {/* Success Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-neutral-200">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </motion.div>
                  <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 uppercase tracking-tight">
                    Order Confirmed!
                  </h1>
                  <p className="text-neutral-600 text-lg">
                    Thank you for your order. We{"'"}ve received it and will start preparing right away.
                  </p>
                </div>

                {/* Order Details */}
                <div className="bg-neutral-50 rounded-xl p-6 mb-8 space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Order ID</p>
                        <p className="font-bold text-neutral-900 font-mono">{orderInfo.orderId}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Items</p>
                        <p className="font-bold text-neutral-900">
                          {orderInfo.itemCount} {orderInfo.itemCount === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Estimated Delivery Time</p>
                        <p className="font-bold text-neutral-900">{orderInfo.estimatedTime} minutes</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-bold text-lg">$</span>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Total Amount</p>
                        <p className="font-bold text-2xl text-primary-600">${orderInfo.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                  <h3 className="font-bold text-primary-900 mb-2">What{"'"}s Next?</h3>
                  <ul className="space-y-2 text-primary-800 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">•</span>
                      <span>Your order is being prepared with fresh ingredients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">•</span>
                      <span>You{"'"}ll receive updates on your order status</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">•</span>
                      <span>Our delivery team will contact you when your order is ready</span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/menu" className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-bold uppercase text-xs hover:bg-primary-700 transition-colors shadow-md flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Order More
                    </motion.button>
                  </Link>
                  <Link href="/" className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-neutral-200 text-neutral-700 py-2.5 rounded-lg font-bold uppercase text-xs hover:bg-neutral-300 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Home className="w-5 h-5" />
                      Go Home
                    </motion.button>
                  </Link>
                </div>
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

