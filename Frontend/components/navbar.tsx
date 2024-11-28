'use client';

import Link from 'next/link';
import { Search, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InstallPrompt } from '@/components/pwa/install-prompt';
import { OfflineBanner } from '@/components/offline-banner';
import { CartSheet } from '@/components/cart/cart-sheet';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MobileMenu } from '@/components/mobile-menu';
import { DesktopMenu } from '@/components/desktop-menu';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-primary">
      <OfflineBanner />
      <div className="container py-4">
        {/* Mobile Header */}
        <div className="flex items-center gap-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <MobileMenu />
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex-1 text-center">
            <h1 className="text-xl font-bold text-white">Lumière</h1>
          </Link>

          <CartSheet />
        </div>

        {/* Desktop Header */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">Lumière</h1>
          </Link>

          <div className="max-w-2xl flex-1">
            <div className="relative">
              <Input
                placeholder="Search for jewelry..."
                className="bg-white pl-10"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <InstallPrompt />
            <CartSheet />
            <Button variant="ghost" size="icon" className="text-white">
              <User className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 lg:hidden">
          <div className="relative">
            <Input
              placeholder="Search for jewelry..."
              className="bg-white pl-10"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="mt-4 hidden lg:block">
          <DesktopMenu />
        </div>
      </div>
    </header>
  );
}
