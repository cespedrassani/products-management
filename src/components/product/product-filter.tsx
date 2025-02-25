import React from 'react';
import { useCategories } from '@/hooks/useCategories';
import { ProductFilters } from '@/lib/types';
import { Label } from '../ui/label';

interface ProductFilterProps {
  filters: ProductFilters;
  onFilterChange: (filters: Partial<ProductFilters>) => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onFilterChange
}) => {
  const { categories, loading: loadingCategories } = useCategories();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6 border-[0.1px]">
      <div className="space-y-2">
        <Label htmlFor="category" className="font-medium">Categoria</Label>
        <select
          id="category"
          className="w-full h-10 rounded-md border text-sm text-black border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          value={filters.category || ''}
          onChange={(e) => onFilterChange({ category: e.target.value || undefined })}
          disabled={loadingCategories}
        >
          <option value="">Todas as categorias</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort" className="font-medium">Ordenar por preço</Label>
        <select
          id="sort"
          className="w-full h-10 rounded-md text-sm text-black border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          value={filters.sort || ''}
          onChange={(e) => {
            const value = e.target.value as 'asc' | 'desc' | '';
            onFilterChange({ sort: value || undefined });
          }}
        >
          <option value="">Ordenação padrão</option>
          <option value="asc">Menor preço</option>
          <option value="desc">Maior preço</option>
        </select>
      </div>
    </div>
  );
};