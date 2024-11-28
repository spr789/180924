'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/contexts/cart-context';
import { cn } from '@/lib/utils';

export function CartItems() {
  const { items, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center px-4 text-center">
        <ShoppingCart className="mb-4 h-12 w-12 text-gray-400" />
        <h3 className="mb-2 text-lg font-medium">Your cart is empty</h3>
        <p className="text-sm text-gray-500">
          Add items to your cart to see them here
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full px-6">
      <div className="space-y-6 pb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            <div className="relative aspect-square w-20 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="truncate pr-8 text-sm font-medium">{item.name}</h4>
              <p className="mt-1 text-sm text-gray-500">{item.material}</p>
              <p className="mt-1 font-medium">₹{item.price.toLocaleString()}</p>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center rounded-lg border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'h-8 w-8 rounded-none',
                      'hover:bg-gray-100 hover:text-gray-900'
                    )}
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'h-8 w-8 rounded-none',
                      'hover:bg-gray-100 hover:text-gray-900'
                    )}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-red-600"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
