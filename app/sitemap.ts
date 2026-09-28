import type { MetadataRoute } from 'next';
import { canonical } from '@/lib/site';
import { products } from '@/lib/products';
import { bestForPages, guides } from '@/lib/editorial';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/grooming-vacuum/',
    '/modelos/',
    '/metodologia/',
    '/sobre-nosotros/',
    '/aviso-afiliados/',
    ...products.map((p) => `/modelos/${p.slug}/`),
    ...bestForPages.map((p) => `/mejores/${p.slug}/`),
    ...guides.map((g) => `/guias/${g.slug}/`),
    '/comparativas/neakasa-p2-pro-vs-oneisall-lm2/',
  ];
  return paths.map((path) => ({
    url: canonical(path),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.6,
  }));
}
