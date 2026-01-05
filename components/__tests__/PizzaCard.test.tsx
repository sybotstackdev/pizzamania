import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PizzaCard from '../PizzaCard'
import { useApp } from '@/context/AppContext'
import * as navigation from 'next/navigation'

// Mock the dependencies
jest.mock('@/context/AppContext')
jest.mock('next/navigation')
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
  description: 'Classic Italian pizza',
  imageUrl: 'https://example.com/pizza.jpg',
}

describe('PizzaCard', () => {
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
    it('renders pizza information correctly', () => {
      render(<PizzaCard pizza={mockPizza} index={0} />)

      expect(screen.getByText('Margherita')).toBeInTheDocument()
      expect(screen.getByText('$12.99')).toBeInTheDocument()
      expect(screen.getByText(/tomato, mozzarella, basil/i)).toBeInTheDocument()
    })

    it('renders order now button', () => {
      render(<PizzaCard pizza={mockPizza} index={0} />)

      const orderButton = screen.getByRole('button', { name: /order now/i })
      expect(orderButton).toBeInTheDocument()
    })

    it('renders vegetarian indicator for vegetarian pizza', () => {
      render(<PizzaCard pizza={mockPizza} index={0} />)

      const vegIndicator = screen.getByTitle('Vegetarian')
      expect(vegIndicator).toBeInTheDocument()
    })

    it('renders non-vegetarian indicator for non-vegetarian pizza', () => {
      const nonVegPizza = { ...mockPizza, category: 'non-vegetarian' }
      render(<PizzaCard pizza={nonVegPizza} index={0} />)

      const nonVegIndicator = screen.getByTitle('Non-Vegetarian')
      expect(nonVegIndicator).toBeInTheDocument()
    })
  })

  describe('Add to Cart Functionality', () => {
    it('dispatches ADD_PIZZA_TO_ORDER action when order now button is clicked', async () => {
      const user = userEvent.setup()
      render(<PizzaCard pizza={mockPizza} index={0} />)

      const orderButton = screen.getByRole('button', { name: /order now/i })
      await user.click(orderButton)

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD_PIZZA_TO_ORDER',
        payload: { pizza: mockPizza, quantity: 1 },
      })
    })

    it('adds pizza to cart with quantity 1', async () => {
      const user = userEvent.setup()
      render(<PizzaCard pizza={mockPizza} index={0} />)

      const orderButton = screen.getByRole('button', { name: /order now/i })
      await user.click(orderButton)

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'ADD_PIZZA_TO_ORDER',
            payload: expect.objectContaining({
              quantity: 1,
            }),
          })
        )
      })
    })

    it('can add multiple pizzas to cart by clicking multiple times', async () => {
      const user = userEvent.setup()
      render(<PizzaCard pizza={mockPizza} index={0} />)

      const orderButton = screen.getByRole('button', { name: /order now/i })
      
      await user.click(orderButton)
      await user.click(orderButton)
      await user.click(orderButton)

      expect(mockDispatch).toHaveBeenCalledTimes(3)
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD_PIZZA_TO_ORDER',
        payload: { pizza: mockPizza, quantity: 1 },
      })
    })
  })

  describe('Navigation', () => {
    it('has link to pizza details page', () => {
      render(<PizzaCard pizza={mockPizza} index={0} />)

      const links = screen.getAllByRole('link')
      const detailLink = links.find(link => link.getAttribute('href') === `/pizza/${mockPizza.id}`)
      expect(detailLink).toBeInTheDocument()
    })
  })
})

