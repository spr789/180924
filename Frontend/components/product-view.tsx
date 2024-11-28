'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Heart,
  Minus,
  Plus,
  Star,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/hooks/use-wishlist';
import { Product } from '@/lib/api/types/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { AddToCartButton } from '@/components/product/add-to-cart-button';

interface ProductViewProps {
  product: Product;
}

export function ProductView({ product }: ProductViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const {
    addItem: addToWishlist,
    isInWishlist,
    removeItem: removeFromWishlist,
  } = useWishlist();
  const { toast } = useToast();
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleWishlistClick = () => {
    setIsWishlistAnimating(true);

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      const success = addToWishlist({
        id: product.id,
        name: product.name,
        price: product.sale_price || product.price,
        image: product.images[0],
        material: product.category,
      });
      if (!success) {
        setIsWishlistAnimating(false);
        return;
      }
    }

    setTimeout(() => setIsWishlistAnimating(false), 300);
  };

  return (
    <div className="grid gap-8 py-6 md:grid-cols-2">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                'relative aspect-square overflow-hidden rounded-lg bg-gray-100',
                selectedImage === index && 'ring-2 ring-primary'
              )}
            >
              <Image
                src={image}
                alt={`${product.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-5 w-5',
                    i < Math.floor(product.rating)
                      ? 'fill-current text-yellow-400'
                      : 'text-gray-300'
                  )}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({product.reviews_count} reviews)
              </span>
            </div>
            {product.stock < 10 && (
              <Badge variant="destructive">Only {product.stock} left</Badge>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {product.sale_price ? (
              <>
                <p className="text-3xl font-bold text-primary">
                  ₹{product.sale_price}
                </p>
                <p className="text-lg text-gray-500 line-through">
                  ₹{product.price}
                </p>
              </>
            ) : (
              <p className="text-3xl font-bold">₹{product.price}</p>
            )}
          </div>
          <p className="text-sm text-gray-600">(Incl. of all taxes)</p>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                className="mx-2 w-16 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: product.sale_price || product.price,
                image: product.images[0],
                material: product.category,
              }}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleWishlistClick}
              className={cn(
                'transition-all duration-300',
                isWishlistAnimating && 'scale-110',
                isInWishlist(product.id) && 'border-red-600 text-red-600'
              )}
            >
              <Heart
                className={cn('h-5 w-5', isWishlistAnimating && 'animate-ping')}
              />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4" />
              {product.free_shipping ? 'Free Shipping' : 'Standard Shipping'}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4" />
              Secure Checkout
            </div>
            {product.returnable && (
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-4 w-4" />
                Easy Returns
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Product Description</h2>
          <p className="whitespace-pre-line text-gray-600">
            {product.description}
          </p>
        </div>

        {product.vendor && (
          <div className="rounded-lg bg-gray-50 p-4">
            <h2 className="mb-2 font-semibold">
              Sold by {product.vendor.name}
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-400" />
                <span>{product.vendor.rating}</span>
              </div>
              <span>•</span>
              <span>{product.vendor.products_count} Products</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
