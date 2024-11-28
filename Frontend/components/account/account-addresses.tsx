'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, MapPin, Pencil, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddressForm } from '@/components/account/address-form';

const addresses = [
  {
    id: 1,
    type: 'Home',
    address: 'United States, 3601 Old Capitol Trail, Unit A-7, Suite',
    isDefault: true,
  },
  {
    id: 2,
    type: 'Office',
    address: 'Moscow city, Street name, Building lenin, House 77',
    isDefault: false,
  },
];

export function AccountAddresses() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Saved Addresses</CardTitle>
            <CardDescription>Manage your shipping addresses</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogDescription>
                  Enter the details for your new address
                </DialogDescription>
              </DialogHeader>
              <AddressForm />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <div key={address.id} className="relative rounded-lg border p-4">
              {address.isDefault && (
                <Badge className="absolute right-4 top-4">Default</Badge>
              )}
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <h3 className="font-medium">{address.type}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {address.address}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                    {!address.isDefault && (
                      <Button variant="outline" size="sm">
                        Set as Default
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
