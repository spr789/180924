"use client"

import { useState } from "react"
import { ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CartItems } from "./cart-items"
import { CartSummary } from "./cart-summary"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"

export function CartSheet() {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems } = useCart()

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
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className={cn(
          "flex flex-col w-full sm:max-w-lg border-l",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:slide-out-to-right",
          "data-[state=open]:slide-in-from-right"
        )}
      >
        <SheetHeader className="space-y-2.5 pb-6 border-b">
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
              <X className="w-5 h-5" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          <CartItems />
        </div>

        <CartSummary onCheckout={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}