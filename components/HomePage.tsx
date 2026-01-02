'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, UtensilsCrossed, Globe, Heart, TrendingUp } from 'lucide-react'
import Hero from './Hero'
import Features from './Features'
import Footer from './Footer'
import OffersSection from './OffersSection'
import { useApp } from '@/context/AppContext'

export default function HomePage() {
  const { state } = useApp()
  const featuredPizzas = state.pizzas.slice(0, 3)

  return (
    <>
      {/* Hero Section - Above the Fold */}
      <Hero />

      {/* Featured Pizzas Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary-600 text-2xl md:text-3xl font-serif italic mb-2">
              Fresh From The Oven
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 uppercase tracking-tight mb-4">
              Featured Pizzas
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Discover our most popular pizzas, handcrafted with love and the finest ingredients
            </p>
          </motion.div>

          {featuredPizzas.length > 0 && (
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
              {featuredPizzas.map((pizza, index) => (
                <motion.div
                  key={pizza.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-200 hover:shadow-xl transition-shadow group"
                >
                  <Link href={`/pizza/${pizza.id}`}>
                    <div className="relative h-64 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 overflow-hidden">
                      {pizza.imageUrl ? (
                        <div className="w-full h-full relative overflow-hidden">
                          <Image
                            src={pizza.imageUrl}
                            alt={pizza.name}
                            fill
                            className="object-cover transition-transform duration-500 ease-out hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 15 }}
                            transition={{ duration: 0.3 }}
                            className="text-7xl"
                          >
                            🍕
                          </motion.div>
                        </div>
                      )}
                      {pizza.category === 'vegetarian' && (
                        <span className="absolute top-4 right-4 bg-success-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                          VEG
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link href={`/pizza/${pizza.id}`}>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2 hover:text-primary-600 transition-colors uppercase tracking-wide">
                        {pizza.name}
                      </h3>
                    </Link>
                    <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                      {pizza.ingredients.map(ing => ing.charAt(0).toUpperCase() + ing.slice(1)).join(', ')}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-primary-600">
                        ${pizza.price.toFixed(2)}
                      </span>
                      <Link href={`/pizza/${pizza.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold uppercase text-xs hover:bg-primary-700 transition-colors flex items-center gap-1.5 shadow-md"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center max-w-6xl mx-auto"
          >
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-bold uppercase text-sm hover:bg-primary-700 transition-colors shadow-md inline-flex items-center gap-2"
              >
                View Full Menu
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: TrendingUp, number: '1000+', label: 'Happy Customers' },
              { icon: UtensilsCrossed, number: '50+', label: 'Pizza Varieties' },
              { icon: Globe, number: '25+', label: 'Cities Served' },
              { icon: Heart, number: '99%', label: 'Satisfaction Rate' },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-neutral-900 mb-2">{stat.number}</h3>
                  <p className="text-neutral-600 font-medium">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Footer */}
      <Footer />
    </>
  )
}

