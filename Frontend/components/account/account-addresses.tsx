"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, MapPin, Pencil, Trash2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddressForm } from "@/components/account/address-form"

const addresses = [
  {
    id: 1,
    type: "Home",
    address: "United States, 3601 Old Capitol Trail, Unit A-7, Suite",
    isDefault: true,
  },
  {
    id: 2,
    type: "Office",
    address: "Moscow city, Street name, Building lenin, House 77",
    isDefault: false,
  },
]

export function AccountAddresses() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Saved Addresses</CardTitle>
            <CardDescription>
              Manage your shipping addresses
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border rounded-lg p-4 relative"
            >
              {address.isDefault && (
                <Badge className="absolute top-4 right-4">Default</Badge>
              )}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-gray-500" />
                <div className="flex-1">
                  <h3 className="font-medium">{address.type}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {address.address}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
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
  )
}