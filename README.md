# PizaVibe - Pizza Delivery App

A modern, animated pizza delivery application built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. This self-contained React application allows users to browse, order, and manage pizzas with a smooth, beautiful UI.

## 🚀 Features

- **Pizza Menu Browsing**: Browse a comprehensive list of pizzas with beautiful card layouts
- **Advanced Filtering & Sorting**: Filter by category, price, ingredients, and search by name. Sort by name or price
- **Interactive Order Management**: Add pizzas to cart with quantity selection, update quantities, and remove items
- **Smart Discount System**: Automatic 10% discount when ordering 3 or more of the same pizza
- **Order Summary**: Real-time order summary with subtotal, discounts, and total calculations
- **Pizza Details Page**: Detailed view for each pizza with full information
- **Add Custom Pizzas**: Form to add new pizzas to the menu with validation
- **Data Visualizations**: Interactive charts showing pizza prices and order distributions
- **Responsive Design**: Fully responsive layout that works on desktop and mobile
- **Smooth Animations**: Beautiful animations powered by Framer Motion
- **Order Persistence**: Orders are saved to localStorage

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom color variables
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Context API
- **Testing**: Jest & React Testing Library

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git (for cloning)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pizavibe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production bundle
- `npm start` - Start the production server (after build)
- `npm run lint` - Run ESLint to check code quality
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## 📁 Project Structure

```
pizavibe/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home/Dashboard page
│   ├── globals.css        # Global styles with color variables
│   ├── pizza/[id]/        # Dynamic pizza details route
│   ├── add-pizza/         # Add pizza form page
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── Dashboard.tsx      # Main menu/dashboard component
│   ├── PizzaCard.tsx      # Pizza card component
│   ├── PizzaDetails.tsx   # Pizza details page component
│   ├── PizzaFilters.tsx   # Filter and sort controls
│   ├── OrderSummary.tsx   # Order summary sidebar
│   ├── PizzaCharts.tsx    # Data visualization charts
│   ├── AddPizzaForm.tsx   # Add pizza form component
│   └── Navigation.tsx     # Navigation bar
├── context/               # React Context
│   └── AppContext.tsx     # Global state management
├── data/                  # Data files
│   └── pizzas.json        # Initial pizza data
├── types/                 # TypeScript type definitions
│   └── index.ts           # Type interfaces
├── __tests__/             # Test files
│   ├── components/        # Component tests
│   └── context/           # Context tests
└── public/                # Static assets
```

## 🎨 Design System

### Color Variables

The application uses a comprehensive color system with CSS variables defined in `app/globals.css`:

- **Primary Colors** (Red/Orange): `--color-primary-50` to `--color-primary-900`
- **Secondary Colors** (Yellow/Gold): `--color-secondary-50` to `--color-secondary-900`
- **Success Colors**: Green shades for success states
- **Error Colors**: Red shades for errors
- **Warning Colors**: Amber shades for warnings
- **Neutral Colors**: Grayscale for text and backgrounds

All colors are accessible via Tailwind classes (e.g., `bg-primary-600`, `text-neutral-900`).

## 📊 Data Structure

### Pizza Object

```typescript
interface Pizza {
  id: string
  name: string
  price: number
  ingredients: string[]
  category?: 'vegetarian' | 'non-vegetarian'
  description?: string
  imageUrl?: string
}
```

### Order Object

```typescript
interface Order {
  id: string
  items: OrderItem[]
  subtotal: number
  totalDiscount: number
  total: number
  timestamp: string
}
```

### OrderItem Object

```typescript
interface OrderItem {
  pizza: Pizza
  quantity: number
  originalPrice: number
  discount: number
  discountedPrice: number
}
```

## 💰 Discount Rules

- **Bulk Discount**: When a user orders 3 or more of the same pizza, that pizza line item receives a 10% discount
- The discount is calculated as: `price * quantity * 0.1`
- Discounts are applied per line item, not to the entire order
- The order summary clearly shows:
  - Original line price
  - Discount amount (if applicable)
  - Discounted line total
  - Total discount across all items
  - Final order total

## 🔄 State Management

The application uses React Context API for state management. The `AppContext` manages:

- **Pizzas**: Current menu of pizzas (loaded from `pizzas.json` and localStorage)
- **Current Order**: Items currently in the shopping cart
- **Orders**: Confirmed orders (stored in localStorage)
- **Filters**: Current filter settings (search, category, price, ingredient)
- **Sort Option**: Current sort preference

### State Actions

- `LOAD_PIZZAS`: Load pizzas from JSON file
- `ADD_PIZZA_TO_ORDER`: Add pizza to current order
- `REMOVE_PIZZA_FROM_ORDER`: Remove pizza from order
- `UPDATE_ORDER_QUANTITY`: Update quantity of pizza in order
- `CLEAR_CURRENT_ORDER`: Clear all items from current order
- `CONFIRM_ORDER`: Save order and clear current order
- `ADD_NEW_PIZZA`: Add new pizza to menu
- `SET_FILTERS`: Update filter settings
- `SET_SORT_OPTION`: Update sort option

## 🧪 Testing

Tests are written using Jest and React Testing Library. Test files are located in the `__tests__` directory.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

- Component tests for PizzaCard, AddPizzaForm
- Context tests for state management
- Discount calculation logic
- Form validation

## 🎯 Key Features Explained

### Filtering & Sorting

- **Search**: Search pizzas by name or ingredient
- **Category Filter**: Filter by "All", "Vegetarian", or "Non-Vegetarian"
- **Price Filter**: Filter by maximum price using a range slider
- **Ingredient Filter**: Filter pizzas by specific ingredient
- **Sort Options**: Sort by name (A-Z, Z-A) or price (Low to High, High to Low)

### Order Management

- Add pizzas to order with quantity selection
- Update quantities directly from the order summary
- Remove individual items
- Clear entire order
- Real-time price calculations with discounts
- Visual indicators for discounted items

### Data Visualizations

- **Bar Chart**: Shows pizza prices across all menu items
- **Pie Chart**: Shows distribution of items in current order (or menu overview if cart is empty)
- Charts update dynamically based on current data

### Form Validation

The Add Pizza form includes comprehensive validation:

- **Name**: Required, minimum 2 characters
- **Price**: Required, must be a positive number
- **Ingredients**: At least one ingredient required
- Real-time error messages
- Form submission blocked until all validations pass

## 🔐 Data Persistence

- **Orders**: Saved to browser localStorage under the key `orders`
- **Pizzas**: Initial data from `data/pizzas.json`, new pizzas saved to localStorage under the key `pizzas`
- Data persists across browser sessions
- No backend required - fully client-side storage

## 🎨 Animations

The application uses Framer Motion for smooth animations:

- Page transitions
- Card hover effects
- Button interactions
- Form error messages
- Order summary updates
- Navigation transitions
- Loading states

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Setup

No environment variables are required. The application is fully self-contained.

### Deployment Platforms

This application can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any static hosting** (after `npm run build` and exporting static files)

## 📝 Design Decisions

### Why Context API instead of Redux?

- Simpler setup for this application size
- No need for additional dependencies
- Built-in React solution
- Sufficient for the state management needs

### Why Tailwind CSS?

- Utility-first approach for rapid development
- Consistent design system
- Easy customization with CSS variables
- Excellent performance with purging unused styles

### Why Framer Motion?

- Best-in-class animation library for React
- Declarative API
- Excellent performance
- Great developer experience

### Why Recharts for Charts?

- React-native chart library
- Good TypeScript support
- Responsive by default
- Easy to customize

## 🤝 Contributing

This is a demonstration project. If you'd like to extend it:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Recharts for beautiful charts
- Lucide for the icon set

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

