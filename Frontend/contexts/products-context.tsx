import React, { createContext, useContext, ReactNode } from 'react';
import { useProducts } from '@/lib/api/hooks/useProducts';
import { Product } from '@/lib/api/types/product';

interface ProductsContextType {
  products: Product[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const { products, isLoading, error } = useProducts();

  return (
    <ProductsContext.Provider value={{ products: products?.data?.items, isLoading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
};
