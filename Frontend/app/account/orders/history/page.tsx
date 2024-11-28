'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AccountSidebar } from '@/components/account/account-sidebar';
import { OrderHistory } from '@/components/account/order-history';

export default function OrderHistoryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <AccountSidebar />
            <div className="md:col-span-3">
              <OrderHistory />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
