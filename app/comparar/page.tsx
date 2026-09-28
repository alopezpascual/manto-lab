import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Comparison } from '@/components/Comparison';
import { metadata as makeMetadata } from '@/lib/seo';
export const metadata: Metadata = makeMetadata(
  'Comparador de kits de grooming',
  'Selecciona dos o tres equipos y compara datos de máquina, accesorios, ruido y mantenimiento.',
  '/comparar/',
  false,
);
export default function ComparePage() {
  return (
    <div className="container page-shell">
      <Breadcrumbs items={[{ name: 'Comparar', path: '/comparar/' }]} />
      <div className="page-intro">
        <p className="eyebrow">COMPARADOR</p>
        <h1>Las diferencias, a la vista.</h1>
        <p>
          Compara hasta tres equipos. Cada dato conserva su incertidumbre; las cifras del fabricante
          no equivalen a pruebas propias.
        </p>
      </div>
      <Comparison />
    </div>
  );
}
