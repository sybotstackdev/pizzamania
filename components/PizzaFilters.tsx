'use client'

import { motion } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { SortOption, FilterOption } from '@/types'
import { useState } from 'react'

export default function PizzaFilters() {
  const { state, dispatch } = useApp()
  const [showFilters, setShowFilters] = useState(false)

  const allIngredients = Array.from(
    new Set(state.pizzas.flatMap((pizza) => pizza.ingredients))
  ).sort()

  const maxPrice = Math.max(...state.pizzas.map((p) => p.price), 0)

  const handleSearchChange = (value: string) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state.filters, search: value },
    })
  }

  const handleCategoryChange = (category: FilterOption) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state.filters, category },
    })
  }

  const handlePriceChange = (value: string) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state.filters,
        maxPrice: value ? parseFloat(value) : null,
      },
    })
  }

  const handleIngredientChange = (ingredient: string | null) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state.filters, ingredient },
    })
  }

  const handleSortChange = (sortOption: SortOption) => {
    dispatch({ type: 'SET_SORT_OPTION', payload: sortOption })
  }

  const clearFilters = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        search: '',
        category: 'all',
        maxPrice: null,
        ingredient: null,
      },
    })
  }

  const hasActiveFilters =
    state.filters.search ||
    state.filters.category !== 'all' ||
    state.filters.maxPrice !== null ||
    state.filters.ingredient !== null

  return (
    <div className="mb-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search pizzas..."
            value={state.filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
          />
        </div>

        {/* Sort */}
        <select
          value={state.sortOption}
          onChange={(e) => handleSortChange(e.target.value as SortOption)}
          className="px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white transition-colors"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>

        {/* Filter Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 border rounded-xl font-medium transition-colors flex items-center gap-2 ${
            showFilters || hasActiveFilters
              ? 'bg-primary-600 text-white border-primary-600'
              : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
          }`}
        >
          <Filter className="w-5 h-5" />
          Filters
          {hasActiveFilters && (
            <span className="bg-white text-primary-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              !
            </span>
          )}
        </motion.button>
      </div>

      {/* Advanced Filters */}
      <motion.div
        initial={false}
        animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {showFilters && (
          <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-6 shadow-sm">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Category
              </label>
              <div className="flex gap-2 flex-wrap">
                {(['all', 'vegetarian', 'non-vegetarian'] as FilterOption[]).map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                      state.filters.category === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {category === 'all'
                      ? 'All'
                      : category === 'vegetarian'
                      ? 'Vegetarian'
                      : 'Non-Vegetarian'}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Max Price: ${state.filters.maxPrice?.toFixed(2) || maxPrice.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max={maxPrice}
                step="0.5"
                value={state.filters.maxPrice || maxPrice}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Ingredient Filter */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Filter by Ingredient
              </label>
              <select
                value={state.filters.ingredient || ''}
                onChange={(e) => handleIngredientChange(e.target.value || null)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white transition-colors"
              >
                <option value="">All Ingredients</option>
                {allIngredients.map((ingredient) => (
                  <option key={ingredient} value={ingredient}>
                    {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="flex items-center gap-2 text-error-600 hover:text-error-700 font-medium"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </motion.button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

