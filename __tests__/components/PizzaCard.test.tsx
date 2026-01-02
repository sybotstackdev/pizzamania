import { render, screen, fireEvent } from '@testing-library/react'
import { AppProvider } from '@/context/AppContext'
import PizzaCard from '@/components/PizzaCard'
import { Pizza } from '@/types'

const mockPizza: Pizza = {
  id: '1',
  name: 'Margherita',
  price: 5,
  ingredients: ['tomato', 'mozzarella', 'basil'],
  category: 'vegetarian',
}

const renderWithProvider = (component: React.ReactElement) => {
  return render(<AppProvider>{component}</AppProvider>)
}

describe('PizzaCard', () => {
  it('renders pizza information correctly', () => {
    renderWithProvider(<PizzaCard pizza={mockPizza} index={0} />)

    expect(screen.getByText('Margherita')).toBeInTheDocument()
    expect(screen.getByText('$5.00')).toBeInTheDocument()
    expect(screen.getByText(/tomato, mozzarella, basil/i)).toBeInTheDocument()
  })

  it('increments quantity when plus button is clicked', () => {
    renderWithProvider(<PizzaCard pizza={mockPizza} index={0} />)

    const plusButton = screen.getAllByLabelText('Increase quantity')[0]
    fireEvent.click(plusButton)

    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('decrements quantity when minus button is clicked', () => {
    renderWithProvider(<PizzaCard pizza={mockPizza} index={0} />)

    const plusButton = screen.getAllByLabelText('Increase quantity')[0]
    fireEvent.click(plusButton)
    fireEvent.click(plusButton)

    const minusButton = screen.getAllByLabelText('Decrease quantity')[0]
    fireEvent.click(minusButton)

    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('does not allow quantity below 1', () => {
    renderWithProvider(<PizzaCard pizza={mockPizza} index={0} />)

    const minusButton = screen.getAllByLabelText('Decrease quantity')[0]
    fireEvent.click(minusButton)

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('renders vegetarian badge for vegetarian pizzas', () => {
    renderWithProvider(<PizzaCard pizza={mockPizza} index={0} />)

    expect(screen.getByText('Veg')).toBeInTheDocument()
  })

  it('does not render vegetarian badge for non-vegetarian pizzas', () => {
    const nonVegPizza: Pizza = { ...mockPizza, category: 'non-vegetarian' }
    renderWithProvider(<PizzaCard pizza={nonVegPizza} index={0} />)

    expect(screen.queryByText('Veg')).not.toBeInTheDocument()
  })
})

