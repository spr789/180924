"use client";

import { useState, useEffect } from 'react';
import { Workbox } from 'workbox-window';

export function usePWA() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [workbox, setWorkbox] = useState<Workbox | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const wb = new Workbox('/service-worker.js');
      
      wb.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          // New content is available, show update notification
          if (confirm('New version available! Click OK to refresh.')) {
            window.location.reload();
          }
        }
      });

      wb.register();
      setWorkbox(wb);
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });

    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    
    setDeferredPrompt(null);
  };

  return {
    isInstallable,
    isOnline,
    installApp,
    workbox,
  };
}