export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: Rating;
}

export interface Category {
  name: string;
}

export interface ProductFormData {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface ProductFilters {
  category?: string;
  sort?: 'asc' | 'desc';
  page: number;
  limit: number;
}