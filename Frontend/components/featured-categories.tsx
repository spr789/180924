import { Button } from "@/components/ui/button"

const categories = [
  {
    title: "Necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2787&auto=format&fit=crop",
  },
  {
    title: "Earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2940&auto=format&fit=crop",
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div 
              key={category.title}
              className="group relative h-[400px] overflow-hidden rounded-lg"
            >
              <div
                className="absolute inset-0 transition-transform duration-300 group-hover:scale-110 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${category.image}')`,
                }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  Explore Collection
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}