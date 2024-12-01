import { HeroSection } from "@/components/hero-section"
import { CollectionSection } from "@/components/collection-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CollectionSection />
      </main>
      <Footer />
    </>
  )
}