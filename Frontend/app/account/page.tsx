"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AccountSidebar } from "@/components/account/account-sidebar"
import { AccountMain } from "@/components/account/account-main"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"


export default function AccountPage() {
  const { user } = useAuth()
  const router = useRouter()
  if (user === null) {
    router.push("/login")
    return null
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <AccountSidebar />
            <div className="md:col-span-3">
              <AccountMain />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}