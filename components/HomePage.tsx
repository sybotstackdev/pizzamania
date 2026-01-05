'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Calendar, Clock, Users, Mail, Phone, MapPin } from 'lucide-react'
import Hero from './Hero'
import Features from './Features'
import Footer from './Footer'
import PizzaCard from './PizzaCard'
import { useApp } from '@/context/AppContext'
import { useState } from 'react'

export default function HomePage() {
  const { state } = useApp()
  const featuredPizzas = state.pizzas.slice(0, 3)
  const [reservationForm, setReservationForm] = useState({
    name: '',
    email: '',
    phone: '',
    time: '',
    date: '',
    guest: '',
  })

  const testimonials = [
    { name: 'Johan Doe', quote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', rating: 5 },
    { name: 'Alex Seanu', quote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', rating: 5 },
    { name: 'Jony Lanner', quote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', rating: 5 },
    { name: 'Takar Bowe', quote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', rating: 5 },
  ]

  const blogPosts = [
    { date: '07 May, 2022', title: 'How to keep fear from ruining your art business with confident', author: 'David Milor', location: 'London, United Kingdom' },
    { date: '07 May, 2022', title: 'How to keep fear from ruining your art business with confident', author: 'David Milor', location: 'London, United Kingdom' },
    { date: '07 May, 2022', title: 'How to keep fear from ruining your art business with confident', author: 'David Milor', location: 'London, United Kingdom' },
  ]

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Reservation submitted:', reservationForm)
  }

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Daily Fresh Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full h-96">
                <Image
                  src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=800&fit=crop"
                  alt="Daily Fresh Pizza"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                Daily fresh and always tasty
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary-600 text-lg md:text-xl font-semibold mb-2 uppercase tracking-wide">
              Popular Dishes
            </p>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
              Browse Our Menu
            </h2>
          </motion.div>

          {featuredPizzas.length > 0 && (
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPizzas.map((pizza, index) => (
                <PizzaCard key={pizza.id} pizza={pizza} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-primary-600 text-lg md:text-xl font-semibold mb-2 uppercase tracking-wide">
                Our Story
              </p>
              <div className="w-20 h-1 bg-primary-600 mx-auto mb-4"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
                PizzaVibe Has Excellent Quality Foods
              </h2>
              <p className="text-neutral-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </p>
              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-neutral-900 px-8 py-4 rounded-lg font-bold uppercase text-sm transition-colors shadow-lg"
                >
                  READ MORE
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why We Are The Best Section */}
      <Features />

      {/* Client Testimonials Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary-600 text-lg md:text-xl font-semibold mb-2 uppercase tracking-wide">
              Customer Feedback
            </p>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
              Client Testimonials
            </h2>
          </motion.div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md border border-neutral-200"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">{testimonial.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-primary-600 text-lg md:text-xl font-semibold mb-2 uppercase tracking-wide">
                Reservation
              </p>
              <div className="w-20 h-1 bg-primary-600 mx-auto mb-4"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
                Book A Table Now!
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Name <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={reservationForm.name}
                      onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Email <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={reservationForm.email}
                      onChange={(e) => setReservationForm({ ...reservationForm, email: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Phone <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={reservationForm.phone}
                      onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Time <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="time"
                      required
                      value={reservationForm.time}
                      onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Date <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={reservationForm.date}
                      onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Guest <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={reservationForm.guest}
                      onChange={(e) => setReservationForm({ ...reservationForm, guest: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-900 py-4 rounded-lg font-bold uppercase text-sm transition-colors shadow-lg"
                >
                  BOOK NOW
                </motion.button>
              </form>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative hidden lg:block"
              >
                <div className="relative w-full h-96">
                  <Image
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=800&fit=crop"
                    alt="Pizza"
                    fill
                    className="object-cover rounded-lg"
                    sizes="50vw"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary-600 text-lg md:text-xl font-semibold mb-2 uppercase tracking-wide">
              From Our Blog
            </p>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
              Our Latest News
            </h2>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-neutral-200"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop"
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-neutral-500 mb-2">{post.date}</p>
                  <h3 className="text-lg font-bold text-neutral-900 mb-4 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{post.author}</p>
                      <p className="text-xs text-neutral-500">{post.location}</p>
                    </div>
                  </div>
                  <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}

