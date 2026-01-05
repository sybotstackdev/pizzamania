// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const React = require('react')
  return {
    motion: {
      div: ({ children, whileHover, whileTap, animate, initial, transition, ...props }) => 
        React.createElement('div', props, children),
      button: ({ children, whileHover, whileTap, animate, initial, transition, ...props }) => 
        React.createElement('button', props, children),
    },
    AnimatePresence: ({ children }) => children,
  }
})

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function Link({ children, href, ...props }) {
    const React = require('react')
    return React.createElement('a', { href, ...props }, children)
  }
})

