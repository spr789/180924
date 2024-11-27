import { Metadata } from 'next'

interface GenerateMetadataProps {
  title: string
  description?: string
  image?: string
  noIndex?: boolean
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
}: GenerateMetadataProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  }
}