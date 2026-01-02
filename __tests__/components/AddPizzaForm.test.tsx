import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AppProvider } from '@/context/AppContext'
import AddPizzaForm from '@/components/AddPizzaForm'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

const mockPush = jest.fn()

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  })
})

const renderWithProvider = (component: React.ReactElement) => {
  return render(<AppProvider>{component}</AppProvider>)
}

describe('AddPizzaForm', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders form fields', () => {
    renderWithProvider(<AddPizzaForm />)

    expect(screen.getByLabelText(/pizza name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/ingredient/i)).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    renderWithProvider(<AddPizzaForm />)

    const submitButton = screen.getByRole('button', { name: /add pizza to menu/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/pizza name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/price is required/i)).toBeInTheDocument()
      expect(screen.getByText(/at least one ingredient is required/i)).toBeInTheDocument()
    })
  })

  it('validates price is positive', async () => {
    renderWithProvider(<AddPizzaForm />)

    const priceInput = screen.getByLabelText(/price/i)
    fireEvent.change(priceInput, { target: { value: '-5' } })

    const nameInput = screen.getByLabelText(/pizza name/i)
    fireEvent.change(nameInput, { target: { value: 'Test Pizza' } })

    const ingredientInput = screen.getByPlaceholderText(/ingredient 1/i)
    fireEvent.change(ingredientInput, { target: { value: 'cheese' } })

    const submitButton = screen.getByRole('button', { name: /add pizza to menu/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/price must be a positive number/i)).toBeInTheDocument()
    })
  })

  it('allows adding multiple ingredients', () => {
    renderWithProvider(<AddPizzaForm />)

    const addButton = screen.getByText(/add ingredient/i)
    fireEvent.click(addButton)

    const ingredientInputs = screen.getAllByPlaceholderText(/ingredient/i)
    expect(ingredientInputs).toHaveLength(2)
  })

  it('allows removing ingredients', () => {
    renderWithProvider(<AddPizzaForm />)

    const addButton = screen.getByText(/add ingredient/i)
    fireEvent.click(addButton)

    const removeButtons = screen.getAllByLabelText(/remove ingredient/i)
    expect(removeButtons).toHaveLength(1)

    fireEvent.click(removeButtons[0])
    const ingredientInputs = screen.getAllByPlaceholderText(/ingredient/i)
    expect(ingredientInputs).toHaveLength(1)
  })
})

