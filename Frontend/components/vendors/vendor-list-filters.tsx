'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function VendorListFilters() {
  const categories = [
    { id: 'jewelry', label: 'Jewelry' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'home', label: 'Home & Living' },
  ];

  const ratings = [
    { id: '4-plus', label: '4.0 & above' },
    { id: '3-plus', label: '3.0 & above' },
    { id: '2-plus', label: '2.0 & above' },
  ];

  const badges = [
    { id: 'top-rated', label: 'Top Rated' },
    { id: 'verified', label: 'Verified' },
    { id: 'fast-shipping', label: 'Fast Shipping' },
  ];

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
      <div>
        <h3 className="mb-4 font-semibold">Filters</h3>
        <Button variant="outline" size="sm" className="w-full">
          Clear All
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={category.id} />
                  <Label htmlFor={category.id}>{category.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div key={rating.id} className="flex items-center space-x-2">
                  <Checkbox id={rating.id} />
                  <Label htmlFor={rating.id}>{rating.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="badges">
          <AccordionTrigger>Badges</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {badges.map((badge) => (
                <div key={badge.id} className="flex items-center space-x-2">
                  <Checkbox id={badge.id} />
                  <Label htmlFor={badge.id}>{badge.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
