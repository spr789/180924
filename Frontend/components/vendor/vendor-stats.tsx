import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Package, ShoppingCart, DollarSign, Users } from "lucide-react"

export function VendorStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹15,350.25</div>
          <div className="flex items-center text-sm text-green-600">
            <ArrowUpRight className="mr-1 h-4 w-4" />
            25.25%
            <span className="text-gray-600 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">32,350</div>
          <div className="flex items-center text-sm text-green-600">
            <ArrowUpRight className="mr-1 h-4 w-4" />
            10.25%
            <span className="text-gray-600 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,360</div>
          <div className="flex items-center text-sm text-red-600">
            <ArrowDownRight className="mr-1 h-4 w-4" />
            2.95%
            <span className="text-gray-600 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,250</div>
          <div className="flex items-center text-sm text-green-600">
            <ArrowUpRight className="mr-1 h-4 w-4" />
            15.25%
            <span className="text-gray-600 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}