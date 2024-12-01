import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { VendorStoreHeader } from "@/components/vendor/store/vendor-store-header"
import { VendorStoreProducts } from "@/components/vendor/store/vendor-store-products"
import { VendorStoreInfo } from "@/components/vendor/store/vendor-store-info"

// Mock vendor data - in a real app, this would come from an API
const vendors = {
  "1": {
    id: "1",
    name: "Artisan Jewels",
    rating: 4.8,
    description: "Handcrafted jewelry with traditional designs",
    location: "Mumbai, Maharashtra",
    memberSince: "January 2020",
    totalProducts: 234,
    metrics: {
      responseRate: "98%",
      shipOnTime: "95%",
      rating: "4.8/5"
    },
    badges: ["Top Rated Seller", "Fast Shipper", "Quality Products"]
  }
}

export function generateStaticParams() {
  return Object.keys(vendors).map((id) => ({
    id: id,
  }))
}

export default function VendorStorePage({
  params,
}: {
  params: { id: string }
}) {
  const vendor = vendors[params.id as keyof typeof vendors]

  if (!vendor) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-16">
          <div className="container text-center">
            <h1 className="text-2xl font-bold mb-4">Vendor Not Found</h1>
            <p className="text-gray-600">
              The vendor you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <VendorStoreHeader 
          name={vendor.name}
          rating={vendor.rating}
          description={vendor.description}
        />
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <VendorStoreInfo
              location={vendor.location}
              memberSince={vendor.memberSince}
              totalProducts={vendor.totalProducts}
              metrics={vendor.metrics}
              badges={vendor.badges}
            />
            <div className="lg:col-span-3">
              <VendorStoreProducts />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}