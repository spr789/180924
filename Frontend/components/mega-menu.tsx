"use client"

import Link from "next/link"

export function MegaMenu() {
  return (
    <nav className="flex items-center gap-6">
      <Link href="/necklaces" className="font-medium">
        Necklaces
      </Link>
      <Link href="/earrings" className="font-medium">
        Earrings
      </Link>
      <Link href="/bangles" className="font-medium">
        Bangles
      </Link>
      <Link href="/accessories" className="font-medium">
        Accessories
      </Link>
      <Link href="/silver" className="font-medium">
        92.5 Silver
      </Link>
    </nav>
  )
}