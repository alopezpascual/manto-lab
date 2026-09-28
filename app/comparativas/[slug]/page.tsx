import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Comparison } from '@/components/Comparison';
import { products } from '@/lib/products';
import { metadata as makeMetadata } from '@/lib/seo';
const pairs = [{ slug: 'neakasa-p2-pro-vs-oneisall-lm2', ids: ['neakasa-p2-pro', 'oneisall-lm2'] }];
export function generateStaticParams() {
  return pairs.map((x) => ({ slug: x.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pair = pairs.find((x) => x.slug === slug);
  return pair
    ? makeMetadata(
        'Neakasa P2 Pro vs oneisall LM2',
        'Comparación editorial de especificaciones verificadas y datos pendientes entre Neakasa P2 Pro y oneisall LM2.',
        `/comparativas/${slug}/`,
      )
    : {};
}
export default async function VsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pair = pairs.find((x) => x.slug === slug);
  if (!pair) notFound();
  const [a, b] = pair.ids.map((id) => products.find((p) => p.id === id)!);
  return (
    <div className="container page-shell">
      <Breadcrumbs
        items={[
          { name: 'Comparativas', path: '/comparar/' },
          { name: `${a.name} vs ${b.name}`, path: `/comparativas/${slug}/` },
        ]}
      />
      <div className="page-intro">
        <p className="eyebrow">COMPARACIÓN EDITORIAL</p>
        <h1>
          {a.name} vs {b.name}.
        </h1>
        <p>
          Ambos incluyen cortapelos según sus fichas consultadas. Sus depósitos declarados son
          distintos: 2 l en {a.name} y 1,5 l en {b.name}. El ruido comunicado por las marcas no
          procede de un mismo protocolo. No hay pruebas propias comparables.
        </p>
      </div>
      <div className="section">
        <h2>Qué puede mover la decisión.</h2>
        <div className="criteria-list">
          <div>
            <span>01</span>
            <strong>Depósito</strong>
            <small>
              {a.name}: 2 l declarados. {b.name}: 1,5 l declarados.
            </small>
          </div>
          <div>
            <span>02</span>
            <strong>Ruido</strong>
            <small>No disponemos de mediciones propias de ninguno.</small>
          </div>
          <div>
            <span>03</span>
            <strong>Accesorios</strong>
            <small>Confirma la variante exacta y el contenido de la caja.</small>
          </div>
        </div>
      </div>
      <Comparison initial={pair.ids} />
      <div className="section two-column-content">
        <div>
          <h2>Elige {a.name} si…</h2>
          <p>
            Quieres investigar un kit con depósito declarado de 2 l y accesorios identificados.
            Verifica la variante y su precio antes de decidir.
          </p>
        </div>
        <div>
          <h2>Elige {b.name} si…</h2>
          <p>
            Te interesa su configuración con cortapelos y estás dispuesto a comprobar las
            especificaciones que aquí siguen pendientes.
          </p>
        </div>
      </div>
    </div>
  );
}
