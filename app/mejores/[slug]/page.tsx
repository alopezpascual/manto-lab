import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductCard } from '@/components/ProductCard';
import { bestForPages } from '@/lib/editorial';
import { products } from '@/lib/products';
import { metadata as makeMetadata } from '@/lib/seo';
export function generateStaticParams() {
  return bestForPages.map((x) => ({ slug: x.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = bestForPages.find((x) => x.slug === slug);
  return p ? makeMetadata(p.title, p.intro, `/mejores/${slug}/`) : {};
}
export default async function BestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = bestForPages.find((x) => x.slug === slug);
  if (!page) notFound();
  return (
    <div className="container page-shell">
      <Breadcrumbs
        items={[
          { name: 'Mejores para', path: '/mejores/doble-manto/' },
          { name: 'Doble manto', path: `/mejores/${slug}/` },
        ]}
      />
      <div className="page-intro">
        <p className="eyebrow">SEGÚN EL MANTO</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </div>
      <div className="editorial-split section">
        <div>
          <h2>Qué mirar antes de elegir.</h2>
          <p>
            El accesorio correcto y la técnica de cepillado importan tanto como el motor. No
            clasificamos modelos por compatibilidad con doble manto mientras no haya pruebas
            suficientes.
          </p>
          <Link className="text-link" href="/guias/que-es-un-grooming-vacuum/">
            Entender el sistema ↗
          </Link>
        </div>
        <div className="criteria-list">
          {page.criteria.map((c, i) => (
            <div key={c}>
              <span>0{i + 1}</span>
              <strong>{c}</strong>
              <small>Dato o prueba a verificar</small>
            </div>
          ))}
        </div>
      </div>
      <div className="section-title-row">
        <div>
          <p className="eyebrow">MODELOS PARA INVESTIGAR</p>
          <h2>Lo que sabemos de cada equipo.</h2>
        </div>
        <Link className="text-link" href="/comparar/">
          Abrir comparador ↗
        </Link>
      </div>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
