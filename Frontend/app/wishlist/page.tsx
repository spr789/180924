'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCart } from '@/contexts/cart-context';

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();

  const handleMoveToCart = (item: any) => {
    addToCart({
      ...item,
      quantity: 1,
    });
    removeItem(item.id);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16">
        <div className="container max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              My Wishlist ({items.length} items)
            </h1>
            {items.length > 0 && (
              <Button variant="outline" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="rounded-lg bg-gray-50 py-16 text-center">
              <h2 className="mb-4 text-xl font-medium">
                Your Wishlist is Empty
              </h2>
              <p className="mb-8 text-gray-600">
                Save items you love for later by clicking the heart icon.
              </p>
              <Button asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-lg bg-white shadow-sm"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.material}</p>
                    <p className="mt-1 font-medium">₹{item.price}</p>
                    <div className="mt-4 flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => handleMoveToCart(item)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
