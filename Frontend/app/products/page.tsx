import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductsGrid } from "@/components/products/products-grid"
import { ProductsHeader } from "@/components/products/products-header"
import { ProductsFilters } from "@/components/products/products-filters"

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <ProductsHeader />
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <ProductsFilters />
            <div className="lg:col-span-3">
              <ProductsGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}