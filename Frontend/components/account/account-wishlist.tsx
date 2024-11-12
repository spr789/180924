import { ProductCard } from "@/components/product-card"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const wishlistItems = [
  {
    id: "1",
    name: "Diamond Solitaire Ring",
    material: "18K White Gold",
    price: 89999,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e"
  },
  {
    id: "2",
    name: "Pearl Necklace",
    material: "Fresh Water Pearls",
    price: 45999,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
  },
  // Add more items as needed
]

export function AccountWishlist() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Wishlist</CardTitle>
        <CardDescription>
          Items you've saved for later
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              material={item.material}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}