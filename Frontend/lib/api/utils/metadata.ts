import { Metadata } from 'next';

interface GenerateMetadataProps {
  title: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
  keywords?: string[];
  author?: string;
}

/**
 * Generate SEO metadata for pages
 */
export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
  canonical,
  keywords,
  author,
}: GenerateMetadataProps): Metadata {
  const siteName = 'Lumière';
  const defaultDescription = 'Discover our collection of handcrafted jewelry where tradition meets contemporary design.';

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description: description || defaultDescription,
    keywords: keywords,
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      title,
      description: description || defaultDescription,
      images: image ? [{ url: image }] : undefined,
      siteName,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || defaultDescription,
      images: image ? [image] : undefined,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    alternates: {
      canonical: canonical,
    },
  };
}