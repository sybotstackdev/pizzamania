'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import PizzaCard from './PizzaCard'
import PizzaFilters from './PizzaFilters'
import PizzaCharts from './PizzaCharts'
import Footer from './Footer'
import { Pizza } from '@/types'

export default function MenuPage() {
  const { state } = useApp()

  // Filter and sort pizzas
  const filteredAndSortedPizzas = useMemo(() => {
    let filtered: Pizza[] = [...state.pizzas]

    // Apply search filter
    if (state.filters.search) {
      const searchLower = state.filters.search.toLowerCase()
      filtered = filtered.filter((pizza) =>
        pizza.name.toLowerCase().includes(searchLower) ||
        pizza.ingredients.some((ing) => ing.toLowerCase().includes(searchLower))
      )
    }

    // Apply category filter
    if (state.filters.category !== 'all') {
      filtered = filtered.filter((pizza) => pizza.category === state.filters.category)
    }

    // Apply price filter
    if (state.filters.maxPrice !== null) {
      filtered = filtered.filter((pizza) => pizza.price <= state.filters.maxPrice!)
    }

    // Apply ingredient filter
    if (state.filters.ingredient) {
      filtered = filtered.filter((pizza) =>
        pizza.ingredients.includes(state.filters.ingredient!)
      )
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (state.sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        default:
          return 0
      }
    })

    return sorted
  }, [state.pizzas, state.filters, state.sortOption])

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(state.pizzas.map((p) => p.category || 'other'))
    return Array.from(cats)
  }, [state.pizzas])

  return (
    <>
      {/* Header Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <p className="text-primary-600 text-lg md:text-xl font-semibold uppercase tracking-wide">
                Popular Dishes
              </p>
              <div className="w-20 h-1 bg-primary-600"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
              Browse Our Menu
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              From classic favorites to innovative creations, discover the perfect pizza for every taste
            </p>
            <Link href="/add-pizza">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-neutral-900 px-6 py-3 rounded-lg font-bold uppercase text-sm transition-all shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add New Pizza
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          {/* Charts */}
          <div className="mb-12">
            <PizzaCharts />
          </div>

          {/* Filters */}
          <div className="mb-12">
            <PizzaFilters />
          </div>

          {/* Pizza Grid */}
          {filteredAndSortedPizzas.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-lg p-12 text-center border border-neutral-200"
            >
              <p className="text-2xl text-neutral-600 mb-2">No pizzas found</p>
              <p className="text-neutral-500">Try adjusting your filters</p>
            </motion.div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {filteredAndSortedPizzas.map((pizza, index) => (
                  <PizzaCard key={pizza.id} pizza={pizza} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}

