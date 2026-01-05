'use client'

import { useState, FormEvent, useRef, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, X, Upload } from 'lucide-react'
import Link from 'next/link'
import { useApp } from '@/context/AppContext'
import Footer from './Footer'

interface FormErrors {
  name?: string
  price?: string
  ingredients?: string
  image?: string
}

export default function AddPizzaForm() {
  const router = useRouter()
  const { dispatch } = useApp()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [ingredients, setIngredients] = useState<string[]>([''])
  const [category, setCategory] = useState<'vegetarian' | 'non-vegetarian'>('vegetarian')
  const [description, setDescription] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, image: 'Please select a valid image file' })
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: 'Image size must be less than 5MB' })
        return
      }

      setImageFile(file)
      setErrors({ ...errors, image: undefined })
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setImageFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setErrors({ ...errors, image: undefined })
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

    // Use uploaded image preview URL or fallback to default
    const imageUrl = imagePreview || 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop'

    const newPizza = {
      id: Date.now().toString(),
      name: name.trim(),
      price: parseFloat(price),
      ingredients: ingredients.filter((ing) => ing.trim() !== ''),
      category,
      imageUrl,
      description: description.trim() || undefined,
    }

    dispatch({ type: 'ADD_NEW_PIZZA', payload: newPizza })

    setTimeout(() => {
      setName('')
      setPrice('')
      setIngredients([''])
      setCategory('vegetarian')
      setDescription('')
      setImagePreview(null)
      setImageFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      setErrors({})

      setIsSubmitting(false)

      router.push('/menu')
    }, 1000)
  }

  return (
    <>
      {/* Header Section */}
      <section className="bg-white py-12 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                Add New Pizza
              </h1>
              <p className="text-neutral-600">
                Create a new pizza for the menu
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                  Pizza Name <span className="text-primary-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (errors.name) setErrors({ ...errors, name: undefined })
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all ${
                    errors.name ? 'border-error-500' : 'border-neutral-300'
                  }`}
                  placeholder="Enter pizza name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-error-600">{errors.name}</p>
                )}
              </div>

              {/* Price Field */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-neutral-700 mb-2">
                  Price (USD) <span className="text-primary-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
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
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all ${
                      errors.price ? 'border-error-500' : 'border-neutral-300'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-error-600">{errors.price}</p>
                )}
              </div>

              {/* Category Field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Category <span className="text-primary-600">*</span>
                </label>
                <div className="flex gap-4">
                  {/* Custom Radio Button - Vegetarian */}
                  <label className="relative flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value="vegetarian"
                      checked={category === 'vegetarian'}
                      onChange={(e) => setCategory(e.target.value as 'vegetarian' | 'non-vegetarian')}
                      className="sr-only"
                    />
                    <div className={`
                      flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200
                      ${category === 'vegetarian' 
                        ? 'border-primary-600 bg-primary-600' 
                        : 'border-neutral-300 bg-white group-hover:border-primary-400'
                      }
                    `}>
                      {category === 'vegetarian' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2.5 h-2.5 rounded-full bg-white"
                        />
                      )}
                    </div>
                    <span className={`ml-2 text-neutral-700 transition-colors ${
                      category === 'vegetarian' ? 'font-medium' : ''
                    }`}>
                      Vegetarian
                    </span>
                  </label>

                  {/* Custom Radio Button - Non-Vegetarian */}
                  <label className="relative flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value="non-vegetarian"
                      checked={category === 'non-vegetarian'}
                      onChange={(e) => setCategory(e.target.value as 'vegetarian' | 'non-vegetarian')}
                      className="sr-only"
                    />
                    <div className={`
                      flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200
                      ${category === 'non-vegetarian' 
                        ? 'border-primary-600 bg-primary-600' 
                        : 'border-neutral-300 bg-white group-hover:border-primary-400'
                      }
                    `}>
                      {category === 'non-vegetarian' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2.5 h-2.5 rounded-full bg-white"
                        />
                      )}
                    </div>
                    <span className={`ml-2 text-neutral-700 transition-colors ${
                      category === 'non-vegetarian' ? 'font-medium' : ''
                    }`}>
                      Non-Vegetarian
                    </span>
                  </label>
                </div>
              </div>

              {/* Image Upload Field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Pizza Image <span className="text-neutral-500 font-normal">(Optional)</span>
                </label>
                {imagePreview ? (
                  <div className="relative">
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border border-neutral-300 bg-neutral-100">
                      <img
                        src={imagePreview}
                        alt="Pizza preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-2 bg-error-600 text-white rounded-full hover:bg-error-700 transition-colors shadow-lg"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                        <Upload className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-700">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {errors.image && (
                  <p className="mt-1 text-sm text-error-600">{errors.image}</p>
                )}
              </div>

              {/* Ingredients Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    Ingredients <span className="text-primary-600">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={addIngredientField}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => updateIngredient(index, e.target.value)}
                        className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        placeholder={`Ingredient ${index + 1}`}
                      />
                      {ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredientField(index)}
                          className="px-3 py-3 text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                          aria-label="Remove ingredient"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {errors.ingredients && (
                  <p className="mt-1 text-sm text-error-600">{errors.ingredients}</p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
                  Description <span className="text-neutral-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none transition-all"
                  placeholder="Describe your pizza..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-neutral-200">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-900 py-3 rounded-lg font-semibold disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full"
                      />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Pizza
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}
