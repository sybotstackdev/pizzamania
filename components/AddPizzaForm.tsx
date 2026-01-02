'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { useApp } from '@/context/AppContext'

interface FormErrors {
  name?: string
  price?: string
  ingredients?: string
}

export default function AddPizzaForm() {
  const router = useRouter()
  const { dispatch } = useApp()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [ingredients, setIngredients] = useState<string[]>([''])
  const [category, setCategory] = useState<'vegetarian' | 'non-vegetarian'>('vegetarian')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addIngredientField = () => {
    setIngredients([...ingredients, ''])
  }

  const removeIngredientField = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index))
    }
  }

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Pizza name is required'
    } else if (name.trim().length < 2) {
      newErrors.name = 'Pizza name must be at least 2 characters'
    }

    // Validate price
    const priceNum = parseFloat(price)
    if (isNaN(priceNum) || priceNum <= 0) {
      newErrors.price = 'Price must be a positive number'
    }

    // Validate ingredients
    const filteredIngredients = ingredients.filter((ing) => ing.trim() !== '')
    if (filteredIngredients.length === 0) {
      newErrors.ingredients = 'At least one ingredient is required'
    } else if (filteredIngredients.some((ing) => ing.trim().length < 2)) {
      newErrors.ingredients = 'Each ingredient must be at least 2 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    const newPizza = {
      id: Date.now().toString(),
      name: name.trim(),
      price: parseFloat(price),
      ingredients: ingredients.filter((ing) => ing.trim() !== ''),
      category,
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop',
      description: description.trim() || undefined,
    }

    dispatch({ type: 'ADD_NEW_PIZZA', payload: newPizza })

    setTimeout(() => {
      setName('')
      setPrice('')
      setIngredients([''])
      setCategory('vegetarian')
      setDescription('')
      setErrors({})

      setIsSubmitting(false)

      router.push('/menu')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-primary-600 to-primary-700">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=1200&h=1600&fit=crop')" }}
        ></div>
        <div className="relative z-10 h-full flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-center"
          >
            <Plus className="w-24 h-24 mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-bold mb-4 uppercase">Create Your Pizza</h2>
            <p className="text-xl text-primary-100 leading-relaxed max-w-md">
              Share your favorite pizza recipe with the community
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form Content */}
      <div className="w-full lg:w-1/2 bg-neutral-50">
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-12 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Button */}
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Menu</span>
            </Link>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-neutral-200">
              <div className="mb-8">
                <p className="text-primary-600 text-2xl font-serif italic mb-2">Create Your Own</p>
                <h1 className="text-4xl font-bold text-neutral-900 mb-2 uppercase tracking-wide">Add New Pizza</h1>
                <p className="text-neutral-600">Create a new pizza for the menu</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Pizza Name <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (errors.name) setErrors({ ...errors, name: undefined })
                    }}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors ${
                      errors.name ? 'border-error-500' : 'border-neutral-300'
                    }`}
                    placeholder="e.g., Margherita"
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-error-600"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Price Field */}
                <div>
                  <label htmlFor="price" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Price (USD) <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value)
                      if (errors.price) setErrors({ ...errors, price: undefined })
                    }}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors ${
                      errors.price ? 'border-error-500' : 'border-neutral-300'
                    }`}
                    placeholder="e.g., 5.99"
                  />
                  {errors.price && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-error-600"
                    >
                      {errors.price}
                    </motion.p>
                  )}
                </div>

                {/* Category Field */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Category <span className="text-error-600">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value="vegetarian"
                        checked={category === 'vegetarian'}
                        onChange={(e) => setCategory(e.target.value as 'vegetarian' | 'non-vegetarian')}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                          category === 'vegetarian'
                            ? 'bg-primary-600 border-primary-600'
                            : 'bg-white border-neutral-300 hover:border-primary-400'
                        }`}
                      >
                        {category === 'vegetarian' && (
                          <div className="w-3 h-3 bg-white rounded-sm"></div>
                        )}
                      </div>
                      <span className="text-neutral-700">Vegetarian</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value="non-vegetarian"
                        checked={category === 'non-vegetarian'}
                        onChange={(e) => setCategory(e.target.value as 'vegetarian' | 'non-vegetarian')}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                          category === 'non-vegetarian'
                            ? 'bg-primary-600 border-primary-600'
                            : 'bg-white border-neutral-300 hover:border-primary-400'
                        }`}
                      >
                        {category === 'non-vegetarian' && (
                          <div className="w-3 h-3 bg-white rounded-sm"></div>
                        )}
                      </div>
                      <span className="text-neutral-700">Non-Vegetarian</span>
                    </label>
                  </div>
                </div>

                {/* Ingredients Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-neutral-700">
                      Ingredients <span className="text-error-500">*</span>
                    </label>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addIngredientField}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Ingredient
                    </motion.button>
                  </div>
                  <div className="space-y-2">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={ingredient}
                          onChange={(e) => updateIngredient(index, e.target.value)}
                          className="flex-1 px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
                          placeholder={`Ingredient ${index + 1}`}
                        />
                        {ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeIngredientField(index)}
                            className="px-4 py-3 border border-error-300 text-error-600 rounded-xl hover:bg-error-50 transition-colors"
                            aria-label="Remove ingredient"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {errors.ingredients && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-error-600"
                    >
                      {errors.ingredients}
                    </motion.p>
                  )}
                </div>

                {/* Description Field */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none transition-colors"
                    placeholder="Describe the pizza..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-bold uppercase text-sm hover:bg-primary-700 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-6 h-6" />
                      Add Pizza to Menu
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
