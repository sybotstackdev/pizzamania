export interface Pizza {
  id: string;
  name: string;
  price: number;
  ingredients: string[];
  imageUrl?: string;
  category?: string;
  description?: string;
}

export interface OrderItem {
  pizza: Pizza;
  quantity: number;
  originalPrice: number;
  discount: number;
  discountedPrice: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  totalDiscount: number;
  total: number;
  timestamp: string;
}

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';
export type FilterOption = 'all' | 'vegetarian' | 'non-vegetarian';

export interface PizzaFilters {
  search: string;
  category: FilterOption;
  maxPrice: number | null;
  ingredient: string | null;
}

