'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ProductSortProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function ProductSort({ value, onValueChange }: ProductSortProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className="gap-4 p-4"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="featured" id="featured" />
        <Label htmlFor="featured">Featured</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="price-asc" id="price-asc" />
        <Label htmlFor="price-asc">Price: Low to High</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="price-desc" id="price-desc" />
        <Label htmlFor="price-desc">Price: High to Low</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="newest" id="newest" />
        <Label htmlFor="newest">Newest First</Label>
      </div>
    </RadioGroup>
  );
}
