'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Plus, Minus } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useState } from 'react'
import Footer from './Footer'
import SuggestedItems from './SuggestedItems'

interface PizzaDetailsProps {
  pizzaId: string
}

export default function PizzaDetails({ pizzaId }: PizzaDetailsProps) {
  const { state, dispatch } = useApp()
  const [quantity, setQuantity] = useState(1)

  const pizza = useMemo(
    () => state.pizzas.find((p) => p.id === pizzaId),
    [state.pizzas, pizzaId]
  )

  if (!pizza) {
    return (
      <>
        <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Pizza Not Found</h1>
            <p className="text-xl text-primary-100">The pizza you{"'"}re looking for doesn{"'"}t exist.</p>
          </div>
        </section>
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4 text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary-700 transition-colors shadow-md"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Menu
            </Link>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  const currentOrderItem = state.currentOrder.find((item) => item.pizza.id === pizza.id)

  const handleAddToOrder = () => {
    dispatch({
      type: 'ADD_PIZZA_TO_ORDER',
      payload: { pizza, quantity },
    })
    setQuantity(1)
  }

  const incrementQuantity = () => setQuantity((q) => q + 1)
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1))

  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 uppercase tracking-tight">
              {pizza.name}
            </h1>
            <p className="text-xl text-primary-100">
              Discover the flavors and ingredients
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pizza Details Content */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary-600 mb-8 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Menu</span>
            </Link>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
                {/* Image Section */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative h-80 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 rounded-2xl overflow-hidden border border-neutral-200 shadow-lg image-container"
                >
                  {pizza.imageUrl ? (
                    <Image
                      src={pizza.imageUrl}
                      alt={pizza.name}
                      fill
                      className="object-cover transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <span className="text-9xl">🍕</span>
                      </motion.div>
                    </div>
                  )}
                  {pizza.category === 'vegetarian' && (
                    <span className="absolute top-4 right-4 bg-success-500 text-white font-bold px-4 py-2 rounded-full shadow-lg z-10">
                      Vegetarian
                    </span>
                  )}
                </motion.div>

                {/* Details Section */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <p className="text-4xl font-bold text-primary-600 mb-4">
                      ${pizza.price.toFixed(2)}
                    </p>
                    {pizza.description && (
                      <p className="text-neutral-600 leading-relaxed">{pizza.description}</p>
                    )}
                  </div>

                  {/* Ingredients */}
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900 mb-3">Ingredients</h2>
                    <div className="flex flex-wrap gap-2">
                      {pizza.ingredients.map((ingredient, index) => (
                        <motion.span
                          key={ingredient}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="border-t border-neutral-200 pt-6">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-semibold text-neutral-700">Quantity:</span>
                      <div className="flex items-center gap-2 bg-neutral-100 rounded-lg p-1.5 border border-neutral-200">
                        <button
                          onClick={decrementQuantity}
                          className="w-8 h-8 flex items-center justify-center hover:bg-neutral-200 rounded transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center text-lg font-bold">{quantity}</span>
                        <button
                          onClick={incrementQuantity}
                          className="w-8 h-8 flex items-center justify-center hover:bg-neutral-200 rounded transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Current Order Info */}
                    {currentOrderItem && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-4"
                      >
                        <p className="text-sm text-primary-700">
                          <span className="font-semibold">{currentOrderItem.quantity}</span> in your cart
                          {currentOrderItem.quantity >= 3 && (
                            <span className="ml-2 text-success-600 font-semibold">
                              (10{"'"}% discount applied!)
                            </span>
                          )}
                        </p>
                      </motion.div>
                    )}

                    {/* Add to Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToOrder}
                      className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-bold uppercase text-sm hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      <Plus className="w-6 h-6" />
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Suggested Items */}
      <SuggestedItems currentPizzaId={pizza.id} title="You May Also Like" limit={4} />

      {/* Footer */}
      <Footer />
    </>
  )
}
