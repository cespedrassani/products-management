import { useState, useEffect, useCallback } from 'react';
import { Product, ProductFilters } from '@/lib/types';
import { ProductService } from '@/lib/api';

export const useProducts = (initialFilters: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [paginating, setPaginating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [previousCategory, setPreviousCategory] = useState<string | undefined>(initialFilters.category);
  const [previousSort, setPreviousSort] = useState<string | undefined>(initialFilters.category);

  const sortProducts = useCallback((products: Product[]) => {
    let sortedProducts = [...products];

    if (filters.sort) {
      sortedProducts = sortedProducts.sort((a, b) => {
        if (filters.sort === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }
    else {
      sortedProducts = sortedProducts.sort((a, b) => {
        if (a.rating && b.rating) {
          if (a.rating.rate > 4.5 && b.rating.rate <= 4.5) return -1;
          if (a.rating.rate <= 4.5 && b.rating.rate > 4.5) return 1;

          if (a.rating.rate > 4.5 && b.rating.rate > 4.5) {
            return b.rating.rate - a.rating.rate;
          }
        }

        return a.id - b.id;
      });
    }

    return sortedProducts;
  }, [filters.sort]);

  const fetchAllProducts = useCallback(async () => {
    try {
      const categoryParam = filters.category === '' ? undefined : filters.category;

      const fetchedProducts = await ProductService.getProducts({
        category: categoryParam,
      });
      setAllProducts(fetchedProducts);

      setTotalPages(Math.ceil(fetchedProducts.length / filters.limit));

      return fetchedProducts;
    } catch (err) {
      console.error("Erro ao buscar todos os produtos:", err);
      return [];
    }
  }, [filters.category, filters.limit]);

  const applyPagination = useCallback((allItems: Product[]) => {
    const startIndex = (filters.page - 1) * filters.limit;
    const endIndex = startIndex + filters.limit;
    return allItems.slice(startIndex, endIndex);
  }, [filters.page, filters.limit]);

  const fetchProducts = useCallback(async () => {
    const isFirstLoad = initialLoad;
    const categoryChanged = previousCategory !== filters.category;
    const sortChanged = previousSort !== filters.sort;
    const isFiltering = !isFirstLoad && (categoryChanged || sortChanged);
    const isPaging = !isFirstLoad && !isFiltering && filters.page !== 1;

    setPreviousCategory(filters.category);
    setPreviousSort(filters.sort);

    if (isFirstLoad) {
      setLoading(true);
    } else if (isFiltering) {
      setUpdating(true);
    } else if (isPaging) {
      setPaginating(true);
    }

    setError(null);

    try {
      let productsToUse = allProducts;

      if (allProducts.length === 0 || categoryChanged) {
        productsToUse = await fetchAllProducts();
      }

      const sortedProducts = sortProducts(productsToUse);
      const paginatedProducts = applyPagination(sortedProducts);

      setProducts(paginatedProducts);

      if (isFirstLoad) {
        setInitialLoad(false);
      }
    } catch (err) {
      setError('Erro ao buscar produtos. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
      setUpdating(false);
      setPaginating(false);
    }
  }, [initialLoad, previousCategory, filters.category, filters.sort, filters.page, previousSort, allProducts, sortProducts, applyPagination, fetchAllProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters(prev => {
      const resetPage = newFilters.category !== undefined || newFilters.sort !== undefined;

      return {
        ...prev,
        ...newFilters,
        page: resetPage ? 1 : (newFilters.page || prev.page),
      };
    });
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
    updating,
    paginating,
    error,
    filters,
    totalPages,
    updateFilters,
    nextPage,
    prevPage,
    refreshProducts: fetchProducts,
  };
};