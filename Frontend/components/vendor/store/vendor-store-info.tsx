import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Award, Package } from "lucide-react"

interface VendorStoreInfoProps {
  location: string
  memberSince: string
  totalProducts: number
  metrics: {
    responseRate: string
    shipOnTime: string
    rating: string
  }
  badges: string[]
}

export function VendorStoreInfo({
  location,
  memberSince,
  totalProducts,
  metrics,
  badges
}: VendorStoreInfoProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="font-semibold mb-4">Store Information</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <h3 className="font-medium">Location</h3>
              <p className="text-sm text-gray-600">{location}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <h3 className="font-medium">Member Since</h3>
              <p className="text-sm text-gray-600">{memberSince}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Package className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <h3 className="font-medium">Total Products</h3>
              <p className="text-sm text-gray-600">{totalProducts} Items</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold mb-4">Achievements</h2>
        <div className="space-y-3">
          {badges.map((badge, index) => (
            <div key={badge} className="flex items-center gap-2">
              <Award className={`w-5 h-5 ${
                index === 0 ? "text-yellow-500" :
                index === 1 ? "text-blue-500" :
                "text-green-500"
              }`} />
              <Badge variant="secondary">{badge}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold mb-4">Store Metrics</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Response Rate</span>
            <span className="font-medium">{metrics.responseRate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ship on Time</span>
            <span className="font-medium">{metrics.shipOnTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Customer Rating</span>
            <span className="font-medium">{metrics.rating}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}