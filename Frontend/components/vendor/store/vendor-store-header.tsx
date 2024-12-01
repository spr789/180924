import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface VendorStoreHeaderProps {
  name: string
  rating: number
  description: string
}

export function VendorStoreHeader({ name, rating, description }: VendorStoreHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{name}</h1>
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">{rating}</span>
              </div>
            </div>
            <p className="mt-2 text-gray-600">{description}</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline">Contact Seller</Button>
            <Button>Follow Store</Button>
          </div>
        </div>
      </div>
    </div>
  )
}