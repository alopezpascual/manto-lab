import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { metadata as makeMetadata } from '@/lib/seo';
export const metadata: Metadata = makeMetadata(
  'Aviso de afiliación',
  'Información sobre la futura monetización de Manto Lab mediante enlaces de afiliado.',
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
          Manto Lab se plantea monetizar mediante enlaces de afiliado, inicialmente de Amazon
          España. En este momento no hay enlaces de afiliado activos en el sitio.
        </p>
      </div>
      <div className="article-body">
        <section>
          <h2>Si añadimos enlaces comerciales</h2>
          <p>
            Una compra realizada tras seguir uno de esos enlaces podría generar una comisión para el
            proyecto. La existencia de una comisión no cambiará los criterios de comparación ni
            convertirá datos desconocidos en recomendaciones.
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
          <strong>Pendiente de revisión jurídica.</strong> Este texto explica nuestra política
          editorial prevista y no acredita por sí solo el cumplimiento de obligaciones legales o de
          programas de afiliación.
        </div>
      </div>
    </div>
  );
}
