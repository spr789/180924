import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { VendorStoreHeader } from "@/components/vendor/store/vendor-store-header"
import { VendorStoreProducts } from "@/components/vendor/store/vendor-store-products"
import { VendorStoreInfo } from "@/components/vendor/store/vendor-store-info"
import { useVendorContext } from "@/contexts/vendor-context"

export function generateStaticParams() {
  // This function can be used to generate static paths for vendor pages
  // Assuming we have a list of vendor IDs from the context or a service
  const vendorIds = ["1"]; // Replace with dynamic fetching logic if needed
  return vendorIds.map((id) => ({
    id: id,
  }))
}

export default function VendorStorePage({
  params,
}: {
  params: { id: string }
}) {
  const { vendors, isLoading, error } = useVendorContext();
  const vendor = vendors?.data.find(v => v.user.id.toString() === params.id);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-16">
          <div className="container text-center">
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !vendor) {
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
          name={vendor.profile.business_name}
          rating={vendor.analytics?.total_sales || 0}
          description={vendor.profile.business_address}
        />
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <VendorStoreInfo
              location={vendor.profile.business_address}
              memberSince={vendor.user.username || "Unknown"}
              totalProducts={vendor.orders.length}
              metrics={{
                responseRate: "N/A", // Replace with actual data if available
                shipOnTime: "N/A", // Replace with actual data if available
                rating: vendor.analytics?.total_sales ? `${vendor.analytics.total_sales}/5` : "N/A"
              }}
              badges={vendor.notifications.map(notification => notification.message)}
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