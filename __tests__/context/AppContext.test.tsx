import { renderHook, act } from '@testing-library/react'
import { AppProvider, useApp } from '@/context/AppContext'
import { Pizza } from '@/types'
import React from 'react'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
)

const mockPizza: Pizza = {
  id: '1',
  name: 'Margherita',
  price: 5,
  ingredients: ['tomato', 'mozzarella'],
  category: 'vegetarian',
}

describe('AppContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('provides initial state', () => {
    const { result } = renderHook(() => useApp(), { wrapper })

    expect(result.current.state.pizzas).toEqual([])
    expect(result.current.state.currentOrder).toEqual([])
    expect(result.current.state.orders).toEqual([])
  })

  it('adds pizza to order', () => {
    const { result } = renderHook(() => useApp(), { wrapper })

    act(() => {
      result.current.dispatch({
        type: 'ADD_PIZZA_TO_ORDER',
        payload: { pizza: mockPizza, quantity: 2 },
      })
    })

    expect(result.current.state.currentOrder).toHaveLength(1)
    expect(result.current.state.currentOrder[0].pizza.id).toBe('1')
    expect(result.current.state.currentOrder[0].quantity).toBe(2)
  })

  it('merges same pizza when adding to order', () => {
    const { result } = renderHook(() => useApp(), { wrapper })

    act(() => {
      result.current.dispatch({
        type: 'ADD_PIZZA_TO_ORDER',
        payload: { pizza: mockPizza, quantity: 1 },
      })
    })

    act(() => {
      result.current.dispatch({
        type: 'ADD_PIZZA_TO_ORDER',
        payload: { pizza: mockPizza, quantity: 2 },
      })
    })

    expect(result.current.state.currentOrder).toHaveLength(1)
    expect(result.current.state.currentOrder[0].quantity).toBe(3)
  })

  it('applies discount for 3 or more pizzas', () => {
    const { result } = renderHook(() => useApp(), { wrapper })

    act(() => {
      result.current.dispatch({
        type: 'ADD_PIZZA_TO_ORDER',
        payload: { pizza: mockPizza, quantity: 3 },
      })
    })

    const orderItem = result.current.state.currentOrder[0]
    expect(orderItem.discount).toBeGreaterThan(0)
    expect(orderItem.discountedPrice).toBeLessThan(orderItem.originalPrice)
  })

  it('removes pizza from order', () => {
    const { result } = renderHook(() => useApp(), { wrapper })

    act(() => {
      result.current.dispatch({
        type: 'ADD_PIZZA_TO_ORDER',
        payload: { pizza: mockPizza, quantity: 1 },
      })
    })

    act(() => {
      result.current.dispatch({
        type: 'REMOVE_PIZZA_FROM_ORDER',
        payload: '1',
      })
    })

    expect(result.current.state.currentOrder).toHaveLength(0)
  })

  it('clears current order', () => {
    const { result } = renderHook(() => useApp(), { wrapper })

    act(() => {
      result.current.dispatch({
        type: 'ADD_PIZZA_TO_ORDER',
        payload: { pizza: mockPizza, quantity: 1 },
      })
    })

    act(() => {
      result.current.dispatch({ type: 'CLEAR_CURRENT_ORDER' })
    })

    expect(result.current.state.currentOrder).toHaveLength(0)
  })

  it('adds new pizza to menu', () => {
    const { result } = renderHook(() => useApp(), { wrapper })

    act(() => {
      result.current.dispatch({
        type: 'LOAD_PIZZAS',
        payload: [mockPizza],
      })
    })

    const newPizza: Pizza = {
      id: '2',
      name: 'Pepperoni',
      price: 7,
      ingredients: ['pepperoni', 'cheese'],
      category: 'non-vegetarian',
    }

    act(() => {
      result.current.dispatch({
        type: 'ADD_NEW_PIZZA',
        payload: newPizza,
      })
    })

    expect(result.current.state.pizzas).toHaveLength(2)
    expect(result.current.state.pizzas[1].id).toBe('2')
  })
})

