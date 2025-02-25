import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isHighRated = product.rating && product.rating.rate > 4.5;

  return (
    <div className={`rounded-lg border-[0.1px] shadow-md overflow-hidden transition-transform hover:scale-105 ${isHighRated ? 'border-2 border-yellow-400' : ''}`}>
      <Link href={`/products/${product.id}`}>
        <div className="bg-white relative h-48 w-full flex items-center justify-center p-4">
          <Image
            src={product.image}
            alt={product.title}
            width={120}
            height={120}
            className="object-contain h-full"
          />
          {isHighRated && (
            <Badge className="absolute top-2 right-2 bg-yellow-400 text-black">
              ⭐
            </Badge>
          )}
        </div>

        <div className="p-4 bg-gray-50">
          <h3 className="text-base font-semibold text-gray-800 truncate" title={product.title}>
            {product.title.length > 30
              ? `${product.title.substring(0, 27)}...`
              : product.title}
          </h3>

          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold text-cyan-600">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            <div className="flex items-center">
              <span className="text-sm text-gray-400 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {product.rating?.rate} ({product.rating?.count})
              </span>
            </div>
          </div>

          <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full">
            {product.category}
          </span>
        </div>
      </Link>
    </div>
  );
};