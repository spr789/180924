"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/contexts/cart-context"

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()
  const { addItem: addToCart } = useCart()

  const handleMoveToCart = (item: any) => {
    addToCart({
      ...item,
      quantity: 1
    })
    removeItem(item.id)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">My Wishlist ({items.length} items)</h1>
            {items.length > 0 && (
              <Button variant="outline" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-medium mb-4">Your Wishlist is Empty</h2>
              <p className="text-gray-600 mb-8">
                Save items you love for later by clicking the heart icon.
              </p>
              <Button asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
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
                    <p className="font-medium mt-1">₹{item.price}</p>
                    <div className="flex gap-2 mt-4">
                      <Button 
                        className="flex-1"
                        onClick={() => handleMoveToCart(item)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
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
  )
}