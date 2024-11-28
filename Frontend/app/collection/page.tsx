import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CollectionGrid } from '@/components/collection-grid';
import { CollectionFilters } from '@/components/collection-filters';

export default function CollectionPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">Our Collections</h1>
            <p className="text-lg text-gray-600">
              Discover our curated collections of timeless jewelry pieces
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <CollectionFilters />
            <div className="lg:col-span-3">
              <CollectionGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
