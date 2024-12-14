"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AccountSidebar } from "@/components/account/account-sidebar";
import { AccountMain } from "@/components/account/account-main";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the code runs only on the client
    setIsClient(true);

    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  if (!isClient) {
    // Return null or a loading indicator while waiting for the client-side check
    return null;
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
  );
}
