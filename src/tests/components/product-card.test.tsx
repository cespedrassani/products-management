import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductCard } from '@/components/product/product-card';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => <img {...props} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode, href: string }) => (
    <a href={href}> {children} </a>
  ),
}));

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'This is a test product',
    category: 'electronics',
    image: 'https://example.com/image.jpg',
    rating: { rate: 4.5, count: 120 },
  };

  const highRatedProduct = {
    ...mockProduct,
    rating: { rate: 4.6, count: 120 },
  };

  it('should render the product correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product'));
    expect(screen.getByText('R$ 99,99'))
    expect(screen.getByText('electronics'))
    expect(screen.getByText('4.5 (120)'))
    expect(screen.getByAltText('Test Product'));
  });

  it('should add special styling for high-rated products', () => {
    render(<ProductCard product={highRatedProduct} />);

    expect(screen.getByText('⭐'))
  });

  it('should truncate long product titles', () => {
    const longTitleProduct = {
      ...mockProduct,
      title: 'This is a very long product title that should be truncated in the UI',
    };

    render(<ProductCard product={longTitleProduct} />);

    expect(screen.getByTitle(longTitleProduct.title));
  });
});