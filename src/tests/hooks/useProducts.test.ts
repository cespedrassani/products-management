import { renderHook, act } from '@testing-library/react-hooks';
import { useProducts } from '@/hooks/useProducts';
import { ProductService } from '@/lib/api';

jest.mock('@/lib/api', () => ({
  ProductService: {
    getProducts: jest.fn(),
  },
}));

describe('useProducts', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Product 1',
      price: 10.99,
      description: 'Description 1',
      category: 'electronics',
      image: 'image1.jpg',
      rating: { rate: 4.2, count: 100 },
    },
    {
      id: 2,
      title: 'Product 2',
      price: 20.99,
      description: 'Description 2',
      category: 'clothing',
      image: 'image2.jpg',
      rating: { rate: 4.7, count: 200 },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch products on mount', async () => {
    (ProductService.getProducts as jest.Mock)
      .mockResolvedValueOnce(mockProducts)
      .mockResolvedValueOnce(mockProducts);

    const { result, waitForNextUpdate } = renderHook(() =>
      useProducts({ page: 1, limit: 10 })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual([
      mockProducts[1],
      mockProducts[0],
    ]);
    expect(result.current.totalPages).toBe(1);
    expect(ProductService.getProducts).toHaveBeenCalledTimes(2);
  });

  it('should update filters and refresh products', async () => {
    (ProductService.getProducts as jest.Mock)
      .mockResolvedValueOnce(mockProducts)
      .mockResolvedValueOnce(mockProducts)
      .mockResolvedValueOnce([mockProducts[0]])
      .mockResolvedValueOnce([mockProducts[0]]);

    const { result, waitForNextUpdate } = renderHook(() =>
      useProducts({ page: 1, limit: 10 })
    );

    await waitForNextUpdate();

    act(() => {
      result.current.updateFilters({ category: 'electronics' });
    });

    expect(result.current.filters.category).toBe('electronics');
    expect(result.current.filters.page).toBe(1);

    await waitForNextUpdate();

    expect(ProductService.getProducts).toHaveBeenCalledWith(
      expect.objectContaining({ category: 'electronics' })
    );
  });

  it('should handle pagination correctly', async () => {
    (ProductService.getProducts as jest.Mock)
      .mockResolvedValueOnce([...mockProducts, ...mockProducts])
      .mockResolvedValueOnce(mockProducts)
      .mockResolvedValueOnce([...mockProducts, ...mockProducts])
      .mockResolvedValueOnce(mockProducts.slice(1));

    const { result, waitForNextUpdate } = renderHook(() =>
      useProducts({ page: 1, limit: 2 })
    );

    await waitForNextUpdate();

    expect(result.current.totalPages).toBe(2);

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.filters.page).toBe(2);

    await waitForNextUpdate();

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.filters.page).toBe(1);
  });
});