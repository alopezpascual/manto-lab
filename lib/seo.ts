import type { Metadata } from 'next';
import { SITE_NAME, SITE_DESCRIPTION, canonical } from './site';
export function metadata(title: string, description: string, path: string, index = true): Metadata {
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: canonical(path) },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: canonical(path),
      siteName: SITE_NAME,
      locale: 'es_ES',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
export const defaultMetadata = metadata(SITE_NAME, SITE_DESCRIPTION, '/');
