"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"

interface ProductImage {
  src: string
  alt: string
}

// Mock product data - in a real app, this would come from an API
const mockProduct = {
  id: "133356",
  name: "Antique Chain 133356",
  price: 650,
  rating: 4.8,
  description: "Elevate your style with a simple and sleek look with Kushal's collection of antique chains. Made of pure quality copper alloy, this chain is efficient for everyday use. This gold-polished jewellery will elevate your traditional attire.",
  images: [
    {
      src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
      alt: "Antique Chain - View 1"
    },
    {
      src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
      alt: "Antique Chain - View 2"
    }
  ],
  polish: "Gold",
  length: "16 inch",
  material: "Gold Plated"
}

export function ProductView({ productId }: { productId: string }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem: addToCart } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    addToCart({
      id: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      image: mockProduct.images[0].src,
      material: mockProduct.material
    })
  }

  const toggleWishlist = () => {
    if (isInWishlist(mockProduct.id)) {
      removeFromWishlist(mockProduct.id)
    } else {
      addToWishlist({
        id: mockProduct.id,
        name: mockProduct.name,
        price: mockProduct.price,
        image: mockProduct.images[0].src,
        material: mockProduct.material
      })
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={mockProduct.images[selectedImage].src}
            alt={mockProduct.images[selectedImage].alt}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {mockProduct.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg bg-gray-100",
                selectedImage === index && "ring-2 ring-red-600"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
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
          <h1 className="text-3xl font-bold">{mockProduct.name}</h1>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-${i < Math.floor(mockProduct.rating) ? 'yellow' : 'gray'}-400`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">{mockProduct.rating}</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-2xl font-bold">₹{mockProduct.price}</p>
          <p className="text-sm text-gray-600">(Incl. of all taxes)</p>
          <div className="flex items-center">
            <span className="text-green-600">Free Delivery</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Polish: {mockProduct.polish}</h3>
            <div className="inline-block rounded-full w-8 h-8 bg-yellow-600"></div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Length</h3>
            <Button variant="outline" className="rounded-full">
              {mockProduct.length}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              className="w-16 text-center mx-2"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            className="flex-1" 
            size="lg"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleWishlist}
            className={cn(
              isInWishlist(mockProduct.id) && "text-red-600 border-red-600"
            )}
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4 pt-6 border-t">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-medium text-red-600 mb-2">Make it a Gift!</h3>
            <p className="text-sm">Add Video, Card & Gift Box</p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Product Description</h3>
            <p className="text-gray-600">{mockProduct.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}