'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Store,
  Settings,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Vendors',
    href: '/dashboard/vendors',
    icon: Store,
  },
  {
    title: 'Products',
    href: '/dashboard/products',
    icon: Package,
  },
  {
    title: 'Orders',
    href: '/dashboard/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Customers',
    href: '/dashboard/customers',
    icon: Users,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

interface DashboardNavProps {
  isOpen: boolean;
}

export function DashboardNav({ isOpen }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'fixed left-0 h-full border-r bg-white transition-all duration-300',
        isOpen ? 'w-64' : 'w-0 md:w-16'
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex-1 space-y-1 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'mx-3 flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  isActive && 'bg-gray-50 font-medium text-gray-900',
                  !isOpen && 'md:mx-2 md:justify-center md:px-0'
                )}
              >
                <Icon className="h-5 w-5" />
                <span
                  className={cn(
                    'transition-opacity duration-300',
                    !isOpen && 'md:hidden'
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
