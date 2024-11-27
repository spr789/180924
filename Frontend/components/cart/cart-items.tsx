"use client"

import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"

export function CartItems() {
  const { items, updateQuantity, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center px-4">
        <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
        <p className="text-gray-500 text-sm">
          Add items to your cart to see them here
        </p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-full px-6">
      <div className="space-y-6 pb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-start"
          >
            <div className="relative aspect-square w-20 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate pr-8">{item.name}</h4>
              <p className="text-sm text-gray-500 mt-1">{item.material}</p>
              <p className="font-medium mt-1">₹{item.price.toLocaleString()}</p>
              
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-none",
                      "hover:bg-gray-100 hover:text-gray-900"
                    )}
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-none",
                      "hover:bg-gray-100 hover:text-gray-900"
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
  )
}