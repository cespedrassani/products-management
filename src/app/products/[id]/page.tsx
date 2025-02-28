'use client';

import { useState, useEffect, use, type Usable } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { ProductService } from '@/lib/api';
import { ProductDeleteDialog } from '@/components/product/product-delete-dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

export default function ProductDetailPage({ params }: { params: Usable<{ id: string }> }) {
  const unwrappedParams = use<{ id: string }>(params);
  const id = unwrappedParams.id;
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

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

  const handleDelete = async () => {
    try {
      if (!product) return;
      await ProductService.deleteProduct(product.id);
      router.push('/products');
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      setError('Erro ao excluir produto. Por favor, tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse bg-gray-200 h-8 w-1/4 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="animate-pulse bg-gray-200 rounded-lg h-80"></div>
          <div className="space-y-4">
            <div className="animate-pulse bg-gray-200 h-8 w-3/4"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-1/4"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-full"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-full"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error || 'Produto não encontrado'}
        </div>
        <Link href="/products">
          <Button variant="outline">Voltar para produtos</Button>
        </Link>
      </div>
    );
  }

  const isHighRated = product.rating && product.rating.rate > 4.5;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg border-[0.1px] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
              className="object-contain"
            />
          </div>

          <div className="p-8 bg-gray-50">
            <div className='flex items-center gap-4 mb-4'>
              {isHighRated && (
                <div className="bg-yellow-400 text-black px-3 py-1 h-8 w-8 flex items-center justify-center rounded-md font-medium text-sm">
                  ⭐
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
            </div>

            <div className="flex items-center mb-4 justify-between">
              <span className="text-2xl font-bold text-lime-700 mr-4">
                {formatCurrency(product.price)}
              </span>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-400">
                  {product.rating?.rate} ({product.rating?.count} avaliações)
                </span>
              </div>
            </div>

            <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>

            <p className="text-black font-normal text-sm mb-6">{product.description}</p>

            <div className="flex items-end justify-end space-x-4">
              <Link href="/products">
                <Button variant="outline">Voltar</Button>
              </Link>
              <Link href={`/products/edit/${product.id}`}>
                <Button variant="secondary">Editar</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Excluir
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ProductDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        productName={product.title}
      />
    </div>
  );
}