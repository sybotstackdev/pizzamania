'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, ArrowRight } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Pizza } from '@/types'

interface SuggestedItemsProps {
  currentPizzaId?: string
  excludeIds?: string[]
  title?: string
  limit?: number
}

export default function SuggestedItems({ 
  currentPizzaId, 
  excludeIds = [], 
  title = "You May Also Like",
  limit = 4 
}: SuggestedItemsProps) {
  const { state, dispatch } = useApp()

  // Get suggested pizzas (exclude current pizza and excluded IDs)
  const suggestedPizzas = state.pizzas
    .filter((pizza) => pizza.id !== currentPizzaId && !excludeIds.includes(pizza.id))
    .slice(0, limit)

  const handleAddToCart = (pizza: Pizza) => {
    dispatch({
      type: 'ADD_PIZZA_TO_ORDER',
      payload: { pizza, quantity: 1 },
    })
  }

  if (suggestedPizzas.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-2 uppercase tracking-wide">
              {title}
            </h2>
            <p className="text-neutral-600">Complete your order with these delicious options</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {suggestedPizzas.map((pizza, index) => (
              <motion.div
                key={pizza.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-neutral-200 group"
              >
                <Link href={`/pizza/${pizza.id}`} className="block">
                  <div className="relative h-40 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 cursor-pointer overflow-hidden image-container">
                    {pizza.imageUrl ? (
                      <Image
                        src={pizza.imageUrl}
                        alt={pizza.name}
                        fill
                        className="object-cover transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl">🍕</span>
                      </div>
                    )}
                    {pizza.category === 'vegetarian' && (
                      <span className="absolute top-2 right-2 bg-success-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-20">
                        VEG
                      </span>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/pizza/${pizza.id}`}>
                    <h3 className="text-base font-bold text-neutral-900 mb-1.5 hover:text-primary-600 transition-colors cursor-pointer uppercase tracking-wide line-clamp-1">
                      {pizza.name}
                    </h3>
                  </Link>

                  <p className="text-neutral-600 text-xs mb-3 line-clamp-2 min-h-[2rem]">
                    {pizza.ingredients.map(ing => ing.charAt(0).toUpperCase() + ing.slice(1)).join(', ')}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-primary-600">
                      ${pizza.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/pizza/${pizza.id}`} className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-neutral-100 text-neutral-700 py-1.5 rounded-lg font-bold uppercase text-xs hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1 border border-neutral-200"
                      >
                        View
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddToCart(pizza)
                      }}
                      className="flex-1 bg-primary-600 text-white py-1.5 rounded-lg font-bold uppercase text-xs hover:bg-primary-700 transition-colors flex items-center justify-center gap-1 shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

