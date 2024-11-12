"use client";

import { Wifi, WifiOff } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

export function OfflineBanner() {
  const { isOnline } = usePWA();

  if (isOnline) return null;

  return (
    <div className="bg-yellow-500 text-white py-2 px-4 text-center">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm">
          You are currently offline. Some features may be limited.
        </span>
      </div>
    </div>
  );
}