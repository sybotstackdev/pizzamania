'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const informationLinks = ['Home', 'Blog', 'About Us', 'Menu', 'Contact Us']
  const topItems = ['Pepperoni', 'Swiss Mushroom', 'Barbecue Chicken', 'Vegetarian', 'Ham & Cheese']
  const otherLinks = ['Checkout', 'Cart', 'Product', 'Account', 'Legal']

  return (
    <footer className="bg-neutral-100 text-neutral-700">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 max-w-7xl mx-auto">
          <Link href="/" className="inline-block mb-8">
            <Logo size="lg" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 max-w-7xl mx-auto">
          {/* INFORMATION Column */}
          <div>
            <h3 className="text-neutral-900 text-lg font-bold mb-6 uppercase tracking-wide">
              INFORMATION
            </h3>
            <ul className="space-y-3">
              {informationLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-neutral-600 hover:text-primary-600 transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* TOP ITEMS Column */}
          <div>
            <h3 className="text-neutral-900 text-lg font-bold mb-6 uppercase tracking-wide">
              TOP ITEMS
            </h3>
            <ul className="space-y-3">
              {topItems.map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-neutral-600 hover:text-primary-600 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* OTHERS Column */}
          <div>
            <h3 className="text-neutral-900 text-lg font-bold mb-6 uppercase tracking-wide">
              OTHERS
            </h3>
            <ul className="space-y-3">
              {otherLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-neutral-600 hover:text-primary-600 transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL MEDIA Column */}
          <div>
            <h3 className="text-neutral-900 text-lg font-bold mb-6 uppercase tracking-wide">
              SOCIAL MEDIA
            </h3>
            <div className="flex gap-4 mb-6">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
              ].map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-neutral-200 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-neutral-700 hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
            <p className="text-neutral-600 text-sm mb-4">
              Sign up and get exclusive offers and coupon codes.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 hover:bg-yellow-500 text-neutral-900 px-6 py-3 rounded-lg font-bold uppercase text-xs transition-colors shadow-md"
            >
              SIGN UP
            </motion.button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Refund Policy
              </Link>
              <Link href="/" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Terms & Conditions
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs text-neutral-500">GET IT ON</div>
              <div className="text-xs text-neutral-500">Download on the</div>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-neutral-600 text-sm">
              © {currentYear} PizzaVibe. All Right Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

