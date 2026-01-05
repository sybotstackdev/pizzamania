import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartPage from '../CartPage'
import { useApp } from '@/context/AppContext'
import * as navigation from 'next/navigation'

// Mock dependencies
jest.mock('@/context/AppContext')
jest.mock('next/navigation')
jest.mock('../Footer', () => {
  return function Footer() {
    return <footer>Footer</footer>
  }
})
jest.mock('../OrderSummary', () => {
  return function OrderSummary() {
    return <div>Order Summary</div>
  }
})
jest.mock('../SuggestedItems', () => {
  return function SuggestedItems() {
    return <div>Suggested Items</div>
  }
})

const mockPush = jest.fn()

jest.spyOn(navigation, 'useRouter').mockReturnValue({
  push: mockPush,
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
} as any)

describe('CartPage', () => {
  const mockDispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useApp as jest.Mock).mockReturnValue({
      state: {
        currentOrder: [],
        pizzas: [],
      },
      dispatch: mockDispatch,
    })
  })

  describe('Rendering', () => {
    it('renders cart page with header', () => {
      render(<CartPage />)

      expect(screen.getByText('Your Cart')).toBeInTheDocument()
      expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    })

    it('renders continue shopping link', () => {
      render(<CartPage />)

      const continueShoppingLink = screen.getByRole('link', { name: /continue shopping/i })
      expect(continueShoppingLink).toBeInTheDocument()
      expect(continueShoppingLink).toHaveAttribute('href', '/menu')
    })

    it('displays correct item count when cart has items', () => {
      const mockOrderItems = [
        {
          pizza: {
            id: '1',
            name: 'Margherita',
            price: 10,
            category: 'vegetarian',
            ingredients: ['tomato', 'cheese'],
          },
          quantity: 2,
          originalPrice: 20,
          discount: 0,
          discountedPrice: 20,
        },
        {
          pizza: {
            id: '2',
            name: 'Pepperoni',
            price: 12,
            category: 'non-vegetarian',
            ingredients: ['pepperoni', 'cheese'],
          },
          quantity: 1,
          originalPrice: 12,
          discount: 0,
          discountedPrice: 12,
        },
      ]

      ;(useApp as jest.Mock).mockReturnValue({
        state: {
          currentOrder: mockOrderItems,
          pizzas: [],
        },
        dispatch: mockDispatch,
      })

      render(<CartPage />)

      expect(screen.getByText('3 items in your cart')).toBeInTheDocument()
    })

    it('displays singular item text when cart has one item', () => {
      const mockOrderItems = [
        {
          pizza: {
            id: '1',
            name: 'Margherita',
            price: 10,
            category: 'vegetarian',
            ingredients: ['tomato', 'cheese'],
          },
          quantity: 1,
          originalPrice: 10,
          discount: 0,
          discountedPrice: 10,
        },
      ]

      ;(useApp as jest.Mock).mockReturnValue({
        state: {
          currentOrder: mockOrderItems,
          pizzas: [],
        },
        dispatch: mockDispatch,
      })

      render(<CartPage />)

      expect(screen.getByText('1 item in your cart')).toBeInTheDocument()
    })
  })

  describe('Empty Cart State', () => {
    it('shows empty cart message when no items', () => {
      render(<CartPage />)

      expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    })

    it('does not show suggested items when cart is empty', () => {
      render(<CartPage />)

      expect(screen.queryByText('Suggested Items')).not.toBeInTheDocument()
    })
  })

  describe('Cart with Items', () => {
    beforeEach(() => {
      const mockOrderItems = [
        {
          pizza: {
            id: '1',
            name: 'Margherita',
            price: 10,
            category: 'vegetarian',
            ingredients: ['tomato', 'cheese'],
          },
          quantity: 2,
          originalPrice: 20,
          discount: 0,
          discountedPrice: 20,
        },
      ]

      ;(useApp as jest.Mock).mockReturnValue({
        state: {
          currentOrder: mockOrderItems,
          pizzas: [],
        },
        dispatch: mockDispatch,
      })
    })

    it('renders OrderSummary component when cart has items', () => {
      render(<CartPage />)

      expect(screen.getByText('Order Summary')).toBeInTheDocument()
    })

    it('shows suggested items when cart has items', () => {
      render(<CartPage />)

      expect(screen.getByText('Suggested Items')).toBeInTheDocument()
    })
  })
})

