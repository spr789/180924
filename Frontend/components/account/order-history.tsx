import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const orderHistory = [
  {
    id: "8923",
    date: "15 December 2022",
    status: "Delivered",
    total: "₹899",
    items: 2
  },
  {
    id: "8922",
    date: "10 December 2022",
    status: "Delivered",
    total: "₹1,299",
    items: 1
  },
  {
    id: "8921",
    date: "5 December 2022",
    status: "Delivered",
    total: "₹599",
    items: 3
  }
]

export function OrderHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>
          View all your past orders and their details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderHistory.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items} items</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Badge 
                    variant={order.status === "Delivered" ? "success" : "secondary"}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}