'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Star } from 'lucide-react'
import { Pizza } from '@/types'
import { useApp } from '@/context/AppContext'

interface PizzaCardProps {
  pizza: Pizza
  index: number
}

export default function PizzaCard({ pizza, index }: PizzaCardProps) {
  const { dispatch } = useApp()

  const handleAddToOrder = () => {
    dispatch({
      type: 'ADD_PIZZA_TO_ORDER',
      payload: { pizza, quantity: 1 },
    })
  }

  // Generate 5 stars (all filled for now)
  const stars = Array.from({ length: 5 }, (_, i) => i)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-neutral-200 group"
    >
      <Link href={`/pizza/${pizza.id}`} className="block">
        <div className="relative h-48 bg-white cursor-pointer overflow-hidden">
          {pizza.imageUrl ? (
            <Image
              src={pizza.imageUrl}
              alt={pizza.name}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-50">
              <span className="text-7xl">🍕</span>
            </div>
          )}
          {/* Veg/Non-Veg Dot Indicator */}
          <div className="absolute top-2 right-2 z-10">
            <div
              className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                pizza.category === 'vegetarian' ? 'bg-green-500' : 'bg-red-500'
              }`}
              title={pizza.category === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'}
            />
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/pizza/${pizza.id}`}>
          <h3 className="text-lg font-bold text-neutral-900 mb-2 hover:text-primary-600 transition-colors cursor-pointer">
            {pizza.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary-600">
            ${pizza.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            {stars.map((star) => (
              <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>

        <p className="text-sm text-neutral-600 mb-4 line-clamp-2 min-h-[2.5rem]">
          {pizza.ingredients.map(ing => ing.charAt(0).toUpperCase() + ing.slice(1)).join(', ')}
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToOrder}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-900 py-3 rounded-lg font-bold uppercase text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
        >
          <ShoppingCart className="w-4 h-4" />
          ORDER NOW
        </motion.button>
      </div>
    </motion.div>
  )
}

