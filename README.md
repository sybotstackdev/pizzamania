# 🍕 PizaVibe - Your Ultimate Pizza Ordering Experience

Hey there, pizza lover! Welcome to PizaVibe - a modern pizza ordering app that makes getting your favorite slice as easy as clicking a button. Whether you're craving a classic Margherita or want to create your own custom masterpiece, we've got you covered.

## What Makes PizaVibe Special?

We've built this app with one thing in mind: making pizza ordering fun, fast, and delightful. No complicated forms, no confusing menus - just a smooth experience from browsing to checkout.

### 🍕 Browse & Discover

Start by exploring our menu. Each pizza comes with beautiful images, detailed descriptions, and all the ingredients listed. You can filter by vegetarian or non-vegetarian options, search for specific pizzas, or sort by name or price. Finding your perfect pizza has never been easier!

### ✨ Create Your Own

Feeling creative? Add your own custom pizza to the menu! Our form lets you:
- Upload a mouth-watering image of your creation
- Choose between vegetarian or non-vegetarian (with beautiful custom radio buttons)
- Add as many ingredients as you want
- Set your price and write a description

The form validates everything in real-time, so you know exactly what's needed before you submit.

### 🛒 Smart Shopping Cart

Our cart is more than just a list - it's smart! Here's what it does:
- **Automatic Discounts**: Order 3 or more of the same pizza and get 10% off automatically. No coupon codes needed!
- **Easy Quantity Control**: Increase or decrease quantities with simple + and - buttons
- **Real-time Calculations**: Watch your subtotal, discount, and total update instantly as you make changes
- **Quick Removal**: Remove individual items or clear your entire cart with one click

### 📦 Order Management

Once you've filled your cart, review everything in the order summary. You'll see:
- A detailed breakdown of each item
- Quantity and price for each pizza
- Applied discounts (if any)
- Your final total

When you're ready, hit "Confirm Order" and you'll get an order ID plus an estimated delivery time. It's that simple!

## Getting Started

Ready to dive in? Here's everything you need to know to get PizaVibe running on your machine.

### What You'll Need

Before you start, make sure you have:
- **Node.js** version 18 or higher (check with `node --version`)
- **npm** or **yarn** for managing packages

### Installation Steps

1. **Navigate to the project folder**
   ```bash
   cd pizavibe
   ```

2. **Install all the dependencies**
   ```bash
   npm install
   ```
   This might take a minute or two - grab a coffee! ☕

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Head over to [http://localhost:3000](http://localhost:3000) and you should see PizaVibe in all its glory!

That's it! You're ready to start ordering (or developing).

## Testing

We take testing seriously here. After all, nobody wants a broken pizza ordering system! We've written comprehensive tests to make sure everything works exactly as it should.

### Running Tests

**Run all tests:**
```bash
npm test
```

**Watch mode (for development):**
```bash
npm run test:watch
```
This is super handy when you're actively developing - tests automatically re-run whenever you save a file.

**See test coverage:**
```bash
npm run test:coverage
```
This shows you exactly which parts of your code are covered by tests and which might need more attention.

### What We're Testing

Our test suite is pretty comprehensive. Here's what we cover:

**AddPizzaForm (32 tests)**
- Making sure the form renders correctly with all fields
- Testing that validation works (empty fields, invalid prices, etc.)
- Verifying custom radio buttons work properly
- Testing the ingredient add/remove functionality
- Checking image upload with file validation
- Ensuring form submission and reset work correctly

**CartPage & OrderSummary**
- Empty cart displays correctly
- Items show up properly when added
- Quantity adjustments work as expected
- Price calculations are accurate (including discounts!)
- Order confirmation flow works smoothly
- Removing items and clearing cart function properly

**PizzaCard & PizzaDetails**
- Pizza information displays correctly
- Add to cart functionality works
- Category indicators show properly
- Navigation links work as expected
- Quantity selection works for custom amounts

We're constantly adding more tests as we add features, so the coverage keeps growing!

## Project Structure

Here's how everything is organized - it's pretty straightforward:

```
pizavibe/
├── app/                    # Next.js pages and routing
│   ├── add-pizza/         # Page for creating custom pizzas
│   ├── cart/              # Your shopping cart
│   ├── menu/              # Browse all pizzas
│   ├── pizza/[id]/       # Individual pizza details
│   └── order-confirmed/   # Order confirmation page
├── components/            # All our React components
│   ├── __tests__/        # Test files (we love tests!)
│   ├── AddPizzaForm.tsx  # The form for adding pizzas
│   ├── CartPage.tsx      # Cart page component
│   ├── OrderSummary.tsx  # Order summary and checkout
│   ├── PizzaCard.tsx     # Individual pizza cards
│   └── PizzaDetails.tsx  # Detailed pizza view
├── context/               # State management
│   └── AppContext.tsx    # Main app state (cart, orders, etc.)
├── data/                  # Static data
│   └── pizzas.json       # Initial pizza data
├── types/                 # TypeScript definitions
│   └── index.ts          # Shared types
├── jest.config.js         # Jest configuration
├── jest.setup.js          # Test setup
└── package.json           # Dependencies and scripts
```

## Tech Stack

We've used some great tools to build this:

- **Next.js 14** - The React framework that makes everything fast and smooth
- **React 18** - For building beautiful, interactive UIs
- **TypeScript** - Because type safety saves us from bugs
- **Tailwind CSS** - For styling without the headache
- **Framer Motion** - For those smooth, delightful animations
- **Jest & React Testing Library** - For making sure everything works

## How It All Works

### Creating a Custom Pizza

Want to add your own pizza? It's a breeze:
1. Click "Add Pizza" in the menu
2. Fill in the name and price
3. Choose vegetarian or non-vegetarian (those custom radio buttons are pretty nice, right?)
4. Add ingredients one by one (or remove them if you change your mind)
5. Optionally upload an image - you'll see a preview right away
6. Add a description if you want
7. Hit "Add Pizza" and boom - it's in the menu!

The form validates everything as you type, so you'll know right away if something needs fixing.

### The Shopping Experience

Here's the typical flow:
1. **Browse** - Check out all the delicious options on the menu page
2. **Explore** - Click on any pizza to see full details, ingredients, and more
3. **Add to Cart** - Choose your quantity and add it to your cart
4. **Review** - Head to the cart page to see everything you've selected
5. **Adjust** - Change quantities, remove items, or add more pizzas
6. **Checkout** - Confirm your order and get your order ID

The whole process is designed to be intuitive and fast. No unnecessary steps, no confusion.

### Smart Discounts

Here's a cool feature: if you order 3 or more of the same pizza, you automatically get 10% off! The discount shows up in real-time, and you can see exactly how much you're saving. It's our way of saying "thanks for loving that pizza so much!"

## Available Commands

Here are all the npm scripts you can use:

- `npm run dev` - Start the development server (use this for local development)
- `npm run build` - Build the app for production
- `npm run start` - Start the production server
- `npm run lint` - Check code for any linting issues
- `npm test` - Run all tests once
- `npm run test:watch` - Run tests in watch mode (great for TDD!)
- `npm run test:coverage` - Generate a coverage report

## Contributing

We'd love to have you contribute! Here's how:

1. Fork the repository (or create a branch if you have access)
2. Create a feature branch: `git checkout -b feature/your-awesome-feature`
3. Make your changes and write tests for them
4. Make sure all tests pass: `npm test`
5. Commit your changes: `git commit -m 'Add your awesome feature'`
6. Push to your branch: `git push origin feature/your-awesome-feature`
7. Open a Pull Request

A few tips:
- Write tests for new features
- Keep the code style consistent
- Update the README if you add new features
- Be descriptive in your commit messages

## A Few Final Notes

This project is private and proprietary, so please respect that.

We've used some beautiful pizza images from Unsplash - big thanks to all those photographers who make our app look so appetizing!

## Questions or Issues?

If you run into any problems or have questions, don't hesitate to:
- Open an issue in the repository
- Reach out to the development team
- Check the test files - they're great documentation for how things work!

---

**Thanks for checking out PizaVibe! 🎉**

Now go order some pizza and enjoy! 🍕
