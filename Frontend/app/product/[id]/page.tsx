import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Breadcrumb } from '@/components/breadcrumb';
import { ProductClient } from './product-client';

// Mock products data for static generation
const products = [
  {
    id: '1',
    name: 'Diamond Solitaire Ring',
    description: 'Elegant solitaire ring crafted in 18K white gold',
    price: 89999,
    sale_price: null,
    stock: 5,
    category: 'Rings',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a',
    ],
    rating: 4.8,
    reviews_count: 124,
    free_shipping: true,
    returnable: true,
    vendor: {
      id: 'v1',
      name: 'Luxury Jewels',
      rating: 4.9,
      products_count: 156,
    },
  },
];

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

async function getProduct(id: string) {
  const product = products.find((p) => p.id === id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.name, href: '#' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />

          <Suspense
            fallback={
              <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            }
          >
            <ProductClient product={product} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
