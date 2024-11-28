'use client';

import { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CartItems } from './cart-items';
import { CartSummary } from './cart-summary';
import { useCart } from '@/contexts/cart-context';
import { cn } from '@/lib/utils';

export function CartSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-white hover:text-white/90"
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className={cn(
          'flex w-full flex-col border-l sm:max-w-lg',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:slide-out-to-right',
          'data-[state=open]:slide-in-from-right'
        )}
      >
        <SheetHeader className="space-y-2.5 border-b pb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">
              Shopping Cart {totalItems > 0 && `(${totalItems})`}
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          <CartItems />
        </div>

        <CartSummary onCheckout={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
