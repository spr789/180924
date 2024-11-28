import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, MapPin } from 'lucide-react';

const newOrders = [
  {
    id: '8924',
    date: '16 December 2022',
    status: 'Processing',
    total: '₹456',
    items: [
      {
        name: 'Diamond Solitaire Ring',
        quantity: 1,
        price: '₹25,999',
      },
    ],
    shippingAddress: 'United States, 3601 Old Capitol Trail, Unit A-7, Suite',
    estimatedDelivery: '20 December 2022',
  },
];

export function NewOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Orders</CardTitle>
        <CardDescription>Track and manage your recent orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {newOrders.map((order) => (
            <div key={order.id} className="rounded-lg border p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <Badge variant="secondary">{order.status}</Badge>
              </div>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Package className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity} • Price: {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-3 border-t pt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Shipping Address</p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Estimated Delivery</p>
                    <p className="text-sm text-gray-600">
                      {order.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button>Track Order</Button>
                <Button variant="outline">View Details</Button>
              </div>
            </div>
          ))}

          {newOrders.length === 0 && (
            <div className="py-6 text-center">
              <Package className="mx-auto mb-3 h-12 w-12 text-gray-400" />
              <h3 className="text-lg font-medium">No New Orders</h3>
              <p className="text-gray-600">
                You don't have any new orders at the moment.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
