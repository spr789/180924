"use client"; // To make this component a Client Component for hooks

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { id } = router.query; // Fetch the product id from the URL

  // Fetch product data based on the ID
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${id}`); // Replace this URL with your API endpoint
          if (!response.ok) throw new Error("Product not found");
          const data = await response.json();
          setProduct(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      {product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-2xl text-blue-600 font-semibold">${product.price}</p>
            <p className="text-gray-700">{product.description}</p>

            <div className="space-y-2">
              <p className="font-semibold">Category: {product.category}</p>
            </div>

            {/* Add to Cart and Buy Now buttons */}
            <div className="flex space-x-4">
              <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg">
                Add to Cart
              </button>
              <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductPage;
