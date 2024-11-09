import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-[600px] flex items-center">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?q=80&w=2940&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="container relative z-10 text-white">
        <h1 className="text-5xl font-bold mb-6 max-w-2xl">
          Discover Timeless Elegance in Every Piece
        </h1>
        <p className="text-xl mb-8 max-w-xl">
          Explore our exquisite collection of handcrafted jewelry, where tradition meets contemporary design.
        </p>
        <Button size="lg" className="bg-white text-black hover:bg-white/90">
          Shop Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}