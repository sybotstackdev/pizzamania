'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingCart, Plus } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useState } from 'react'
import Logo from './Logo'

export default function Navigation() {
  const pathname = usePathname()
  const { state } = useApp()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const itemCount = state.currentOrder.reduce((sum, item) => sum + item.quantity, 0)

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/menu', label: 'ORDER' },
    { href: '/cart', label: 'CART' },
  ]

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white sticky top-0 z-50 border-b border-neutral-200 shadow-sm"
      >
        {/* Yellow Background Banner - Buy One Get One Offer */}
        <div className="bg-yellow-400 w-full py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-2">
              <motion.span 
                className="text-lg sm:text-xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                🍕
              </motion.span>
              <span className="font-bold text-xs sm:text-sm uppercase tracking-wide text-neutral-900">
                Buy One Get One <span className="text-primary-600 font-extrabold">FREE</span> - Limited Time Offer!
              </span>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href === '/menu' && pathname.startsWith('/menu'))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 font-semibold text-sm uppercase tracking-wider transition-colors"
                  >
                    <span className={isActive ? 'text-primary-600' : 'text-neutral-900 hover:text-primary-600'}>
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

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {/* Add Pizza Button */}
              <Link href="/add-pizza">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-neutral-900 px-4 py-2 rounded-lg font-bold uppercase text-xs transition-colors shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Add Pizza
                </motion.button>
              </Link>

              {/* Cart Button */}
              <motion.div
                initial={false}
                animate={{ scale: itemCount > 0 ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Link
                  href="/cart"
                  className="flex items-center justify-center text-neutral-900 hover:text-primary-600 transition-colors relative"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            </div>

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
                  className="block px-4 py-2 text-neutral-900 hover:text-primary-600 hover:bg-neutral-50 font-semibold uppercase text-sm"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/add-pizza"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-neutral-900 hover:text-primary-600 hover:bg-neutral-50 font-semibold uppercase text-sm"
              >
                Add Pizza
              </Link>
            </motion.div>
          )}
        </div>
      </motion.nav>
    </>
  )
}
