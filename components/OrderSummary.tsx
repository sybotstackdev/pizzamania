'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function OrderSummary() {
  const { state, dispatch } = useApp()
  const router = useRouter()
  const [isConfirming, setIsConfirming] = useState(false)

  const subtotal = state.currentOrder.reduce((sum, item) => sum + item.originalPrice, 0)
  const totalDiscount = state.currentOrder.reduce((sum, item) => sum + item.discount, 0)
  const total = subtotal - totalDiscount

  const handleRemoveItem = (pizzaId: string) => {
    dispatch({ type: 'REMOVE_PIZZA_FROM_ORDER', payload: pizzaId })
  }

  const handleUpdateQuantity = (pizzaId: string, quantity: number) => {
    if (quantity < 1) return
    dispatch({ type: 'UPDATE_ORDER_QUANTITY', payload: { pizzaId, quantity } })
  }

  const handleConfirmOrder = () => {
    if (state.currentOrder.length === 0) return

    setIsConfirming(true)
    const orderId = `ORD-${Date.now().toString().slice(-6)}`
    const itemCount = state.currentOrder.reduce((sum, item) => sum + item.quantity, 0)
    // Estimate time: 15 minutes base + 5 minutes per pizza
    const estimatedTime = 15 + (itemCount * 5)
    
    const order = {
      id: orderId,
      items: state.currentOrder,
      subtotal,
      totalDiscount,
      total,
      timestamp: new Date().toISOString(),
    }

    dispatch({ type: 'CONFIRM_ORDER', payload: order })
    
    // Redirect to order confirmation page
    setTimeout(() => {
      setIsConfirming(false)
      router.push(`/order-confirmed?id=${orderId}&time=${estimatedTime}&items=${itemCount}&total=${total}`)
    }, 500)
  }

  if (state.currentOrder.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-12 text-center border border-neutral-200"
      >
        <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-12 h-12 text-neutral-400" />
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">Your cart is empty</h3>
        <p className="text-neutral-600 mb-6">Add some delicious pizzas to get started!</p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-neutral-900 px-6 py-3 rounded-lg font-bold uppercase text-sm transition-colors shadow-md"
        >
          Browse Menu
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Items List */}
      <div className="lg:col-span-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-neutral-50">
            <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-primary-600" />
              Order Summary
            </h2>
            {state.currentOrder.length > 0 && (
              <button
                onClick={() => dispatch({ type: 'CLEAR_CURRENT_ORDER' })}
                className="text-sm text-error-600 hover:text-error-700 font-medium flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          {/* Items */}
          <div className="divide-y divide-neutral-200">
            <AnimatePresence>
              {state.currentOrder.map((item) => (
                <motion.div
                  key={item.pizza.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-6 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex gap-4">
                    {/* Pizza Image */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
                      {item.pizza.imageUrl ? (
                        <Image
                          src={item.pizza.imageUrl}
                          alt={item.pizza.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-3xl">🍕</span>
                        </div>
                      )}
                      {/* Veg/Non-Veg Dot Indicator */}
                      <div className="absolute top-1 right-1 z-10">
                        <div
                          className={`w-3 h-3 rounded-full border-2 border-white shadow-md ${
                            item.pizza.category === 'vegetarian' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          title={item.pizza.category === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'}
                        />
                      </div>
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-neutral-900 text-lg mb-1">
                            {item.pizza.name}
                          </h3>
                          <p className="text-sm text-neutral-500">
                            ${item.pizza.price.toFixed(2)} each
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.pizza.id)}
                          className="text-error-500 hover:text-error-600 p-2 hover:bg-error-50 rounded-lg transition-colors flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-neutral-100 rounded-lg p-1">
                          <button
                            onClick={() => handleUpdateQuantity(item.pizza.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors text-neutral-700 hover:text-primary-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-bold text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.pizza.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors text-neutral-700 hover:text-primary-600"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          {item.discount > 0 && (
                            <div className="text-xs text-success-600 font-semibold mb-1">
                              10% off!
                            </div>
                          )}
                          <div className="flex flex-col items-end">
                            {item.discount > 0 && (
                              <span className="text-xs text-neutral-400 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                            <span className="text-xl font-bold text-primary-600">
                              ${item.discountedPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Order Total Card */}
      <div className="lg:col-span-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-6 sticky top-24"
        >
          <h3 className="text-lg font-bold text-neutral-900 mb-6">Order Total</h3>

          {/* Summary */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            {totalDiscount > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-between text-success-600 font-semibold"
              >
                <span>Discount</span>
                <span>-${totalDiscount.toFixed(2)}</span>
              </motion.div>
            )}
            <div className="border-t border-neutral-200 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-neutral-900">Total</span>
                <span className="text-2xl font-bold text-primary-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirmOrder}
            disabled={state.currentOrder.length === 0 || isConfirming}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-900 py-4 rounded-xl font-bold uppercase text-sm disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            {isConfirming ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full"
                />
                Confirming...
              </span>
            ) : (
              'Confirm Order'
            )}
          </motion.button>

          {/* Security Note */}
          <p className="text-xs text-neutral-500 text-center mt-4">
            🔒 Secure checkout • Free delivery on orders over $20
          </p>
        </motion.div>
      </div>
    </div>
  )
}
