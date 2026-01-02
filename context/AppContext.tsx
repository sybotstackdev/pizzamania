'use client'

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'
import { Pizza, OrderItem, Order, PizzaFilters, SortOption } from '@/types'
import pizzasData from '@/data/pizzas.json'

interface AppState {
  pizzas: Pizza[]
  currentOrder: OrderItem[]
  orders: Order[]
  filters: PizzaFilters
  sortOption: SortOption
}

type AppAction =
  | { type: 'LOAD_PIZZAS'; payload: Pizza[] }
  | { type: 'ADD_PIZZA_TO_ORDER'; payload: { pizza: Pizza; quantity: number } }
  | { type: 'REMOVE_PIZZA_FROM_ORDER'; payload: string }
  | { type: 'UPDATE_ORDER_QUANTITY'; payload: { pizzaId: string; quantity: number } }
  | { type: 'CLEAR_CURRENT_ORDER' }
  | { type: 'CONFIRM_ORDER'; payload: Order }
  | { type: 'ADD_NEW_PIZZA'; payload: Pizza }
  | { type: 'SET_FILTERS'; payload: PizzaFilters }
  | { type: 'SET_SORT_OPTION'; payload: SortOption }
  | { type: 'LOAD_ORDERS'; payload: Order[] }

interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const initialState: AppState = {
  pizzas: [],
  currentOrder: [],
  orders: [],
  filters: {
    search: '',
    category: 'all',
    maxPrice: null,
    ingredient: null,
  },
  sortOption: 'name-asc',
}

function calculateDiscount(quantity: number, price: number): number {
  if (quantity >= 3) {
    return price * quantity * 0.1 // 10% discount
  }
  return 0
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOAD_PIZZAS':
      return { ...state, pizzas: action.payload }

    case 'ADD_PIZZA_TO_ORDER': {
      const { pizza, quantity } = action.payload
      const existingItemIndex = state.currentOrder.findIndex(
        (item) => item.pizza.id === pizza.id
      )

      let newOrder: OrderItem[]
      if (existingItemIndex >= 0) {
        newOrder = [...state.currentOrder]
        const newQuantity = newOrder[existingItemIndex].quantity + quantity
        const originalPrice = pizza.price * newQuantity
        const discount = calculateDiscount(newQuantity, pizza.price)
        newOrder[existingItemIndex] = {
          ...newOrder[existingItemIndex],
          quantity: newQuantity,
          originalPrice,
          discount,
          discountedPrice: originalPrice - discount,
        }
      } else {
        const originalPrice = pizza.price * quantity
        const discount = calculateDiscount(quantity, pizza.price)
        newOrder = [
          ...state.currentOrder,
          {
            pizza,
            quantity,
            originalPrice,
            discount,
            discountedPrice: originalPrice - discount,
          },
        ]
      }

      return { ...state, currentOrder: newOrder }
    }

    case 'REMOVE_PIZZA_FROM_ORDER': {
      return {
        ...state,
        currentOrder: state.currentOrder.filter((item) => item.pizza.id !== action.payload),
      }
    }

    case 'UPDATE_ORDER_QUANTITY': {
      const { pizzaId, quantity } = action.payload
      if (quantity <= 0) {
        return {
          ...state,
          currentOrder: state.currentOrder.filter((item) => item.pizza.id !== pizzaId),
        }
      }

      return {
        ...state,
        currentOrder: state.currentOrder.map((item) => {
          if (item.pizza.id === pizzaId) {
            const originalPrice = item.pizza.price * quantity
            const discount = calculateDiscount(quantity, item.pizza.price)
            return {
              ...item,
              quantity,
              originalPrice,
              discount,
              discountedPrice: originalPrice - discount,
            }
          }
          return item
        }),
      }
    }

    case 'CLEAR_CURRENT_ORDER':
      return { ...state, currentOrder: [] }

    case 'CONFIRM_ORDER': {
      const newOrders = [...state.orders, action.payload]
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('orders', JSON.stringify(newOrders))
      }
      return { ...state, orders: newOrders, currentOrder: [] }
    }

    case 'ADD_NEW_PIZZA': {
      const newPizzas = [...state.pizzas, action.payload]
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('pizzas', JSON.stringify(newPizzas))
      }
      return { ...state, pizzas: newPizzas }
    }

    case 'SET_FILTERS':
      return { ...state, filters: action.payload }

    case 'SET_SORT_OPTION':
      return { ...state, sortOption: action.payload }

    case 'LOAD_ORDERS':
      return { ...state, orders: action.payload }

    default:
      return state
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    // Load pizzas from JSON file
    dispatch({ type: 'LOAD_PIZZAS', payload: pizzasData as Pizza[] })

    // Load orders from localStorage
    if (typeof window !== 'undefined') {
      const savedOrders = localStorage.getItem('orders')
      if (savedOrders) {
        try {
          dispatch({ type: 'LOAD_ORDERS', payload: JSON.parse(savedOrders) })
        } catch (error) {
          console.error('Failed to load orders from localStorage:', error)
        }
      }
    }
  }, [])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

