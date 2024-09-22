import api from './api';
import { Product } from './Product';

// Fetch product details by slug
export const fetchProductDetails = async (slug: string): Promise<Product | null> => {
  try {
    const response = await api.get<Product>(`/products/products/${slug}/`); // Adjust the URL as per your Django API
    return response.data;
  } catch (error) {
    console.error(`Error fetching product details for slug: ${slug}`, error);
    throw error;
  }
};
