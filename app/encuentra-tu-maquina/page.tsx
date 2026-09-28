import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Finder } from '@/components/Finder';
import { metadata as makeMetadata } from '@/lib/seo';
export const metadata: Metadata = makeMetadata(
  'Encuentra tu máquina',
  'Responde siete preguntas y descubre qué características confirmadas conviene investigar para tu perro.',
  '/encuentra-tu-maquina/',
  false,
);
export default function FinderPage() {
  return (
    <div className="container page-shell narrow">
      <Breadcrumbs items={[{ name: 'Encuentra tu máquina', path: '/encuentra-tu-maquina/' }]} />
      <div className="page-intro">
        <p className="eyebrow">FINDER / 7 PREGUNTAS</p>
        <h1>Empecemos por tu perro.</h1>
        <p>
          Un filtro transparente basado en datos disponibles. Si faltan pruebas o precios, te lo
          diremos.
        </p>
      </div>
      <Finder />
    </div>
  );
}
