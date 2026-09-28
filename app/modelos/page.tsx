import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/products';
import { metadata as makeMetadata } from '@/lib/seo';
export const metadataInfo = makeMetadata(
  'Modelos de grooming con aspiración',
  'Catálogo de kits de peluquería canina con aspiración. Compara especificaciones verificadas y datos pendientes.',
  '/modelos/',
);
export const metadata: Metadata = metadataInfo;
export default function ModelsPage() {
  return (
    <div className="container page-shell">
      <Breadcrumbs items={[{ name: 'Modelos', path: '/modelos/' }]} />
      <div className="page-intro">
        <p className="eyebrow">CATÁLOGO</p>
        <h1>Equipos bajo la lupa.</h1>
        <p>
          Fichas de producto con datos trazables. Estamos ampliando la investigación; las
          características desconocidas se muestran como tales.
        </p>
      </div>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
