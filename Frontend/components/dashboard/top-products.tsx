"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    name: "Diamond Solitaire Ring",
    sales: 124,
    revenue: "₹89,999",
    trend: "up",
  },
  {
    name: "Pearl Necklace",
    sales: 98,
    revenue: "₹45,999",
    trend: "up",
  },
  {
    name: "Gold Bangles Set",
    sales: 85,
    revenue: "₹125,999",
    trend: "down",
  },
  {
    name: "Diamond Studs",
    sales: 76,
    revenue: "₹65,999",
    trend: "up",
  },
]

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">
                  {product.sales} sales • {product.revenue}
                </p>
              </div>
              <Badge variant={product.trend === "up" ? "default" : "secondary"}>
                {product.trend === "up" ? "Trending" : "Declining"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}