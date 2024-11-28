'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock products data
const products = [
  {
    id: '1',
    name: 'Diamond Solitaire Ring',
    material: '18K White Gold',
    price: 89999,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e',
  },
  {
    id: '2',
    name: 'Pearl Necklace',
    material: 'Fresh Water Pearls',
    price: 45999,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
  },
  {
    id: '3',
    name: 'Gold Bangles Set',
    material: '22K Yellow Gold',
    price: 125999,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908',
  },
  {
    id: '4',
    name: 'Diamond Studs',
    material: '18K White Gold',
    price: 65999,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a',
  },
];

export function VendorStoreProducts() {
  const [sortBy, setSortBy] = useState('featured');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {products.length} products
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            material={product.material}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Load More Products</Button>
      </div>
    </div>
  );
}
