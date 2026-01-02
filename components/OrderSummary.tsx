'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X, Trash2 } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8 text-center border border-neutral-200"
      >
        <ShoppingCart className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
        <p className="text-neutral-600 font-semibold mb-2">Your cart is empty</p>
        <p className="text-sm text-neutral-500">Add some pizzas to get started!</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-neutral-200"
    >
      <div className="flex items-center justify-between mb-6 border-b border-neutral-200 pb-4">
        <h2 className="text-2xl font-bold text-neutral-900 flex items-center gap-2 uppercase tracking-wide">
          <ShoppingCart className="w-6 h-6 text-primary-600" />
          Order Summary
        </h2>
        {state.currentOrder.length > 0 && (
          <button
            onClick={() => dispatch({ type: 'CLEAR_CURRENT_ORDER' })}
            className="text-sm text-error-600 hover:text-error-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {state.currentOrder.map((item) => (
            <motion.div
              key={item.pizza.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="border border-neutral-200 rounded-xl p-4 bg-neutral-50"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">{item.pizza.name}</h3>
                  <p className="text-sm text-neutral-500">${item.pizza.price.toFixed(2)} each</p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.pizza.id)}
                  className="text-error-500 hover:text-error-600 p-1"
                  aria-label="Remove item"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleUpdateQuantity(item.pizza.id, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-700 transition-colors text-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.pizza.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-700 transition-colors text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  {item.discount > 0 && (
                    <div className="text-xs text-success-600 font-semibold mb-1">
                      {item.quantity >= 3 && '10% off!'}
                    </div>
                  )}
                  <div className="flex flex-col items-end">
                    {item.discount > 0 && (
                      <span className="text-xs text-neutral-400 line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="font-bold text-neutral-900">
                      ${item.discountedPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t border-neutral-200 pt-4 space-y-2">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
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
        <div className="flex justify-between text-xl font-bold text-neutral-900 pt-2 border-t border-neutral-200">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleConfirmOrder}
        disabled={state.currentOrder.length === 0 || isConfirming}
        className="w-full mt-6 bg-primary-600 text-white py-2.5 rounded-lg font-bold uppercase text-xs hover:bg-primary-700 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors shadow-md"
      >
        {isConfirming ? 'Confirming...' : 'Confirm Order'}
      </motion.button>
    </motion.div>
  )
}
