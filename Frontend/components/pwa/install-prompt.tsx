"use client";

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/usePWA';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function InstallPrompt() {
  const { isInstallable, installApp } = usePWA();

  if (!isInstallable) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Install App
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Install Lumière App</DialogTitle>
          <DialogDescription>
            Install our app for a better experience with offline support and faster loading times.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Benefits:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Faster access to our products</li>
              <li>Works offline</li>
              <li>App-like experience</li>
              <li>Quick access from your home screen</li>
            </ul>
          </div>
          <Button onClick={installApp} className="w-full">
            Install Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}