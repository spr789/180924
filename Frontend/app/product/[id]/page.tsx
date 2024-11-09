import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductView } from "@/components/product-view"

// Mock product IDs - in a real app, this would come from your API or database
const productIds = ["1", "2", "3", "4", "5"]

export function generateStaticParams() {
  return productIds.map((id) => ({
    id: id,
  }))
}

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8">
        <div className="container">
          <ProductView productId={params.id} />
        </div>
      </main>
      <Footer />
    </>
  )
}