import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/auth-context'
import { SearchProvider } from '@/contexts/search-context'
import { CartProvider } from '@/contexts/cart-context'
import { WishlistProvider } from '@/contexts/wishlist-context'
import { TopBanner } from '@/components/top-banner'
import { BottomNav } from '@/components/mobile-nav/bottom-nav'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Lumière - Exquisite Jewelry Collection',
    template: '%s | Lumière',
  },
  description: 'Discover our collection of handcrafted jewelry where tradition meets contemporary design.',
  keywords: ['jewelry', 'handcrafted', 'luxury', 'accessories', 'fashion'],
  authors: [{ name: 'Lumière' }],
  creator: 'Lumière',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Lumière - Exquisite Jewelry Collection',
    description: 'Discover our collection of handcrafted jewelry where tradition meets contemporary design.',
    siteName: 'Lumière',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumière - Exquisite Jewelry Collection',
    description: 'Discover our collection of handcrafted jewelry where tradition meets contemporary design.',
    creator: '@lumiere',
  },
  manifest: '/manifest.json',
  icons: [
    { rel: 'apple-touch-icon', url: '/icons/icon-192x192.png' },
    { rel: 'icon', url: '/favicon.ico' },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lumière',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#ef4444',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-2048-2732.jpg" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1668-2388.jpg" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1536-2048.jpg" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1242-2688.jpg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1125-2436.jpg" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-828-1792.jpg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          suppressHydrationWarning
        >
          <AuthProvider>
            <SearchProvider>
              <CartProvider>
                <WishlistProvider>
                  <TopBanner />
                  {children}
                  <BottomNav />
                  <Toaster />
                  <Analytics />
                </WishlistProvider>
              </CartProvider>
            </SearchProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}