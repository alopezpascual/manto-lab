import type { MetadataRoute } from 'next';
import { canonical } from '@/lib/site';
import { products } from '@/lib/products';
import { bestForPages, guides } from '@/lib/editorial';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/grooming-vacuum/',
    '/modelos/',
    '/comparar/',
    '/encuentra-tu-maquina/',
    '/metodologia/',
    '/sobre-nosotros/',
    '/aviso-afiliados/',
    ...products.map((p) => `/modelos/${p.slug}/`),
    ...new Set(products.map((p) => `/marcas/${p.brand.toLowerCase()}/`)),
    ...bestForPages.map((p) => `/mejores/${p.slug}/`),
    ...guides.map((g) => `/guias/${g.slug}/`),
    '/comparativas/neakasa-p2-pro-vs-oneisall-lm2/',
  ];
  return paths.map((path) => ({
    url: canonical(path),
    lastModified: new Date('2026-09-28'),
    changeFrequency: 'monthly',
    priority:
      path === '/'
        ? 1
        : path === '/grooming-vacuum/'
          ? 0.9
          : path.startsWith('/modelos/')
            ? 0.8
            : 0.6,
  }));
}
