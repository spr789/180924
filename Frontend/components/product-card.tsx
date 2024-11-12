"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  id: string
  name: string
  material: string
  price: number
  image: string
}

export function ProductCard({
  id,
  name,
  material,
  price,
  image
}: ProductCardProps) {
  return (
    <div className="group relative">
      <Link href={`/product/${id}`}>
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={image}
            alt={name}
            width={500}
            height={500}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart className="h-4 w-4" />
      </Button>

      <div className="mt-4 space-y-1">
        <Link href={`/product/${id}`}>
          <h3 className="text-sm font-medium">{name}</h3>
        </Link>
        <p className="text-sm text-gray-600">{material}</p>
        <p className="text-sm font-medium">₹{price?.toLocaleString() || '0'}</p>
      </div>
    </div>
  )
}