import React from 'react';
import { Product } from '../services/products';
// Import icons (using FontAwesome as an example, you can replace with your own icons)
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Handle undefined images
  const images = product.images || [];
  const baseUrl = 'http://localhost:8000/media'; // Base URL for images
  const imagePath = images.length > 0 ? images[0].image : '/default-image.jpg';
  const imageUrl = imagePath.startsWith('/media') ? `http://localhost:8000${imagePath}` : `${baseUrl}${imagePath}`;
  const altText = images.length > 0 ? images[0].alt_text || 'Default alt text' : 'Default alt text';

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <img
        src={imageUrl}
        alt={altText}
        loading="lazy"
        className="w-full h-48 object-cover"
      />
      <div className="p-2">
        <h3 className="text-md font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <p className="mt-1 text-lg font-bold">${product.discounted_price || product.original_price}</p>
        
        {/* Add to Cart and Wishlist buttons */}
        <div className="mt-2 flex justify-between items-center">
          <button
            className="flex items-center bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>
          <button
            className="flex items-center bg-red-500 text-white text-sm px-3 py-2 rounded hover:bg-red-600 transition"
          >
            <FaHeart className="mr-2" /> Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
