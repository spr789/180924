"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function CollectionFilters() {
  const [priceRange, setPriceRange] = useState([0, 100000])

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <h3 className="font-semibold mb-4">Filter By</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["Necklaces", "Earrings", "Rings", "Bracelets"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={category} />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="material">
            <AccordionTrigger>Material</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["Gold", "Silver", "Platinum", "Diamond"].map((material) => (
                  <div key={material} className="flex items-center space-x-2">
                    <Checkbox id={material} />
                    <Label htmlFor={material}>{material}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={100000}
                  step={1000}
                />
                <div className="flex items-center justify-between text-sm">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="occasion">
            <AccordionTrigger>Occasion</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["Wedding", "Party", "Daily Wear", "Festival"].map((occasion) => (
                  <div key={occasion} className="flex items-center space-x-2">
                    <Checkbox id={occasion} />
                    <Label htmlFor={occasion}>{occasion}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}