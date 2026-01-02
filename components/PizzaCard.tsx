'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Minus } from 'lucide-react'
import { Pizza } from '@/types'
import { useApp } from '@/context/AppContext'
import { useState } from 'react'

interface PizzaCardProps {
  pizza: Pizza
  index: number
}

export default function PizzaCard({ pizza, index }: PizzaCardProps) {
  const { dispatch } = useApp()
  const [quantity, setQuantity] = useState(1)

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <span className="text-7xl">🍕</span>
              </motion.div>
            </div>
          )}
          {pizza.category === 'vegetarian' && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 bg-success-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-20"
            >
              VEG
            </motion.span>
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

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary-600">
              ${pizza.price.toFixed(2)}
            </span>

            <div className="flex items-center gap-1 bg-neutral-100 rounded-lg border border-neutral-200">
              <button
                onClick={decrementQuantity}
                className="p-1 hover:bg-neutral-200 rounded transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3 text-neutral-700" />
              </button>
              <span className="w-6 text-center font-bold text-neutral-900 text-xs">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="p-1 hover:bg-neutral-200 rounded transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3 text-neutral-700" />
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToOrder}
            className="w-full bg-primary-600 text-white py-2 rounded-lg font-bold uppercase text-xs hover:bg-primary-700 transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

