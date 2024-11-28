'use client';

import { useState } from 'react';
import { CreditCard, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';

export function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <Label
            htmlFor="card"
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
              paymentMethod === 'card' ? 'border-primary' : 'border-gray-200'
            }`}
          >
            <RadioGroupItem value="card" id="card" />
            <CreditCard className="h-5 w-5" />
            <div>
              <span className="font-medium">Credit/Debit Card</span>
            </div>
          </Label>

          <Label
            htmlFor="upi"
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
              paymentMethod === 'upi' ? 'border-primary' : 'border-gray-200'
            }`}
          >
            <RadioGroupItem value="upi" id="upi" />
            <Wallet className="h-5 w-5" />
            <div>
              <span className="font-medium">UPI</span>
            </div>
          </Label>
        </RadioGroup>

        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  type="password"
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'upi' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="upiId">UPI ID</Label>
              <Input id="upiId" placeholder="username@upi" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
