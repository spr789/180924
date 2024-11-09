"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  ShoppingBag, 
  User, 
  Search, 
  MapPin, 
  Heart,
  Menu,
  LogOut,
  X
} from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { DesktopMenu } from "@/components/desktop-menu"
import { SearchBar } from "@/components/search-bar"
import { useSearch } from "@/contexts/search-context"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function Navbar() {
  const { isSearchOpen, setIsSearchOpen } = useSearch()
  const { user, logout } = useAuth()
  const { items: cartItems, totalAmount, removeItem: removeFromCart } = useCart()
  const { items: wishlistItems } = useWishlist()

  return (
    <div className="sticky top-0 z-50 bg-white border-b">
      {/* Main Navigation */}
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <MobileMenu />
            </SheetContent>
          </Sheet>

          {/* Logo - Centered on mobile */}
          <div className="flex-1 text-center md:flex-none">
            <Link href="/" className="text-2xl font-bold text-red-600 inline-block">
              Kushals
            </Link>
          </div>

          {/* Store Locator - Hidden on mobile */}
          <div className="hidden md:flex items-center text-sm">
            <span>90+ Stores Nearby</span>
            <span className="mx-2">|</span>
            <div className="flex items-center gap-1">
              <span>Shipping to</span>
              <Button variant="link" className="h-auto p-0 text-red-600">
                Pakala <MapPin className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Icon for Mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Search Bar - Hidden on Mobile */}
            <div className="hidden md:block flex-1 max-w-xl relative">
              <SearchBar />
            </div>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden md:flex relative" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/password">Change Password</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}

            {/* Cart */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Shopping Cart</h3>
                    <span className="text-sm text-gray-500">
                      {cartItems.length} items
                    </span>
                  </div>
                  {cartItems.length > 0 ? (
                    <>
                      <div className="space-y-3 max-h-[300px] overflow-auto">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="relative w-16 h-16 flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-500">
                                Qty: {item.quantity}
                              </p>
                              <p className="text-sm font-medium">
                                ₹{item.price * item.quantity}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="border-t mt-4 pt-4">
                        <div className="flex justify-between mb-4">
                          <span className="font-medium">Total</span>
                          <span className="font-medium">₹{totalAmount}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" asChild>
                            <Link href="/cart">View Cart</Link>
                          </Button>
                          <Button asChild>
                            <Link href="/checkout">Checkout</Link>
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingBag className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-500">Your cart is empty</p>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Mobile Search - Expandable */}
        {isSearchOpen && (
          <div className="pt-4 md:hidden">
            <SearchBar mobile />
          </div>
        )}
      </div>

      {/* Desktop Menu - Hidden on Mobile */}
      <div className="hidden md:block border-t">
        <div className="container">
          <DesktopMenu />
        </div>
      </div>
    </div>
  )
}