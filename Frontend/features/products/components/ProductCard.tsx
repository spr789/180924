import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onWishlistClick?: () => void;
  isInWishlist?: boolean;
}

export function ProductCard({ product, onWishlistClick, isInWishlist }: ProductCardProps) {
  return (
    <div className="group relative">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      {onWishlistClick && (
        <Button
          variant="outline"
          size="icon"
          onClick={onWishlistClick}
          className={`absolute top-4 right-4 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity ${
            isInWishlist ? 'text-red-600' : ''
          }`}
        >
          <Heart className="h-4 w-4" />
        </Button>
      )}

      <div className="mt-4 space-y-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-600">{product.material}</p>
        <p className="text-sm font-medium">₹{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}