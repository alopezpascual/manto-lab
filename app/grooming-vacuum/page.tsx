import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Flow } from '@/components/Flow';
import { metadata as makeMetadata } from '@/lib/seo';
export const metadata: Metadata = makeMetadata(
  'Cortapelos para perros con aspiradora: qué son y cómo elegir',
  'Guía de la categoría: kits de peluquería canina con aspiración, aspiradores para perros y grooming vacuums.',
  '/grooming-vacuum/',
);
export default function CategoryPage() {
  return (
    <div className="container page-shell article-shell">
      <Breadcrumbs items={[{ name: 'Grooming vacuum', path: '/grooming-vacuum/' }]} />
      <div className="page-intro">
        <p className="eyebrow">LA CATEGORÍA</p>
        <h1>Cortapelos para perros con aspiradora. Y mucho más.</h1>
        <p>
          También llamados kits de peluquería canina con aspirador, aspiradores de grooming o
          grooming vacuums. Un nombre distinto puede referirse al mismo sistema: herramientas de
          aseo conectadas a una unidad de aspiración.
        </p>
      </div>
      <Flow />
      <div className="article-body">
        <section>
          <h2>Qué hay dentro de un kit</h2>
          <p>
            La configuración cambia entre modelos: cepillos, deslanadores, cortapelos y boquillas
            pueden acompañar al motor, la manguera y el depósito. Comprueba siempre la variante
            concreta.
          </p>
        </section>
        <section>
          <h2>Cómo elegir</h2>
          <p>
            Empieza por el manto y la tarea principal. Después mira los accesorios incluidos, el
            depósito, el mantenimiento y el ruido medido. La potencia declarada no sustituye una
            prueba de captura de pelo.
          </p>
        </section>
        <div className="link-row">
          <Link className="button dark" href="/encuentra-tu-maquina/">
            Encuentra tu máquina ↗
          </Link>
          <Link className="button outline" href="/comparar/">
            Comparar modelos
          </Link>
        </div>
      </div>
    </div>
  );
}
