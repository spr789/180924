import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Breadcrumb } from '@/components/breadcrumb';

export function VendorListHeader() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Vendors', href: '/vendors' },
  ];

  return (
    <div className="border-b bg-white">
      <div className="container py-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Our Vendors</h1>
            <p className="mt-2 text-gray-600">
              Discover trusted sellers and artisans
            </p>
          </div>
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input placeholder="Search vendors..." className="pl-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
