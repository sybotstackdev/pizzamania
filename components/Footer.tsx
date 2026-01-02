'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Pizza, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 max-w-7xl mx-auto">
          {/* Logo and Description */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Pizza className="w-10 h-10 text-primary-500" />
              <div>
                <span className="text-3xl font-serif text-primary-400 italic">Piza</span>
                <span className="text-2xl font-bold text-white block">Vibe</span>
              </div>
            </Link>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Serving delicious, authentic pizzas made with the freshest ingredients. 
              Experience the perfect blend of traditional recipes and modern flavors.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold uppercase text-sm hover:bg-primary-700 transition-colors shadow-md"
            >
              Sign Up
            </motion.button>
          </div>

          {/* Working Hours & Quick Links */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6 uppercase">Working Hours</h3>
            <div className="space-y-3 mb-8">
              <div className="flex justify-between">
                <span className="text-neutral-400">Mon - Fri:</span>
                <span className="text-white">10AM TO 11PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Sat - Sun:</span>
                <span className="text-white">10AM TO 1AM</span>
              </div>
            </div>

            <h3 className="text-white text-xl font-bold mb-6 uppercase mt-8">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'Features', 'Menu', 'Contact Us', 'Blog', 'FAQ'].map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6 uppercase">Contact Info</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <p className="text-neutral-400">
                  123 Pizza Street,<br />
                  Food City, FC 12345
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a href="tel:+001234567890" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  +00 123 456 7890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a href="mailto:info@pizavibe.com" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  info@pizavibe.com
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
              ].map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
            <p className="text-neutral-500 text-sm">
              © Copyright {currentYear}. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="text-neutral-500 hover:text-primary-400 transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/" className="text-neutral-500 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

