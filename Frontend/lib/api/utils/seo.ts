import { Metadata } from 'next';

interface SEOConfig {
  siteName: string;
  description: string;
  keywords: string[];
  ogImage: string;
  twitterHandle: string;
}

const defaultConfig: SEOConfig = {
  siteName: 'Lumière',
  description: 'Discover our collection of handcrafted jewelry where tradition meets contemporary design.',
  keywords: ['jewelry', 'handcrafted', 'luxury', 'accessories'],
  ogImage: '/images/og-image.jpg',
  twitterHandle: '@lumiere',
};

interface GenerateSEOProps {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  keywords?: string[];
}

/**
 * Generate SEO metadata for pages
 */
export function generateSEO({
  title,
  description,
  image,
  canonical,
  noIndex = false,
  keywords = [],
}: GenerateSEOProps): Metadata {
  const fullTitle = `${title} | ${defaultConfig.siteName}`;
  const finalDescription = description || defaultConfig.description;
  const finalImage = image || defaultConfig.ogImage;

  return {
    title: {
      default: fullTitle,
      template: `%s | ${defaultConfig.siteName}`,
    },
    description: finalDescription,
    keywords: [...defaultConfig.keywords, ...keywords],
    openGraph: {
      title: fullTitle,
      description: finalDescription,
      type: 'website',
      siteName: defaultConfig.siteName,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: defaultConfig.twitterHandle,
      creator: defaultConfig.twitterHandle,
      title: fullTitle,
      description: finalDescription,
      images: [finalImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonical,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  };
}

/**
 * Generate structured data for products
 */
export function generateProductSchema(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images[0],
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.stock > 0 ? 'InStock' : 'OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews_count,
    },
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}