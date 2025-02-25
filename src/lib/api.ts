import axios from 'axios';
import { Product, Category } from './types';

const API_URL = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ProductParams {
  limit?: number;
  page?: number;
  sort?: 'asc' | 'desc';
  category?: string;
}

export const ProductService = {
  async getProducts(params: ProductParams = {}): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.sort) queryParams.append('sort', params.sort);

      let url = '/products';
      if (params.category) {
        url = `/products/category/${params.category}`;
      }

      const response = await api.get(`${url}?${queryParams.toString()}`);

      if (params.page && params.page > 1 && params.limit) {
        const startIndex = (params.page - 1) * params.limit;
        return response.data.slice(startIndex, startIndex + params.limit);
      }

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  },

  async getProductById(id: number | string): Promise<Product> {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar produto com ID ${id}:`, error);
      throw error;
    }
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      const response = await api.post('/products', product);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  },

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    try {
      const response = await api.put(`/products/${id}`, product);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar produto com ID ${id}:`, error);
      throw error;
    }
  },

  async deleteProduct(id: number): Promise<void> {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir produto com ID ${id}:`, error);
      throw error;
    }
  },
};

export const CategoryService = {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get('/products/categories');
      return response.data.map((name: string) => ({ name }));
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw error;
    }
  },
};

export default api;