"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const collections = [
  {
    id: 1,
    name: "Royal Heritage",
    description: "Traditional designs with a modern twist",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2787&auto=format&fit=crop",
    items: 24,
  },
  {
    id: 2,
    name: "Contemporary Classics",
    description: "Minimalist designs for everyday wear",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2940&auto=format&fit=crop",
    items: 18,
  },
  {
    id: 3,
    name: "Bridal Elegance",
    description: "Exquisite pieces for your special day",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2940&auto=format&fit=crop",
    items: 32,
  },
  {
    id: 4,
    name: "Festive Collection",
    description: "Celebrate in style with our festive pieces",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=2940&auto=format&fit=crop",
    items: 28,
  },
  {
    id: 5,
    name: "Pearl Paradise",
    description: "Timeless pearl jewelry for every occasion",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=2940&auto=format&fit=crop",
    items: 15,
  },
  {
    id: 6,
    name: "Diamond Dreams",
    description: "Luxurious diamond pieces that sparkle",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=2940&auto=format&fit=crop",
    items: 20,
  },
]

export function CollectionGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative h-64">
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{collection.name}</h3>
            <p className="text-gray-600 mb-4">{collection.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{collection.items} items</span>
              <Link href={`/collection/${collection.id}`}>
                <Button variant="outline">View Collection</Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}