import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const collections = [
  {
    title: "Fine Jewelry",
    description: "Timeless pieces for every occasion",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2787&auto=format&fit=crop",
    href: "/collections/fine-jewelry",
  },
  {
    title: "Wedding Collection",
    description: "Make your special day unforgettable",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2940&auto=format&fit=crop",
    href: "/collections/wedding",
  },
  {
    title: "Statement Pieces",
    description: "Bold designs that stand out",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=2940&auto=format&fit=crop",
    href: "/collections/statement",
  },
]

export function CollectionSection() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.title}
              href={collection.href}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[4/5] relative">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:opacity-60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                  <p className="text-center text-sm mb-4">
                    {collection.description}
                  </p>
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-black transition-colors"
                  >
                    Explore Collection
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}