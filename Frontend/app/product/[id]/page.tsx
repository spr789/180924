import { ProductView } from "@/components/products/product-view"
import axiosInstance from "@/lib/api/axios"
import { API_ENDPOINTS } from "@/lib/api/config"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  try {
    // Fetch all products to get their slugs
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS)
    const products = response.data
    
    // Return an array of objects with slug params
    return products.map((product: { slug: string }) => ({
      slug: product.slug
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return [] // Return empty array as fallback
  }
}

// Make sure the page is static
export const dynamic = 'force-static'

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductView productId={params.slug} />
    </div>
  )
}
