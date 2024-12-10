"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWishlist, WishlistItem } from "@/hooks/use-wishlist";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  brand: string;
  original_price: string; // String to match API response
  discounted_price?: string; // Optional for discounts
  image: string;
}

export function ProductCard({
  id,
  name,
  description,
  brand,
  original_price,
  discounted_price,
  image,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAnimating(true);

    const item: WishlistItem = {
      id,
      name,
      price: parseFloat(discounted_price || original_price), // Use discounted price if available
      image,
      material: brand, // Assuming brand is equivalent to material
    };

    if (isInWishlist(id)) {
      removeItem(id);
    } else {
      const success = addItem(item);
      if (!success) {
        setIsAnimating(false);
        console.log("Failed to add item to wishlist"); // Log failure to add item
        return;
      }
    }

    // Reset animation
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link href={`/product/${id}`}>
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="rounded object-cover"
          />
        </div>
      </Link>

      {/* Wishlist Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleWishlistClick}
        className={cn(
          "absolute top-4 right-4 bg-white/80 backdrop-blur-sm transition-all duration-300",
          isHovered ? "opacity-100" : "opacity-0",
          isAnimating && "scale-110",
          isInWishlist(id) && "text-red-600 border-red-600"
        )}
      >
        <Heart
          className={cn("h-4 w-4", isAnimating && "animate-ping")}
        />
      </Button>

      {/* Product Details */}
      <div className="mt-4 space-y-1">
        <Link href={`/product/${id}`}>
          <h3 className="text-sm font-medium">{name}</h3>
        </Link>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-sm font-medium">
          ₹{parseFloat(discounted_price || original_price).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
