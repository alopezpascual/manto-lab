import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { metadata as makeMetadata } from '@/lib/seo';
export const metadata: Metadata = makeMetadata(
  'Aviso de afiliación',
  'Información sobre la monetización de Manto Lab mediante enlaces de afiliado de Amazon España.',
  '/aviso-afiliados/',
);
export default function AffiliatePage() {
  return (
    <div className="container page-shell article-shell">
      <Breadcrumbs items={[{ name: 'Aviso de afiliación', path: '/aviso-afiliados/' }]} />
      <div className="page-intro">
        <p className="eyebrow">TRANSPARENCIA</p>
        <h1>Cómo se financia este proyecto.</h1>
        <p>
          Manto Lab utiliza enlaces de afiliado de Amazon España en algunas fichas de producto.
          Cuando compras después de seguir uno de esos enlaces, el proyecto puede recibir una
          comisión sin que el precio cambie para ti.
        </p>
      </div>
      <div className="article-body">
        <section>
          <h2>Identificación como afiliado</h2>
          <p>
            En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen
            los requisitos aplicables.
          </p>
          <p>
            Los enlaces remunerados aparecen identificados como «Enlace de afiliado». La existencia
            de una comisión no cambia los criterios de comparación ni convierte datos desconocidos
            en recomendaciones.
          </p>
        </section>
        <section>
          <h2>Precios y disponibilidad</h2>
          <p>
            No mostramos precios ni disponibilidad sin una fuente y fecha de consulta verificables.
            Consulta siempre las condiciones del vendedor antes de comprar.
          </p>
        </section>
        <div className="warning-note">
          <strong>Transparencia editorial.</strong> No mostramos precios ni disponibilidad sin una
          fuente y una fecha verificables, y distinguimos los datos del fabricante de nuestras
          pruebas propias.
        </div>
      </div>
    </div>
  );
}
