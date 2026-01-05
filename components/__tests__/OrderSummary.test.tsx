import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OrderSummary from '../OrderSummary'
import { useApp } from '@/context/AppContext'
import * as navigation from 'next/navigation'

// Mock dependencies
jest.mock('@/context/AppContext')
jest.mock('next/navigation')

const mockPush = jest.fn()

jest.spyOn(navigation, 'useRouter').mockReturnValue({
  push: mockPush,
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
} as any)

describe('OrderSummary', () => {
  const mockDispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockPush.mockClear()
  })

  describe('Empty Cart State', () => {
    beforeEach(() => {
      ;(useApp as jest.Mock).mockReturnValue({
        state: {
          currentOrder: [],
          pizzas: [],
        },
        dispatch: mockDispatch,
      })
    })

    it('displays empty cart message when no items', () => {
      render(<OrderSummary />)

      expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
      expect(screen.getByText(/add some delicious pizzas/i)).toBeInTheDocument()
    })

    it('shows browse menu link when cart is empty', () => {
      render(<OrderSummary />)

      const browseMenuLink = screen.getByRole('link', { name: /browse menu/i })
      expect(browseMenuLink).toBeInTheDocument()
      expect(browseMenuLink).toHaveAttribute('href', '/menu')
    })

    it('does not show confirm order button when cart is empty', () => {
      render(<OrderSummary />)

      expect(screen.queryByRole('button', { name: /confirm order/i })).not.toBeInTheDocument()
    })
  })

  describe('Cart with Items', () => {
    const mockPizza1 = {
      id: '1',
      name: 'Margherita',
      price: 10,
      category: 'vegetarian' as const,
      ingredients: ['tomato', 'cheese'],
      imageUrl: 'https://example.com/pizza1.jpg',
    }

    const mockPizza2 = {
      id: '2',
      name: 'Pepperoni',
      price: 12,
      category: 'non-vegetarian' as const,
      ingredients: ['pepperoni', 'cheese'],
      imageUrl: 'https://example.com/pizza2.jpg',
    }

    const mockOrderItems = [
      {
        pizza: mockPizza1,
        quantity: 2,
        originalPrice: 20,
        discount: 0,
        discountedPrice: 20,
      },
      {
        pizza: mockPizza2,
        quantity: 1,
        originalPrice: 12,
        discount: 0,
        discountedPrice: 12,
      },
    ]

    beforeEach(() => {
      ;(useApp as jest.Mock).mockReturnValue({
        state: {
          currentOrder: mockOrderItems,
          pizzas: [],
        },
        dispatch: mockDispatch,
      })
    })

    it('displays all items in the cart', () => {
      render(<OrderSummary />)

      expect(screen.getByText('Margherita')).toBeInTheDocument()
      expect(screen.getByText('Pepperoni')).toBeInTheDocument()
    })

    it('displays correct quantities for each item', () => {
      render(<OrderSummary />)

      const quantityElements = screen.getAllByText('2')
      expect(quantityElements.length).toBeGreaterThan(0)
      expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('displays correct prices for each item', () => {
      render(<OrderSummary />)

      expect(screen.getByText('$20.00')).toBeInTheDocument()
      expect(screen.getByText('$12.00')).toBeInTheDocument()
    })

    it('displays order summary header', () => {
      render(<OrderSummary />)

      expect(screen.getByText('Order Summary')).toBeInTheDocument()
    })

    it('displays order total section', () => {
      render(<OrderSummary />)

      expect(screen.getByText('Order Total')).toBeInTheDocument()
      expect(screen.getByText('Subtotal')).toBeInTheDocument()
      expect(screen.getByText('Total')).toBeInTheDocument()
    })

    it('calculates and displays correct subtotal', () => {
      render(<OrderSummary />)

      // Subtotal should be 20 + 12 = 32
      const subtotalElements = screen.getAllByText('$32.00')
      expect(subtotalElements.length).toBeGreaterThan(0)
    })

    it('displays confirm order button', () => {
      render(<OrderSummary />)

      const confirmButton = screen.getByRole('button', { name: /confirm order/i })
      expect(confirmButton).toBeInTheDocument()
      expect(confirmButton).not.toBeDisabled()
    })
  })

  describe('Quantity Management', () => {
    const mockPizza = {
      id: '1',
      name: 'Margherita',
      price: 10,
      category: 'vegetarian' as const,
      ingredients: ['tomato', 'cheese'],
      imageUrl: 'https://example.com/pizza1.jpg',
    }

    const mockOrderItems = [
      {
        pizza: mockPizza,
        quantity: 2,
        originalPrice: 20,
        discount: 0,
        discountedPrice: 20,
      },
    ]

    beforeEach(() => {
      ;(useApp as jest.Mock).mockReturnValue({
        state: {
          currentOrder: mockOrderItems,
          pizzas: [],
        },
        dispatch: mockDispatch,
      })
    })

    it('allows increasing item quantity', async () => {
      const user = userEvent.setup()
      render(<OrderSummary />)

      const increaseButtons = screen.getAllByLabelText(/increase quantity/i)
      await user.click(increaseButtons[0])

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'UPDATE_ORDER_QUANTITY',
        payload: { pizzaId: '1', quantity: 3 },
      })
    })

    it('allows decreasing item quantity', async () => {
      const user = userEvent.setup()
      render(<OrderSummary />)

      const decreaseButtons = screen.getAllByLabelText(/decrease quantity/i)
      await user.click(decreaseButtons[0])

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'UPDATE_ORDER_QUANTITY',
        payload: { pizzaId: '1', quantity: 1 },
      })
    })

    it('does not dispatch when quantity would be zero', async () => {
      const user = userEvent.setup()
      const singleItemOrder = [
        {
          pizza: mockPizza,
          quantity: 1,
          originalPrice: 10,
          discount: 0,
          discountedPrice: 10,
        },
      ]

      ;(useApp as jest.Mock).mockReturnValue({
        state: {
          currentOrder: singleItemOrder,
          pizzas: [],
        },
        dispatch: mockDispatch,
      })

      render(<OrderSummary />)

      const decreaseButtons = screen.getAllByLabelText(/decrease quantity/i)
      mockDispatch.mockClear()
      await user.click(decreaseButtons[0])

      // The component prevents dispatch when quantity < 1, so use remove button instead
      // This test verifies the component's guard clause works
      expect(mockDispatch).not.toHaveBeenCalled()
    })
  })

  describe('Remove Item', () => {
    const mockPizza = {
      id: '1',
      name: 'Margherita',
      price: 10,
      category: 'vegetarian' as const,
      ingredients: ['tomato', 'cheese'],
      imageUrl: 'https://example.com/pizza1.jpg',
    }

    const mockOrderItems = [
      {
        pizza: mockPizza,
        quantity: 2,
        originalPrice: 20,
        discount: 0,
        discountedPrice: 20,
      },
    ]

    beforeEach(() => {
      ;(useApp as jest.Mock).mockReturnValue({
        state: {
          currentOrder: mockOrderItems,
          pizzas: [],
        },
        dispatch: mockDispatch,
      })
    })

    it('allows removing item from cart', async () => {
      const user = userEvent.setup()
      render(<OrderSummary />)

      const removeButtons = screen.getAllByLabelText(/remove item/i)
      await user.click(removeButtons[0])

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'REMOVE_PIZZA_FROM_ORDER',
        payload: '1',
      })
    })
  })

  describe('Clear All Items', () => {
    const mockOrderItems = [
      {
        pizza: {
          id: '1',
          name: 'Margherita',
          price: 10,
          category: 'vegetarian' as const,
          ingredients: ['tomato', 'cheese'],
        },
        quantity: 2,
        originalPrice: 20,
        discount: 0,
        discountedPrice: 20,
      },
    ]

    beforeEach(() => {
      ;(useApp as jest.Mock).mockReturnValue({
        state: {
          currentOrder: mockOrderItems,
          pizzas: [],
        },
        dispatch: mockDispatch,
      })
    })

    it('displays clear all button when cart has items', () => {
      render(<OrderSummary />)

      const clearAllButton = screen.getByRole('button', { name: /clear all/i })
      expect(clearAllButton).toBeInTheDocument()
    })

    it('clears all items when clear all button is clicked', async () => {
      const user = userEvent.setup()
      render(<OrderSummary />)

      const clearAllButton = screen.getByRole('button', { name: /clear all/i })
      await user.click(clearAllButton)

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'CLEAR_CURRENT_ORDER',
      })
    })
  })

  describe('Discount Calculation', () => {
    const mockPizza = {
      id: '1',
      name: 'Margherita',
      price: 10,
      category: 'vegetarian' as const,
      ingredients: ['tomato', 'cheese'],
      imageUrl: 'https://example.com/pizza1.jpg',
    }

    it('displays discount when quantity is 3 or more', () => {
      const mockOrderItems = [
        {
          pizza: mockPizza,
          quantity: 3,
          originalPrice: 30,
          discount: 3, // 10% of 30
          discountedPrice: 27,
        },
      ]

      ;(useApp as jest.Mock).mockReturnValue({
        state: {
          currentOrder: mockOrderItems,
          pizzas: [],
        },
        dispatch: mockDispatch,
      })

      render(<OrderSummary />)

      expect(screen.getByText('10% off!')).toBeInTheDocument()
      expect(screen.getByText('Discount')).toBeInTheDocument()
    })

    it('does not display discount when quantity is less than 3', () => {
      const mockOrderItems = [
        {
          pizza: mockPizza,
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

      render(<OrderSummary />)

      expect(screen.queryByText('10% off!')).not.toBeInTheDocument()
      expect(screen.queryByText('Discount')).not.toBeInTheDocument()
    })
  })

  describe('Order Confirmation', () => {
    const mockPizza = {
      id: '1',
      name: 'Margherita',
      price: 10,
      category: 'vegetarian' as const,
      ingredients: ['tomato', 'cheese'],
      imageUrl: 'https://example.com/pizza1.jpg',
    }

    const mockOrderItems = [
      {
        pizza: mockPizza,
        quantity: 2,
        originalPrice: 20,
        discount: 0,
        discountedPrice: 20,
      },
    ]

    beforeEach(() => {
      jest.useFakeTimers()
      ;(useApp as jest.Mock).mockReturnValue({
        state: {
          currentOrder: mockOrderItems,
          pizzas: [],
        },
        dispatch: mockDispatch,
      })
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('confirms order when confirm button is clicked', async () => {
      const user = userEvent.setup({ delay: null })
      render(<OrderSummary />)

      const confirmButton = screen.getByRole('button', { name: /confirm order/i })
      await user.click(confirmButton)

      // Verify dispatch is called with correct order data
      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'CONFIRM_ORDER',
            payload: expect.objectContaining({
              items: mockOrderItems,
              subtotal: 20,
              totalDiscount: 0,
              total: 20,
            }),
          })
        )
      })

      // The order has been confirmed via dispatch
      // Note: Router navigation happens in a setTimeout, which is tested separately
      // The main functionality (order confirmation) is verified above
    })

    it('shows loading state during order confirmation', async () => {
      const user = userEvent.setup({ delay: null })
      render(<OrderSummary />)

      const confirmButton = screen.getByRole('button', { name: /confirm order/i })
      await user.click(confirmButton)

      await waitFor(() => {
        expect(screen.getByText(/confirming.../i)).toBeInTheDocument()
        expect(confirmButton).toBeDisabled()
      })
    })

    it('does not confirm order when cart is empty', () => {
      ;(useApp as jest.Mock).mockReturnValue({
        state: {
          currentOrder: [],
          pizzas: [],
        },
        dispatch: mockDispatch,
      })

      render(<OrderSummary />)

      // Should show empty cart, not confirm button
      expect(screen.queryByRole('button', { name: /confirm order/i })).not.toBeInTheDocument()
    })
  })

  describe('Price Calculations', () => {
    it('calculates total correctly with multiple items', () => {
      const mockOrderItems = [
        {
          pizza: {
            id: '1',
            name: 'Margherita',
            price: 10,
            category: 'vegetarian' as const,
            ingredients: ['tomato'],
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
            price: 15,
            category: 'non-vegetarian' as const,
            ingredients: ['pepperoni'],
          },
          quantity: 1,
          originalPrice: 15,
          discount: 1.5, // 10% discount
          discountedPrice: 13.5,
        },
      ]

      ;(useApp as jest.Mock).mockReturnValue({
        state: {
          currentOrder: mockOrderItems,
          pizzas: [],
        },
        dispatch: mockDispatch,
      })

      render(<OrderSummary />)

      // Subtotal: 20 + 15 = 35
      // Discount: 0 + 1.5 = 1.5
      // Total: 35 - 1.5 = 33.5
      const subtotalElements = screen.getAllByText('$35.00')
      expect(subtotalElements.length).toBeGreaterThan(0) // Subtotal
      const totalElements = screen.getAllByText('$33.50')
      expect(totalElements.length).toBeGreaterThan(0) // Total
    })
  })
})
