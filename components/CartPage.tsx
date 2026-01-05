'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import OrderSummary from './OrderSummary'
import Footer from './Footer'
import SuggestedItems from './SuggestedItems'

export default function CartPage() {
  const { state } = useApp()
  const excludeIds = state.currentOrder.map(item => item.pizza.id)
  const itemCount = state.currentOrder.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-neutral-50 to-white py-12 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary-600 mb-6 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
                  Your Cart
                </h1>
                <p className="text-lg text-neutral-600">
                  {itemCount > 0 
                    ? `${itemCount} ${itemCount === 1 ? 'item' : 'items'} in your cart`
                    : 'Your cart is empty'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 bg-neutral-50 min-h-[60vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <OrderSummary />
          </div>
        </div>
      </section>

      {/* Suggested Items */}
      {itemCount > 0 && (
        <SuggestedItems excludeIds={excludeIds} title="Complete Your Order" limit={4} />
      )}

      {/* Footer */}
      <Footer />
    </>
  )
}

