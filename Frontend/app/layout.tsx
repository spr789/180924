import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/auth-context'
import { SearchProvider } from '@/contexts/search-context'
import { CartProvider } from '@/contexts/cart-context'
import { WishlistProvider } from '@/contexts/wishlist-context'
import { TopBanner } from '@/components/top-banner'
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lumière - Exquisite Jewelry Collection',
  description: 'Discover our collection of handcrafted jewelry where tradition meets contemporary design.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
                  <Toaster />
                </WishlistProvider>
              </CartProvider>
            </SearchProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}