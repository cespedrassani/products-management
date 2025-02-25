import { useState, useEffect, useCallback } from 'react';
import { Product, ProductFilters } from '@/lib/types';
import { ProductService } from '@/lib/api';

export const useProducts = (initialFilters: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const allProductsInCategory = await ProductService.getProducts({
        category: filters.category,
      });

      setTotalPages(Math.ceil(allProductsInCategory.length / filters.limit));

      const fetchedProducts = await ProductService.getProducts({
        limit: filters.limit,
        page: filters.page,
        sort: filters.sort,
        category: filters.category,
      });

      const sortedProducts = [...fetchedProducts].sort((a, b) => {
        if (a.rating.rate > 4.5 && b.rating.rate <= 4.5) return -1;
        if (a.rating.rate <= 4.5 && b.rating.rate > 4.5) return 1;
        return 0;
      });

      setProducts(sortedProducts);
    } catch (err) {
      setError('Erro ao buscar produtos. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.category !== undefined || newFilters.sort !== undefined ? 1 : prev.page,
    }));
  }, []);

  const nextPage = useCallback(() => {
    if (filters.page < totalPages) {
      updateFilters({ page: filters.page + 1 });
    }
  }, [filters.page, totalPages, updateFilters]);

  const prevPage = useCallback(() => {
    if (filters.page > 1) {
      updateFilters({ page: filters.page - 1 });
    }
  }, [filters.page, updateFilters]);

  return {
    products,
    loading,
    error,
    filters,
    totalPages,
    updateFilters,
    nextPage,
    prevPage,
    refreshProducts: fetchProducts,
  };
};