"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const orders = [
  {
    id: "ORD001",
    customer: "John Doe",
    product: "Diamond Solitaire Ring",
    date: "2024-03-15",
    amount: "₹89,999",
    status: "completed",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    product: "Pearl Necklace",
    date: "2024-03-14",
    amount: "₹45,999",
    status: "processing",
  },
  {
    id: "ORD003",
    customer: "Mike Johnson",
    product: "Gold Bangles Set",
    date: "2024-03-14",
    amount: "₹125,999",
    status: "pending",
  },
]

const statusStyles = {
  completed: "bg-green-100 text-green-700",
  processing: "bg-blue-100 text-blue-700",
  pending: "bg-yellow-100 text-yellow-700",
}

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Badge
                    className={statusStyles[order.status as keyof typeof statusStyles]}
                    variant="secondary"
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}