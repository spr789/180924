'use client';

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Edit2 } from 'lucide-react';

export function AccountMain() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* User Info Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold">
              {user?.profile?.first_name?.[0]}
              {user?.profile?.last_name?.[0]}
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {user?.profile?.first_name} {user?.profile?.last_name}
              </h2>
              <div className="mt-1 text-gray-600">
                Email: {user?.email}
                <br />
                Phone: {user?.profile?.phone_number}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Addresses */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Saved Addresses</h3>
          <Button variant="outline" size="sm">
            Add New Address
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-gray-500" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Home</span>
                  <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
                    Default
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  United States, 3601 Old Capitol Trail, Unit A-7, Suite
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-gray-500" />
              <div>
                <span className="font-medium">Office</span>
                <p className="mt-1 text-sm text-gray-600">
                  Moscow city, Street name, Building lenin, House 77
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Orders */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <Button variant="outline" size="sm">
            View All Orders
          </Button>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="font-medium">Order #8924</span>
                <span className="ml-4 text-sm text-gray-600">
                  16 December 2022
                </span>
              </div>
              <span className="rounded bg-green-100 px-2 py-1 text-sm text-green-600">
                Shipped
              </span>
            </div>
            <div className="text-sm text-gray-600">Total: ₹456 • 2 items</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
