"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AccountSidebar } from "@/components/account/account-sidebar"
import { AccountWishlist } from "@/components/account/account-wishlist"

export default function WishlistPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <AccountSidebar />
            <div className="md:col-span-3">
              <AccountWishlist />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}