'use client';

import { MapPin } from 'lucide-react';
import Link from 'next/link';

export function TopBanner() {
  return (
    <div className="bg-red-600 px-4 py-2 text-white">
      <div className="container mx-auto flex items-center justify-between text-sm">
        <div className="flex-1 text-center">
          Free Shipping Anywhere in India for orders above Rs.499
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <Link href="/stores" className="hover:underline">
            Locate Stores
          </Link>
        </div>
      </div>
    </div>
  );
}
