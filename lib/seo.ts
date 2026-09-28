import type { Metadata } from 'next';
import { SITE_NAME, SITE_DESCRIPTION, canonical } from './site';

type SocialImage = { src: string; alt: string };

const defaultSocialImage: SocialImage = {
  src: 'https://neakasa.com/cdn/shop/files/P2Pro-Rake.webp?v=1781513897&width=1200',
  alt: 'Kit de grooming canino con aspiración analizado por Manto Lab',
};

export function metadata(
  title: string,
  description: string,
  path: string,
  index = true,
  image: SocialImage = defaultSocialImage,
): Metadata {
  const fullTitle = title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: canonical(path) },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical(path),
      siteName: SITE_NAME,
      locale: 'es_ES',
      type: 'website',
      images: [{ url: image.src, alt: image.alt, width: 1200, height: 1200 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [{ url: image.src, alt: image.alt }],
    },
  };
}
export const defaultMetadata = metadata(SITE_NAME, SITE_DESCRIPTION, '/');
