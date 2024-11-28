import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Calendar } from 'lucide-react';

interface VendorCardProps {
  vendor: {
    id: string;
    name: string;
    category: string;
    rating: number;
    totalRatings: number;
    image: string;
    badges: string[];
    location: string;
    joinedDate: string;
  };
}

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="relative h-48">
        <Image
          src={vendor.image}
          alt={vendor.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{vendor.name}</h3>
          <p className="text-white/90">{vendor.category}</p>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded bg-green-100 px-2 py-1 text-green-700">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{vendor.rating}</span>
            </div>
            <span className="text-sm text-gray-600">
              ({vendor.totalRatings} ratings)
            </span>
          </div>
          <div className="flex gap-2">
            {vendor.badges.map((badge) => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {vendor.location}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Member since {vendor.joinedDate}
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/vendor/store/${vendor.id}`}>Visit Store</Link>
          </Button>
          <Button variant="outline">Contact</Button>
        </div>
      </div>
    </div>
  );
}
