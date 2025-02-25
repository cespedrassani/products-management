import { useState, useEffect } from 'react';
import { Category } from '@/lib/types';
import { CategoryService } from '@/lib/api';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedCategories = await CategoryService.getCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError('Erro ao buscar categorias. Por favor, tente novamente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};