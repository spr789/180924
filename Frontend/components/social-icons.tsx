'use client';

import Link from 'next/link';
import { Facebook, Instagram, Pinterest } from 'lucide-react';

interface SocialIconProps {
  type: 'facebook' | 'instagram' | 'pinterest';
}

const SocialIcon = ({ type }: SocialIconProps) => {
  const icons = {
    facebook: <Facebook className="h-4 w-4" />,
    instagram: <Instagram className="h-4 w-4" />,
    pinterest: <Pinterest className="h-4 w-4" />,
  };

  const urls = {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    pinterest: 'https://pinterest.com',
  };

  return (
    <Link
      href={urls[type]}
      className="text-white transition-opacity hover:opacity-80"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icons[type]}
    </Link>
  );
};

export function SocialIcons() {
  return (
    <div className="flex gap-4">
      <SocialIcon type="facebook" />
      <SocialIcon type="instagram" />
      <SocialIcon type="pinterest" />
    </div>
  );
}
