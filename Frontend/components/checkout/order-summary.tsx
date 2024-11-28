'use client';

import Image from 'next/image';
import { useCart } from '@/contexts/cart-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function OrderSummary() {
  const { items, totalAmount } = useCart();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative h-16 w-16">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                <p className="font-medium">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>

        <div className="mt-4 rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 font-medium">Secure Checkout</h4>
          <p className="text-sm text-gray-600">
            Your payment information is encrypted and secure. We never store
            your card details.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
