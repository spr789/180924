'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { VendorForm } from '@/components/vendor-form';
import { VendorBenefits } from '@/components/vendor-benefits';

export default function BecomeVendorPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-bold">Become a Vendor</h1>
              <p className="text-lg text-gray-600">
                Join our marketplace and reach millions of customers
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <VendorBenefits />
              <VendorForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
