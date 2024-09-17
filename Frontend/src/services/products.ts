import api from './api';

export interface ProductImage {
  id: number;
  image: string;
  alt_text?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  original_price: number;
  discounted_price?: number;
  category: number;
  collections: number[];
  tags: number[];
  stock: number;
  sku: string;
  upc?: string;
  weight?: number;
  dimensions?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: ProductImage[]; // Ensure this matches the API response
}


export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>('/products/products/'); // Adjust endpoint as needed
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
