import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PizzaDetails from '../PizzaDetails'
import { useApp } from '@/context/AppContext'
import * as navigation from 'next/navigation'

// Mock the dependencies
jest.mock('@/context/AppContext')
jest.mock('next/navigation')
jest.mock('../Footer', () => {
  return function Footer() {
    return <footer>Footer</footer>
  }
})
jest.mock('../SuggestedItems', () => {
  const React = require('react')
  return function SuggestedItems() {
    return React.createElement('div', null, 'Suggested Items')
  }
})
jest.mock('next/image', () => {
  const React = require('react')
  return function Image({ src, alt, ...props }: any) {
    return React.createElement('img', { src, alt, ...props })
  }
})
jest.mock('next/link', () => {
  const React = require('react')
  return function Link({ children, href, ...props }: any) {
    return React.createElement('a', { href, ...props }, children)
  }
})

const mockDispatch = jest.fn()

// Mock useRouter
jest.spyOn(navigation, 'useRouter').mockReturnValue({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
} as any)

const mockPizza = {
  id: '1',
  name: 'Margherita',
  price: 12.99,
  ingredients: ['tomato', 'mozzarella', 'basil'],
  category: 'vegetarian',
  description: 'Classic Italian pizza with fresh tomatoes',
  imageUrl: 'https://example.com/pizza.jpg',
}

describe('PizzaDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useApp as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
      state: {
        pizzas: [mockPizza],
        currentOrder: [],
      },
    })
  })

  describe('Rendering', () => {
    it('renders pizza details correctly', () => {
      render(<PizzaDetails pizzaId="1" />)

      expect(screen.getByText('Margherita')).toBeInTheDocument()
      expect(screen.getByText('$12.99')).toBeInTheDocument()
      expect(screen.getByText(/classic italian pizza/i)).toBeInTheDocument()
    })

    it('displays not found message for invalid pizza id', () => {
      render(<PizzaDetails pizzaId="999" />)

      expect(screen.getByText(/pizza not found/i)).toBeInTheDocument()
    })
  })

  describe('Add to Cart with Quantity', () => {
    it('adds pizza to cart with default quantity of 1', async () => {
      const user = userEvent.setup()
      render(<PizzaDetails pizzaId="1" />)

      const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
      await user.click(addToCartButton)

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD_PIZZA_TO_ORDER',
        payload: { pizza: mockPizza, quantity: 1 },
      })
    })

    it('allows user to increase quantity before adding to cart', async () => {
      const user = userEvent.setup()
      render(<PizzaDetails pizzaId="1" />)

      // Find and click increment button
      const incrementButton = screen.getByLabelText(/increase quantity/i)
      
      await user.click(incrementButton)
      await user.click(incrementButton) // Quantity should be 3 now

      const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
      await user.click(addToCartButton)

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD_PIZZA_TO_ORDER',
        payload: { pizza: mockPizza, quantity: 3 },
      })
    })

    it('allows user to decrease quantity', async () => {
      const user = userEvent.setup()
      render(<PizzaDetails pizzaId="1" />)

      const incrementButton = screen.getByLabelText(/increase quantity/i)
      
      // Increase to 3
      await user.click(incrementButton)
      await user.click(incrementButton)
      await user.click(incrementButton)

      // Decrease back to 2
      const decrementButton = screen.getByLabelText(/decrease quantity/i)
      await user.click(decrementButton)

      const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
      await user.click(addToCartButton)

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD_PIZZA_TO_ORDER',
        payload: { pizza: mockPizza, quantity: 2 },
      })
    })

    it('does not allow quantity below 1', async () => {
      const user = userEvent.setup()
      render(<PizzaDetails pizzaId="1" />)

      const decrementButton = screen.getByLabelText(/decrease quantity/i)
      
      // Try to decrease from 1
      await user.click(decrementButton)
      await user.click(decrementButton)

      const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
      await user.click(addToCartButton)

      // Should still be quantity 1
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD_PIZZA_TO_ORDER',
        payload: { pizza: mockPizza, quantity: 1 },
      })
    })

    it('resets quantity to 1 after adding to cart', async () => {
      const user = userEvent.setup()
      render(<PizzaDetails pizzaId="1" />)

      const incrementButton = screen.getByLabelText(/increase quantity/i)
      
      await user.click(incrementButton) // Quantity = 2
      await user.click(incrementButton) // Quantity = 3

      const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
      await user.click(addToCartButton)

      // Quantity should reset to 1 after adding
      await user.click(addToCartButton)

      // Second call should be with quantity 1
      expect(mockDispatch).toHaveBeenCalledTimes(2)
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: 'ADD_PIZZA_TO_ORDER',
        payload: { pizza: mockPizza, quantity: 1 },
      })
    })
  })

  describe('Cart Status Display', () => {
    it('displays current quantity in cart when pizza is already in cart', () => {
      const orderItem = {
        pizza: mockPizza,
        quantity: 2,
        originalPrice: 25.98,
        discount: 0,
        discountedPrice: 25.98,
      }
      ;(useApp as jest.Mock).mockReturnValue({
        dispatch: mockDispatch,
        state: {
          pizzas: [mockPizza],
          currentOrder: [orderItem],
        },
      })

      render(<PizzaDetails pizzaId="1" />)

      expect(screen.getByText(/2 in your cart/i)).toBeInTheDocument()
    })

    it('displays discount message when quantity is 3 or more in cart', () => {
      const orderItem = {
        pizza: mockPizza,
        quantity: 3,
        originalPrice: 38.97,
        discount: 3.897,
        discountedPrice: 35.073,
      }
      ;(useApp as jest.Mock).mockReturnValue({
        dispatch: mockDispatch,
        state: {
          pizzas: [mockPizza],
          currentOrder: [orderItem],
        },
      })

      render(<PizzaDetails pizzaId="1" />)

      expect(screen.getByText(/10'% discount applied/i)).toBeInTheDocument()
    })
  })
})

