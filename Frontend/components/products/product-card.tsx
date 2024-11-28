'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useWishlist, WishlistItem } from '@/hooks/use-wishlist';

interface ProductCardProps {
  id: string;
  name: string;
  material: string;
  price: number;
  image: string;
}

export function ProductCard({
  id,
  name,
  material,
  price,
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
      price,
      image,
      material,
    };

    if (isInWishlist(id)) {
      removeItem(id);
    } else {
      const success = addItem(item);
      if (!success) {
        setIsAnimating(false);
        return;
      }
    }

    // Reset animation after it completes
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${id}`}>
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={image}
            alt={name}
            width={500}
            height={500}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <Button
        variant="outline"
        size="icon"
        onClick={handleWishlistClick}
        className={cn(
          'absolute right-4 top-4 bg-white/80 backdrop-blur-sm transition-all duration-300',
          isHovered ? 'opacity-100' : 'opacity-0',
          isAnimating && 'scale-110',
          isInWishlist(id) && 'border-red-600 text-red-600'
        )}
      >
        <Heart className={cn('h-4 w-4', isAnimating && 'animate-ping')} />
      </Button>

      <div className="mt-4 space-y-1">
        <Link href={`/product/${id}`}>
          <h3 className="text-sm font-medium">{name}</h3>
        </Link>
        <p className="text-sm text-gray-600">{material}</p>
        <p className="text-sm font-medium">₹{price.toLocaleString()}</p>
      </div>
    </div>
  );
}
