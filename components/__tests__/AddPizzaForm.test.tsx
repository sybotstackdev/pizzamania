import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddPizzaForm from '../AddPizzaForm'
import { useApp } from '@/context/AppContext'
import * as navigation from 'next/navigation'

// Mock the dependencies
jest.mock('@/context/AppContext')
jest.mock('../Footer', () => {
  return function Footer() {
    return <footer>Footer</footer>
  }
})

const mockDispatch = jest.fn()
const mockPush = jest.fn()

// Mock useRouter before importing
jest.spyOn(navigation, 'useRouter').mockReturnValue({
  push: mockPush,
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
} as any)

describe('AddPizzaForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useApp as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
    })
    mockPush.mockClear()
  })

  describe('Rendering', () => {
    it('renders the form with all fields', () => {
      render(<AddPizzaForm />)

      expect(screen.getByText('Add New Pizza')).toBeInTheDocument()
      expect(screen.getByText('Create a new pizza for the menu')).toBeInTheDocument()
      expect(screen.getByLabelText(/pizza name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/price \(usd\)/i)).toBeInTheDocument()
      expect(screen.getByText('Category')).toBeInTheDocument()
      expect(screen.getByText('Vegetarian')).toBeInTheDocument()
      expect(screen.getByText('Non-Vegetarian')).toBeInTheDocument()
      expect(screen.getByText(/ingredients/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /add pizza/i })).toBeInTheDocument()
    })

    it('renders the back link', () => {
      render(<AddPizzaForm />)
      const backLink = screen.getByRole('link', { name: /back/i })
      expect(backLink).toBeInTheDocument()
      expect(backLink).toHaveAttribute('href', '/menu')
    })

    it('renders image upload area when no image is selected', () => {
      render(<AddPizzaForm />)
      expect(screen.getByText('Click to upload or drag and drop')).toBeInTheDocument()
      expect(screen.getByText('PNG, JPG, GIF up to 5MB')).toBeInTheDocument()
    })
  })

  describe('Form Inputs', () => {
    it('allows user to enter pizza name', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const nameInput = screen.getByLabelText(/pizza name/i)
      await user.type(nameInput, 'Margherita')

      expect(nameInput).toHaveValue('Margherita')
    })

    it('allows user to enter price', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const priceInput = screen.getByLabelText(/price \(usd\)/i)
      await user.type(priceInput, '12.99')

      expect(priceInput).toHaveValue(12.99)
    })

    it('allows user to enter description', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const descriptionInput = screen.getByLabelText(/description/i)
      await user.type(descriptionInput, 'A classic Italian pizza')

      expect(descriptionInput).toHaveValue('A classic Italian pizza')
    })

    it('has vegetarian selected by default', () => {
      render(<AddPizzaForm />)
      const vegetarianRadio = screen.getByRole('radio', { name: /^vegetarian$/i })
      expect(vegetarianRadio).toBeChecked()
    })

    it('allows user to select non-vegetarian category', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const nonVegRadio = screen.getByRole('radio', { name: /^non-vegetarian$/i })
      await user.click(nonVegRadio)

      expect(nonVegRadio).toBeChecked()
      const vegetarianRadio = screen.getByRole('radio', { name: /^vegetarian$/i })
      expect(vegetarianRadio).not.toBeChecked()
    })
  })

  describe('Ingredients Management', () => {
    it('renders one ingredient field by default', () => {
      render(<AddPizzaForm />)
      const ingredientInputs = screen.getAllByPlaceholderText(/ingredient \d+/i)
      expect(ingredientInputs).toHaveLength(1)
    })

    it('allows user to add more ingredient fields', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const addButton = screen.getByRole('button', { name: /^add$/i })
      await user.click(addButton)

      const ingredientInputs = screen.getAllByPlaceholderText(/ingredient \d+/i)
      expect(ingredientInputs).toHaveLength(2)
    })

    it('allows user to enter ingredient values', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const ingredientInput = screen.getByPlaceholderText(/ingredient 1/i)
      await user.type(ingredientInput, 'Tomato')

      expect(ingredientInput).toHaveValue('Tomato')
    })

    it('allows user to remove ingredient field when there are multiple', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      // Add a second ingredient field
      const addButton = screen.getByRole('button', { name: /^add$/i })
      await user.click(addButton)

      // Fill both fields
      const inputs = screen.getAllByPlaceholderText(/ingredient \d+/i)
      await user.type(inputs[0], 'Tomato')
      await user.type(inputs[1], 'Cheese')

      // Remove button should appear
      const removeButtons = screen.getAllByLabelText(/remove ingredient/i)
      expect(removeButtons).toHaveLength(2)

      // Remove the first ingredient
      await user.click(removeButtons[0])

      // Should only have one field left
      const remainingInputs = screen.getAllByPlaceholderText(/ingredient \d+/i)
      expect(remainingInputs).toHaveLength(1)
      expect(remainingInputs[0]).toHaveValue('Cheese')
    })

    it('does not show remove button when there is only one ingredient field', () => {
      render(<AddPizzaForm />)
      const removeButtons = screen.queryAllByLabelText(/remove ingredient/i)
      expect(removeButtons).toHaveLength(0)
    })
  })

  describe('Form Validation', () => {
    it('shows error when pizza name is empty', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const submitButton = screen.getByRole('button', { name: /add pizza/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/pizza name is required/i)).toBeInTheDocument()
      })
    })

    it('shows error when pizza name is too short', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const nameInput = screen.getByLabelText(/pizza name/i)
      await user.type(nameInput, 'A')
      await user.click(screen.getByRole('button', { name: /add pizza/i }))

      await waitFor(() => {
        expect(screen.getByText(/pizza name must be at least 2 characters/i)).toBeInTheDocument()
      })
    })

    it('shows error when price is empty', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const nameInput = screen.getByLabelText(/pizza name/i)
      await user.type(nameInput, 'Margherita')
      await user.click(screen.getByRole('button', { name: /add pizza/i }))

      await waitFor(() => {
        expect(screen.getByText(/price must be a positive number/i)).toBeInTheDocument()
      })
    })

    it('shows error when price is zero or negative', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const nameInput = screen.getByLabelText(/pizza name/i)
      const priceInput = screen.getByLabelText(/price \(usd\)/i)

      await user.type(nameInput, 'Margherita')
      await user.type(priceInput, '0')
      await user.click(screen.getByRole('button', { name: /add pizza/i }))

      await waitFor(() => {
        expect(screen.getByText(/price must be a positive number/i)).toBeInTheDocument()
      })
    })

    it('shows error when no ingredients are provided', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const nameInput = screen.getByLabelText(/pizza name/i)
      const priceInput = screen.getByLabelText(/price \(usd\)/i)

      await user.type(nameInput, 'Margherita')
      await user.type(priceInput, '12.99')
      await user.click(screen.getByRole('button', { name: /add pizza/i }))

      await waitFor(() => {
        expect(screen.getByText(/at least one ingredient is required/i)).toBeInTheDocument()
      })
    })

    it('shows error when ingredient is too short', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const nameInput = screen.getByLabelText(/pizza name/i)
      const priceInput = screen.getByLabelText(/price \(usd\)/i)
      const ingredientInput = screen.getByPlaceholderText(/ingredient 1/i)

      await user.type(nameInput, 'Margherita')
      await user.type(priceInput, '12.99')
      await user.type(ingredientInput, 'A')
      await user.click(screen.getByRole('button', { name: /add pizza/i }))

      await waitFor(() => {
        expect(screen.getByText(/each ingredient must be at least 2 characters/i)).toBeInTheDocument()
      })
    })

    it('clears error when user starts typing in name field', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const submitButton = screen.getByRole('button', { name: /add pizza/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/pizza name is required/i)).toBeInTheDocument()
      })

      const nameInput = screen.getByLabelText(/pizza name/i)
      await user.type(nameInput, 'M')

      await waitFor(() => {
        expect(screen.queryByText(/pizza name is required/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('Image Upload', () => {
    it('allows user to upload an image', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const file = new File(['(⌐□_□)'], 'pizza.png', { type: 'image/png' })
      
      // Mock FileReader to execute synchronously for testing
      const mockFileReader = {
        readAsDataURL: jest.fn(function() {
          // Execute callback immediately in next tick
          if (this.onloadend) {
            this.result = 'data:image/png;base64,test'
            // Use setTimeout with 0 delay to make it async but immediate
            setTimeout(() => {
              if (this.onloadend) {
                this.onloadend()
              }
            }, 0)
          }
        }),
        result: '',
        onloadend: null as any,
      }
      global.FileReader = jest.fn(() => mockFileReader) as any

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(fileInput).toBeInTheDocument()

      await user.upload(fileInput, file)

      // Wait for FileReader to process (setTimeout callback)
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 10))
      })

      await waitFor(() => {
        expect(screen.getByAltText('Pizza preview')).toBeInTheDocument()
      }, { timeout: 1000 })
    })

    it('shows error when invalid file type is uploaded', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const file = new File(['test'], 'test.txt', { type: 'text/plain' })
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(fileInput).toBeInTheDocument()

      await user.upload(fileInput, file)

      await waitFor(() => {
        expect(screen.getByText(/please select a valid image file/i)).toBeInTheDocument()
      })
    })

    it('shows error when file size exceeds 5MB', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      // Create a file larger than 5MB
      const largeFile = new File([new ArrayBuffer(6 * 1024 * 1024)], 'large.png', { type: 'image/png' })
      Object.defineProperty(largeFile, 'size', { value: 6 * 1024 * 1024 })

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(fileInput).toBeInTheDocument()

      await user.upload(fileInput, largeFile)

      await waitFor(() => {
        expect(screen.getByText(/image size must be less than 5mb/i)).toBeInTheDocument()
      })
    })

    it('allows user to remove uploaded image', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const file = new File(['(⌐□_□)'], 'pizza.png', { type: 'image/png' })
      
      // Mock FileReader to execute synchronously for testing
      const mockFileReader = {
        readAsDataURL: jest.fn(function() {
          if (this.onloadend) {
            this.result = 'data:image/png;base64,test'
            setTimeout(() => {
              if (this.onloadend) {
                this.onloadend()
              }
            }, 0)
          }
        }),
        result: '',
        onloadend: null as any,
      }
      global.FileReader = jest.fn(() => mockFileReader) as any

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(fileInput).toBeInTheDocument()

      await user.upload(fileInput, file)

      // Wait for FileReader to process (setTimeout callback)
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 10))
      })

      await waitFor(() => {
        expect(screen.getByAltText('Pizza preview')).toBeInTheDocument()
      }, { timeout: 1000 })

      const removeButton = screen.getByLabelText(/remove image/i)
      await user.click(removeButton)

      await waitFor(() => {
        expect(screen.queryByAltText('Pizza preview')).not.toBeInTheDocument()
        expect(screen.getByText('Click to upload or drag and drop')).toBeInTheDocument()
      })
    })
  })

  describe('Form Submission', () => {
    it('submits form with valid data', async () => {
      jest.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      render(<AddPizzaForm />)

      const nameInput = screen.getByLabelText(/pizza name/i)
      const priceInput = screen.getByLabelText(/price \(usd\)/i)
      const ingredientInput = screen.getByPlaceholderText(/ingredient 1/i)
      const submitButton = screen.getByRole('button', { name: /add pizza/i })

      await user.type(nameInput, 'Margherita')
      await user.type(priceInput, '12.99')
      await user.type(ingredientInput, 'Tomato')

      await user.click(submitButton)

      // Wait for validation and submission
      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'ADD_NEW_PIZZA',
            payload: expect.objectContaining({
              name: 'Margherita',
              price: 12.99,
              ingredients: ['Tomato'],
              category: 'vegetarian',
            }),
          })
        )
      })

      // Fast-forward timers - the setTimeout in handleSubmit will trigger router.push
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      // Wait a bit for the router.push to be called
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/menu')
      }, { timeout: 100 })

      jest.useRealTimers()
    })

    it('submits form with non-vegetarian category', async () => {
      jest.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      render(<AddPizzaForm />)

      const nameInput = screen.getByLabelText(/pizza name/i)
      const priceInput = screen.getByLabelText(/price \(usd\)/i)
      const ingredientInput = screen.getByPlaceholderText(/ingredient 1/i)
      const nonVegRadio = screen.getByRole('radio', { name: /non-vegetarian/i })
      const submitButton = screen.getByRole('button', { name: /add pizza/i })

      await user.type(nameInput, 'Pepperoni')
      await user.type(priceInput, '15.99')
      await user.type(ingredientInput, 'Pepperoni')
      await user.click(nonVegRadio)
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'ADD_NEW_PIZZA',
            payload: expect.objectContaining({
              category: 'non-vegetarian',
            }),
          })
        )
      })

      act(() => {
        jest.advanceTimersByTime(1000)
      })
      jest.useRealTimers()
    })

    it('submits form with multiple ingredients', async () => {
      jest.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      render(<AddPizzaForm />)

      const nameInput = screen.getByLabelText(/pizza name/i)
      const priceInput = screen.getByLabelText(/price \(usd\)/i)
      const ingredientInput = screen.getByPlaceholderText(/ingredient 1/i)
      const addButton = screen.getByRole('button', { name: /^add$/i })
      const submitButton = screen.getByRole('button', { name: /add pizza/i })

      await user.type(nameInput, 'Quattro Formaggi')
      await user.type(priceInput, '18.99')
      await user.type(ingredientInput, 'Mozzarella')
      await user.click(addButton)

      const secondIngredient = screen.getByPlaceholderText(/ingredient 2/i)
      await user.type(secondIngredient, 'Gorgonzola')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'ADD_NEW_PIZZA',
            payload: expect.objectContaining({
              ingredients: ['Mozzarella', 'Gorgonzola'],
            }),
          })
        )
      })

      act(() => {
        jest.advanceTimersByTime(1000)
      })
      jest.useRealTimers()
    })

    it('submits form with description', async () => {
      jest.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      render(<AddPizzaForm />)

      const nameInput = screen.getByLabelText(/pizza name/i)
      const priceInput = screen.getByLabelText(/price \(usd\)/i)
      const ingredientInput = screen.getByPlaceholderText(/ingredient 1/i)
      const descriptionInput = screen.getByLabelText(/description/i)
      const submitButton = screen.getByRole('button', { name: /add pizza/i })

      await user.type(nameInput, 'Margherita')
      await user.type(priceInput, '12.99')
      await user.type(ingredientInput, 'Tomato')
      await user.type(descriptionInput, 'A classic Italian pizza')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'ADD_NEW_PIZZA',
            payload: expect.objectContaining({
              description: 'A classic Italian pizza',
            }),
          })
        )
      })

      act(() => {
        jest.advanceTimersByTime(1000)
      })
      jest.useRealTimers()
    })

    it('submits form with uploaded image', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      // Upload image
      const file = new File(['(⌐□_□)'], 'pizza.png', { type: 'image/png' })
      
      // Mock FileReader to immediately resolve
      const mockFileReader = {
        readAsDataURL: jest.fn(function() {
          // Immediately resolve
          if (this.onloadend) {
            this.result = 'data:image/png;base64,test'
            // Use setTimeout to make it async but immediate
            setTimeout(() => {
              if (this.onloadend) {
                this.onloadend()
              }
            }, 0)
          }
        }),
        result: '',
        onloadend: null as any,
      }
      global.FileReader = jest.fn(() => mockFileReader) as any

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(fileInput).toBeInTheDocument()

      // Use userEvent to upload file
      await user.upload(fileInput, file)

      // Wait for FileReader to process
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 10))
      })

      await waitFor(() => {
        expect(screen.getByAltText('Pizza preview')).toBeInTheDocument()
      })

      // Fill form and submit
      const nameInput = screen.getByLabelText(/pizza name/i)
      const priceInput = screen.getByLabelText(/price \(usd\)/i)
      const ingredientInput = screen.getByPlaceholderText(/ingredient 1/i)
      const submitButton = screen.getByRole('button', { name: /add pizza/i })

      await user.type(nameInput, 'Margherita')
      await user.type(priceInput, '12.99')
      await user.type(ingredientInput, 'Tomato')
      
      // Use fake timers just for the submission timeout
      jest.useFakeTimers()
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalled()
      })

      act(() => {
        jest.advanceTimersByTime(1000)
      })
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/menu')
      }, { timeout: 100 })
      
      jest.useRealTimers()
    })

    it('shows loading state during submission', async () => {
      jest.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      render(<AddPizzaForm />)

      const nameInput = screen.getByLabelText(/pizza name/i)
      const priceInput = screen.getByLabelText(/price \(usd\)/i)
      const ingredientInput = screen.getByPlaceholderText(/ingredient 1/i)
      const submitButton = screen.getByRole('button', { name: /add pizza/i })

      await user.type(nameInput, 'Margherita')
      await user.type(priceInput, '12.99')
      await user.type(ingredientInput, 'Tomato')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/adding.../i)).toBeInTheDocument()
        expect(submitButton).toBeDisabled()
      })

      act(() => {
        jest.advanceTimersByTime(1000)
      })
      jest.useRealTimers()
    })

    it('does not submit form with invalid data', async () => {
      const user = userEvent.setup()
      render(<AddPizzaForm />)

      const submitButton = screen.getByRole('button', { name: /add pizza/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/pizza name is required/i)).toBeInTheDocument()
      })

      expect(mockDispatch).not.toHaveBeenCalled()
      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('Form Reset', () => {
    it('resets form after successful submission', async () => {
      jest.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      render(<AddPizzaForm />)

      const nameInput = screen.getByLabelText(/pizza name/i)
      const priceInput = screen.getByLabelText(/price \(usd\)/i)
      const ingredientInput = screen.getByPlaceholderText(/ingredient 1/i)
      const submitButton = screen.getByRole('button', { name: /add pizza/i })

      await user.type(nameInput, 'Margherita')
      await user.type(priceInput, '12.99')
      await user.type(ingredientInput, 'Tomato')
      await user.click(submitButton)

      // Wait for dispatch first
      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalled()
      })

      // Fast-forward timers to trigger form reset
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      await waitFor(() => {
        expect(nameInput).toHaveValue('')
        expect(priceInput).toHaveValue(null)
        expect(ingredientInput).toHaveValue('')
      })

      jest.useRealTimers()
    })
  })
})

