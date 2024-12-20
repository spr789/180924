import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface CategoryPageProps {
  title: string
  description: string
  image: string
}

export function CategoryPage({ title, description, image }: CategoryPageProps) {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${image}')` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          <div className="container relative z-10 text-white">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg max-w-xl">{description}</p>
          </div>
        </section>

        {/* Filters and Sort */}
        <section className="border-b">
          <div className="container py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline">Filter</Button>
                <div className="hidden md:flex items-center gap-4">
                  <Button variant="ghost">Price</Button>
                  <Button variant="ghost">Material</Button>
                  <Button variant="ghost">Style</Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="text-sm border-0 focus:ring-0">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <ProductCard key={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}