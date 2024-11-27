import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductSort } from "./ProductSort";
import { Button } from "@/components/ui/button";
import { useProducts } from "../hooks/useProducts";
import { useWishlist } from "@/contexts/wishlist-context";
import type { Product } from "../types";

interface ProductGridProps {
  initialProducts?: Product[];
}

export function ProductGrid({ initialProducts }: ProductGridProps) {
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const { products, loading, totalCount, fetchProducts } = useProducts();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const productsPerPage = 12;
  const totalPages = Math.ceil((products?.length || 0) / productsPerPage);

  const handleSort = async (value: string) => {
    setSortBy(value);
    await fetchProducts({ sortBy: value as any });
  };

  const handleWishlistClick = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        material: product.material,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {products?.length || 0} products
        </p>
        <ProductSort value={sortBy} onValueChange={handleSort} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(products || initialProducts)?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onWishlistClick={() => handleWishlistClick(product)}
            isInWishlist={isInWishlist(product.id)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              onClick={() => setPage(i + 1)}
              disabled={loading}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || loading}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}