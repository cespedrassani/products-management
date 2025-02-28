'use client';

import { useProducts } from '@/hooks/useProducts';
import { ProductList } from '@/components/product/product-list';
import { ProductFilter } from '@/components/product/product-filter';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function ProductsPage() {

  const {
    products,
    loading,
    error,
    filters,
    totalPages,
    updateFilters,
    nextPage,
    prevPage,
  } = useProducts({
    page: 1,
    limit: 6,
  });

  return (
    <div className="container mx-auto py-8 px-4">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProductFilter
            filters={filters}
            onFilterChange={updateFilters}
          />
        </div>

        <div className="md:col-span-3">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <ProductList products={products} loading={loading} />

          <Pagination className="mt-8 items-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={prevPage}
                  className={filters.page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              <PaginationItem className='items-center'>
                <span className="px-4 py-2 text-black text-xs items-center">
                  Página {filters.page} de {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={nextPage}
                  className={filters.page >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}