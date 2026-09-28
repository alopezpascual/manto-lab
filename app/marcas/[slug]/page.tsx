import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/products';
import { metadata as makeMetadata } from '@/lib/seo';
const brands = [...new Set(products.map((p) => p.brand.toLowerCase()))];
export function generateStaticParams() {
  return brands.map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.brand.toLowerCase() === slug);
  return p
    ? makeMetadata(
        `Modelos ${p.brand}`,
        `Fichas y fuentes de kits de grooming ${p.brand}.`,
        `/marcas/${slug}/`,
      )
    : {};
}
export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const list = products.filter((p) => p.brand.toLowerCase() === slug);
  if (!list.length) notFound();
  return (
    <div className="container page-shell">
      <Breadcrumbs
        items={[
          { name: 'Marcas', path: '/modelos/' },
          { name: list[0].brand, path: `/marcas/${slug}/` },
        ]}
      />
      <div className="page-intro">
        <p className="eyebrow">MARCA / {list.length} MODELO</p>
        <h1>{list[0].brand}.</h1>
        <p>
          Modelos documentados en Manto Lab. Las fichas contienen fuentes y señalan lo que falta
          verificar.
        </p>
      </div>
      <div className="product-grid">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
