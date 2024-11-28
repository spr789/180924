import { Breadcrumb } from '@/components/breadcrumb';

export function ProductsHeader() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
  ];

  return (
    <div className="border-b bg-white">
      <div className="container py-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-4">
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="mt-2 text-gray-600">
            Discover our collection of handcrafted jewelry pieces
          </p>
        </div>
      </div>
    </div>
  );
}
