import { SITE_CONFIG } from './constants'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function constructMetadata({
  title,
  description,
  image,
  url,
}: SEOProps = {}) {
  return {
    title: title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.name,
    description: description || SITE_CONFIG.description,
    openGraph: {
      title: title || SITE_CONFIG.name,
      description: description || SITE_CONFIG.description,
      url: url || SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image || SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: title || SITE_CONFIG.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || SITE_CONFIG.name,
      description: description || SITE_CONFIG.description,
      images: [image || SITE_CONFIG.ogImage],
      creator: '@lumiere',
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}