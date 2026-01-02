'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingCart, Pizza, Plus, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const { state } = useApp()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const itemCount = state.currentOrder.reduce((sum, item) => sum + item.quantity, 0)

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/menu', label: 'MENU' },
    { href: '/cart', label: 'CART' },
    { href: '/add-pizza', label: 'ADD PIZZA' },
  ]

  return (
    <>

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white shadow-md sticky top-0 z-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Pizza className="w-10 h-10 text-primary-600" />
              </motion.div>
              <div>
                <span className="text-3xl font-serif text-primary-600 italic">Piza</span>
                <span className="text-xl font-bold text-neutral-900 block">Vibe</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 font-semibold text-sm uppercase tracking-wide transition-colors"
                  >
                    <span className={isActive ? 'text-primary-600' : 'text-neutral-700 hover:text-primary-600'}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Cart Button */}
            <motion.div
              initial={false}
              animate={{ scale: itemCount > 0 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Link
                href="/cart"
                className="flex items-center justify-center bg-primary-600 text-white px-3 py-2 rounded-lg font-semibold text-sm hover:bg-primary-700 transition-colors shadow-md relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-neutral-700"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-neutral-700"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-neutral-700"
                />
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-neutral-700"
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-neutral-200 py-4"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 font-semibold uppercase text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </motion.nav>
    </>
  )
}
