'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const collections = {
  featured: [
    {
      name: 'New Arrivals',
      href: '/new-arrivals',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
    },
    {
      name: 'Best Sellers',
      href: '/best-sellers',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908',
    },
  ],
  categories: [
    { name: 'Necklaces', href: '/necklaces' },
    { name: 'Earrings', href: '/earrings' },
    { name: 'Rings', href: '/rings' },
    { name: 'Bracelets', href: '/bracelets' },
    { name: 'Anklets', href: '/anklets' },
    { name: 'Pendants', href: '/pendants' },
  ],
  collections: [
    { name: 'Wedding Collection', href: '/wedding' },
    { name: 'Traditional', href: '/traditional' },
    { name: 'Contemporary', href: '/contemporary' },
    { name: 'Minimalist', href: '/minimalist' },
  ],
};

export function MegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white">
            Collections
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[800px] grid-cols-4 gap-4 p-6">
              <div className="col-span-2 grid grid-cols-2 gap-6">
                {collections.featured.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative"
                  >
                    <div className="relative h-40 overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-medium text-white">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div>
                <h4 className="mb-4 text-sm font-medium text-gray-500">
                  Categories
                </h4>
                <div className="space-y-2">
                  {collections.categories.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-sm hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-medium text-gray-500">
                  Collections
                </h4>
                <div className="space-y-2">
                  {collections.collections.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-sm hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
