import { useRouter } from 'next/router'; // Updated import for useRouter
import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb'; // Ensure path is correct
import api from '../../services/api'; // Ensure this service exists
import { Product } from '../types'; // Ensure the Product type is correctly defined

const ProductDetail = () => {
  const router = useRouter();
  const { slug } = router.query; // Use slug from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return; // Make sure slug is available before fetching

    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/products/${slug}`); // Adjust the endpoint
        setProduct(response.data);
      } catch (error) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div>
      {/* Pass category and product name to the Breadcrumb */}
      <Breadcrumb category={product.category} productName={product.name} />
      
      <h1>{product.name}</h1>
      
      {/* Handle product image array properly */}
      {product.images && product.images.length > 0 ? (
        <img src={product.images[0].image} alt={product.images[0].alt_text || product.name} />
      ) : (
        <p>No image available</p>
      )}

      <p>{product.description}</p>

      {/* Price Handling: Original and Discounted Price */}
      <p>
        Price: {product.discounted_price ? (
          <>
            <span style={{ textDecoration: 'line-through' }}>${product.original_price}</span> &nbsp;
            <span>${product.discounted_price}</span>
          </>
        ) : (
          <span>${product.original_price}</span>
        )}
      </p>

      <p>Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>

      {/* AddToCartButton can be added here */}
      {/* <AddToCartButton productId={product.id} disabled={product.stock === 0} /> */}
    </div>
  );
};

export default ProductDetail;
