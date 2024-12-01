"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function AddressForm() {
  const [formData, setFormData] = useState({
    type: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Address Type</Label>
        <Input
          id="type"
          placeholder="Home, Office, etc."
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="street">Street Address</Label>
        <Input
          id="street"
          placeholder="Street address, apartment, suite, etc."
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="zipCode">ZIP Code</Label>
        <Input
          id="zipCode"
          value={formData.zipCode}
          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="default"
          checked={formData.isDefault}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isDefault: checked as boolean })
          }
        />
        <Label htmlFor="default">Set as default address</Label>
      </div>

      <Button type="submit" className="w-full">
        Save Address
      </Button>
    </form>
  )
}