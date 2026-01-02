'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import OrderSummary from './OrderSummary'
import Footer from './Footer'
import SuggestedItems from './SuggestedItems'

export default function CartPage() {
  const { state } = useApp()
  const excludeIds = state.currentOrder.map(item => item.pizza.id)

  return (
    <>
      {/* Split Layout */}
      <section className="min-h-screen flex">
        {/* Left Side - Background Image */}
        <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-primary-600 to-primary-700">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&h=1600&fit=crop')" }}
          ></div>
          <div className="relative z-10 h-full flex items-center justify-center p-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-center"
            >
              <ShoppingCart className="w-24 h-24 mx-auto mb-6 opacity-80" />
              <h2 className="text-4xl font-bold mb-4 uppercase">Your Order</h2>
              <p className="text-xl text-primary-100 leading-relaxed max-w-md">
                Review your delicious selection and proceed to checkout
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Cart Content */}
        <div className="w-full lg:w-1/2 bg-neutral-50">
          <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-12 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary-600 mb-8 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Continue Shopping</span>
              </Link>

              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2 uppercase tracking-tight">
                  Your Cart
                </h1>
                <p className="text-neutral-600 text-lg">
                  Review your order and proceed to checkout
                </p>
              </div>

              <OrderSummary />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Suggested Items */}
      <SuggestedItems excludeIds={excludeIds} title="Complete Your Order" limit={4} />

      {/* Footer */}
      <Footer />
    </>
  )
}

