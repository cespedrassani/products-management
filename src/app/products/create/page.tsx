'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductFormValues } from '@/lib/schemas';
import { ProductService } from '@/lib/api';
import { ProductForm } from '@/components/product/product-form';

export default function CreateProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await ProductService.createProduct(data);
      router.push('/products');
    } catch (err) {
      console.error('Erro ao criar produto:', err);
      setError('Erro ao criar produto. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <ProductForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}