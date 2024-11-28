'use client';

import { WifiOff } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

export function OfflineBanner() {
  const { isOnline } = usePWA();

  if (isOnline) return null;

  return (
    <div className="bg-yellow-500 px-4 py-2 text-center text-white">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm">
          You are currently offline. Some features may be limited.
        </span>
      </div>
    </div>
  );
}
