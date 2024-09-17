'use client';

import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '../../services/products';
import ProductCard from '../../components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        // Ensure the error is a string
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full py-6 grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4 px-0">
      {products.length === 0 ? (
        <p className="text-center text-gray-500 col-span-2 md:col-span-2 lg:col-span-4">
          No products available
        </p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductsPage;
