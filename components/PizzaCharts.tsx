'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { useApp } from '@/context/AppContext'

const COLORS = ['#f97316', '#ea580c', '#fb923c', '#fdba74', '#c2410c', '#9a3412', '#dc2626', '#ef4444']

export default function PizzaCharts() {
  const { state } = useApp()

  // Bar chart data - pizza prices
  const priceData = state.pizzas.map((pizza) => ({
    name: pizza.name,
    price: pizza.price,
  }))

  // Pie chart data - current order distribution by quantity
  const orderData = state.currentOrder.map((item) => ({
    name: item.pizza.name,
    value: item.quantity,
  }))

  // If no items in order, show menu distribution
  const displayData = orderData.length > 0 ? orderData : state.pizzas.map((pizza) => ({
    name: pizza.name,
    value: 1,
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Bar Chart - Pizza Prices */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200"
      >
        <h3 className="text-xl font-bold text-neutral-900 mb-4 uppercase tracking-wide">Pizza Prices</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e5e5' }}
            />
            <Bar dataKey="price" fill="#f97316" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Pie Chart - Order Distribution */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200"
      >
        <h3 className="text-xl font-bold text-neutral-900 mb-4 uppercase tracking-wide">
          {orderData.length > 0 ? 'Order Distribution' : 'Menu Overview'}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={displayData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {displayData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [value, orderData.length > 0 ? 'Quantity' : 'Count']}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e5e5' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}

