"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Edit2 } from "lucide-react"

export function AccountMain() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* User Info Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-xl font-semibold">
              {user?.profile?.first_name?.[0]}{user?.profile?.last_name?.[0]}
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {user?.profile?.first_name} {user?.profile?.last_name}
              </h2>
              <div className="text-gray-600 mt-1">
                Email: {user?.email}
                <br />
                Phone: {user?.profile?.phone_number}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Addresses */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Saved Addresses</h3>
          <Button variant="outline" size="sm">Add New Address</Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1 text-gray-500" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Home</span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">Default</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  United States, 3601 Old Capitol Trail, Unit A-7, Suite
                </p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1 text-gray-500" />
              <div>
                <span className="font-medium">Office</span>
                <p className="text-sm text-gray-600 mt-1">
                  Moscow city, Street name, Building lenin, House 77
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Orders */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <Button variant="outline" size="sm">View All Orders</Button>
        </div>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-medium">Order #8924</span>
                <span className="text-sm text-gray-600 ml-4">16 December 2022</span>
              </div>
              <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">Shipped</span>
            </div>
            <div className="text-sm text-gray-600">
              Total: ₹456 • 2 items
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}