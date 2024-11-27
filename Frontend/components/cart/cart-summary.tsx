"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"

interface CartSummaryProps {
  onCheckout?: () => void
}

export function CartSummary({ onCheckout }: CartSummaryProps) {
  const { totalAmount } = useCart()

  return (
    <div className="border-t bg-white p-6 space-y-4">
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span>₹{totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <Separator />
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>₹{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <Button 
        asChild 
        className="w-full h-11 text-base font-medium"
        onClick={onCheckout}
      >
        <Link href="/checkout">
          Proceed to Checkout
        </Link>
      </Button>

      <p className="text-xs text-center text-gray-500">
        Shipping & taxes calculated at checkout
      </p>
    </div>
  )
}