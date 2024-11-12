import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    name: "Samsung Galaxy-M1",
    stock: "00",
    amount: "₹152.25",
  },
  {
    name: "Nike Shoes",
    stock: "00",
    amount: "₹125.25",
  },
  // Add more products as needed
]

export function VendorProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Out Products</CardTitle>
        <CardDescription>
          Products that need to be restocked
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <Badge variant="destructive" className="mt-1">
                  Stock: {product.stock}
                </Badge>
              </div>
              <span className="font-medium">{product.amount}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}