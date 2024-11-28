'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { VendorListHeader } from '@/components/vendors/vendor-list-header';
import { VendorListFilters } from '@/components/vendors/vendor-list-filters';
import { VendorGrid } from '@/components/vendors/vendor-grid';

export default function VendorsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <VendorListHeader />
        <div className="container py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <VendorListFilters />
            <div className="lg:col-span-3">
              <VendorGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
