'use client';

import { useState, useEffect, type Usable, use } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types';
import { ProductFormValues } from '@/lib/schemas';
import { ProductService } from '@/lib/api';
import { ProductForm } from '@/components/product/product-form';

export default function EditProductPage({ params }: { params: Usable<{ id: string }> }) {
  const unwrappedParams = use<{ id: string }>(params);
  const id = unwrappedParams.id
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          setError('ID de produto inválido');
          setLoading(false);
          return;
        }

        const fetchedProduct = await ProductService.getProductById(id);
        setProduct(fetchedProduct);
      } catch (err) {
        setError('Erro ao carregar produto. Por favor, tente novamente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (data: ProductFormValues) => {
    if (!product) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const updatedData = {
        ...data,
        category: product.category,
      };

      await ProductService.updateProduct(product.id, updatedData);
      router.push(`/products/${product.id}`);
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      setError('Erro ao atualizar produto. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse bg-gray-200 h-8 w-1/4 mb-8"></div>
        <div className="animate-pulse bg-gray-200 rounded-lg h-96"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error || 'Produto não encontrado'}
        </div>
        <button
          onClick={() => router.push('/products')}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Voltar para produtos
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Editar Produto</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}