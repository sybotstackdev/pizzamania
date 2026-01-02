import type { Metadata } from 'next'
import { Inter, Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/context/AppContext'
import Navigation from '@/components/Navigation'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PizaVibe - Delicious Pizza Delivery',
  description: 'Order your favorite pizzas online with PizaVibe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${poppins.variable} font-sans`}>
        <AppProvider>
          <div className="min-h-screen bg-white">
            <Navigation />
            <main>{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  )
}

