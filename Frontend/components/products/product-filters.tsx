'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface ProductFiltersProps {
  onClose: () => void;
}

export function ProductFilters({ onClose }: ProductFiltersProps) {
  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1">
        <div className="space-y-8 p-4">
          <div>
            <h3 className="mb-4 font-medium">Categories</h3>
            <div className="space-y-3">
              {['Necklaces', 'Earrings', 'Rings', 'Bracelets'].map(
                (category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={category} />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                )
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-4 font-medium">Material</h3>
            <div className="space-y-3">
              {['Gold', 'Silver', 'Platinum', 'Diamond'].map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox id={material} />
                  <Label htmlFor={material}>{material}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-4 font-medium">Price Range</h3>
            <div className="space-y-3">
              {[
                'Under ₹5,000',
                '₹5,000 - ₹10,000',
                '₹10,000 - ₹20,000',
                'Above ₹20,000',
              ].map((range) => (
                <div key={range} className="flex items-center space-x-2">
                  <Checkbox id={range} />
                  <Label htmlFor={range}>{range}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="border-t bg-white p-4">
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={onClose}>
            Clear All
          </Button>
          <Button onClick={onClose}>Apply Filters</Button>
        </div>
      </div>
    </div>
  );
}
