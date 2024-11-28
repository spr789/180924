'use client';

import { useState } from 'react';
import { VendorCard } from '@/components/vendors/vendor-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

// Mock vendors data
const vendors = [
  {
    id: '1',
    name: 'Artisan Jewels',
    category: 'Jewelry',
    rating: 4.8,
    totalRatings: 1250,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
    badges: ['Top Rated', 'Verified'],
    location: 'Mumbai, India',
    joinedDate: '2020',
  },
  {
    id: '2',
    name: 'Fashion Forward',
    category: 'Fashion',
    rating: 4.5,
    totalRatings: 850,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    badges: ['Fast Shipping'],
    location: 'Delhi, India',
    joinedDate: '2021',
  },
  {
    id: '3',
    name: 'Tech Haven',
    category: 'Electronics',
    rating: 4.6,
    totalRatings: 2150,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661',
    badges: ['Verified', 'Top Rated'],
    location: 'Bangalore, India',
    joinedDate: '2019',
  },
  {
    id: '4',
    name: 'Home Essentials',
    category: 'Home & Living',
    rating: 4.3,
    totalRatings: 650,
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126',
    badges: ['Fast Shipping'],
    location: 'Chennai, India',
    joinedDate: '2022',
  },
];

export function VendorGrid() {
  const [sortBy, setSortBy] = useState('rating');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {vendors.length} vendors
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Rating: High to Low</SelectItem>
            <SelectItem value="reviews">Most Reviews</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
