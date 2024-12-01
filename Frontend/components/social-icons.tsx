"use client"

import Link from "next/link"
import { Facebook, Instagram, Pinterest } from "lucide-react"

interface SocialIconProps {
  type: "facebook" | "instagram" | "pinterest"
}

const SocialIcon = ({ type }: SocialIconProps) => {
  const icons = {
    facebook: <Facebook className="w-4 h-4" />,
    instagram: <Instagram className="w-4 h-4" />,
    pinterest: <Pinterest className="w-4 h-4" />
  }

  const urls = {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    pinterest: "https://pinterest.com"
  }

  return (
    <Link 
      href={urls[type]} 
      className="text-white hover:opacity-80 transition-opacity"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icons[type]}
    </Link>
  )
}

export function SocialIcons() {
  return (
    <div className="flex gap-4">
      <SocialIcon type="facebook" />
      <SocialIcon type="instagram" />
      <SocialIcon type="pinterest" />
    </div>
  )
}