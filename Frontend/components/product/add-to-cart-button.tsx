"use client"

import { useState } from "react"
import { Check, Loader2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    material: string
  }
  className?: string
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { addItem } = useCart()

  const handleClick = async () => {
    if (isAdding || isAdded) return

    setIsAdding(true)
    await addItem({
      ...product,
      quantity: 1
    })

    setIsAdding(false)
    setIsAdded(true)

    // Reset button after 2 seconds
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isAdding || isAdded}
      className={cn(
        "transition-all duration-200",
        isAdded && "bg-green-600 hover:bg-green-600",
        className
      )}
    >
      {isAdding ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : isAdded ? (
        <Check className="h-5 w-5" />
      ) : (
        <ShoppingCart className="h-5 w-5 mr-2" />
      )}
      {isAdding ? "Adding..." : isAdded ? "Added!" : "Add to Cart"}
    </Button>
  )
}