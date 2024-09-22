'use client';

import React from 'react';
import { Product } from '../../services/products';
import { FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Import useRouter

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter(); // Initialize router
  const images = product.images || [];
  const baseUrl = 'http://localhost:8000/media'; // Base URL for images
  const imagePath = images.length > 0 ? images[0].image : '/default-image.jpg';
  const imageUrl = imagePath.startsWith('/media') ? `http://localhost:8000${imagePath}` : `${baseUrl}${imagePath}`;
  const altText = images.length > 0 ? images[0].alt_text || 'Default alt text' : 'Default alt text';

  // Function to create a slug from the product name
  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
      .replace(/^-|-$/g, ''); // Remove leading and trailing hyphens
  };

  const handleProductClick = () => {
    const slug = createSlug(product.name); // Create a slug from the product name
    router.push(`/products/${slug}`); // Navigate to product details page
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden shadow-sm">
      <img
        src={imageUrl}
        alt={altText}
        loading="lazy"
        className="w-full h-48 object-cover cursor-pointer"
        onClick={handleProductClick} // Add click handler to the image
      />
      <div className="p-2">
        <h3 className="text-md font-semibold">{product.name}</h3>
        <p className="mt-1 text-lg font-bold">${product.discounted_price || product.original_price}</p>
        <div className="mt-2 flex justify-between items-center">
          <button
            className="flex items-center bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={handleProductClick} // Add click handler to the button
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
