'use client';

import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const stats = [
  {
    title: 'Total Revenue',
    value: '₹45,231',
    change: '+20.1%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Total Orders',
    value: '356',
    change: '+12.5%',
    trend: 'up',
    icon: ShoppingCart,
  },
  {
    title: 'Total Customers',
    value: '2,345',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Products in Stock',
    value: '1,456',
    change: '-2.4%',
    trend: 'down',
    icon: Package,
  },
];

export function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isUp = stat.trend === 'up';

        return (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  {stat.title}
                </span>
                <div className="rounded-lg bg-gray-50 p-2">
                  <Icon className="h-5 w-5 text-gray-600" />
                </div>
              </div>

              <div className="mt-4">
                <span className="text-2xl font-bold">{stat.value}</span>
                <div className="mt-1 flex items-center">
                  <span
                    className={cn(
                      'text-sm font-medium',
                      isUp ? 'text-green-600' : 'text-red-600'
                    )}
                  >
                    {isUp ? (
                      <ArrowUpRight className="mr-1 inline h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="mr-1 inline h-4 w-4" />
                    )}
                    {stat.change}
                  </span>
                  <span className="ml-1 text-sm text-gray-600">
                    vs last month
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
