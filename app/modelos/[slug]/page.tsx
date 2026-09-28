import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductImage } from '@/components/ProductImage';
import {
  EditorialStatus,
  NoiseIndicator,
  SuctionIndicator,
  BinCapacity,
  AccessoryGrid,
  GroomingProfile,
  ProsCons,
  MerchantOffer,
  SourceList,
  RelatedProducts,
} from '@/components/ProductDetails';
import { getProduct, products, value, manufacturerNoise } from '@/lib/products';
import { metadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { canonical } from '@/lib/site';
import { TrackedProductView } from '@/components/Tracking';
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return p
    ? metadata(
        `${p.name}: ficha y especificaciones`,
        `${p.shortDescription} Fuentes trazables y pruebas pendientes.`,
        `/modelos/${slug}/`,
        true,
        p.image,
      )
    : {};
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  return (
    <div className="container page-shell">
      <TrackedProductView productId={p.id} />
      <Breadcrumbs
        items={[
          { name: 'Modelos', path: '/modelos/' },
          { name: p.name, path: `/modelos/${slug}/` },
        ]}
      />
      <div className="product-hero">
        <div>
          <p className="eyebrow">{p.brand.toUpperCase()} / FICHA DE PRODUCTO</p>
          <h1>{p.name}</h1>
          <p className="lead">{p.shortDescription}</p>
          <EditorialStatus product={p} />
          <div className="product-summary">
            <div>
              <small>PARA QUIÉN TIENE SENTIDO</small>
              <p>{p.bestFor[0]}</p>
            </div>
            <div>
              <small>LÍMITE PRINCIPAL</small>
              <p>{p.notIdealFor[0]}</p>
            </div>
          </div>
          <div className="hero-actions">
            <a className="button dark" href="#donde-comprar">
              Dónde comprar ↓
            </a>
            <Link className="button outline" href="/comparar/">
              Comparar ↗
            </Link>
          </div>
        </div>
        <div className="product-hero-art">
          <ProductImage product={p} preload />
        </div>
      </div>
      <div className="stat-strip">
        <div>
          <small>DEPÓSITO</small>
          <strong>{value(p.bin.capacityLiters, ' l')}</strong>
        </div>
        <div>
          <small>RUIDO FABRICANTE</small>
          <strong>{manufacturerNoise(p)}</strong>
        </div>
        <div>
          <small>ASPIRACIÓN FABRICANTE</small>
          <strong>{value(p.vacuum.suctionPa, ' Pa')}</strong>
        </div>
        <div>
          <small>PRUEBA PROPIA</small>
          <strong>Pendiente</strong>
        </div>
      </div>
      <section className="section">
        <div className="section-head">
          <p className="eyebrow">VEREDICTO RÁPIDO</p>
          <h2>Lo que podemos decir hoy.</h2>
          <p>
            Esta ficha permite comparar especificaciones declaradas. No existe aún evidencia
            práctica suficiente para afirmar que sea la mejor opción para un tipo de perro.
          </p>
        </div>
        <ProsCons product={p} />
      </section>
      <section className="section">
        <div className="section-head">
          <p className="eyebrow">PERFIL DE GROOMING</p>
          <h2>Compatibilidad: sin atajos.</h2>
          <p>No inferimos adecuación a un manto solo porque el kit incluya un accesorio.</p>
        </div>
        <GroomingProfile product={p} />
      </section>
      <section className="section metrics-section">
        <div className="section-head">
          <p className="eyebrow">DATOS QUE IMPORTAN</p>
          <h2>Máquina y uso diario.</h2>
        </div>
        <NoiseIndicator product={p} />
        <SuctionIndicator product={p} />
        <BinCapacity product={p} />
      </section>
      <section className="section">
        <div className="section-head">
          <p className="eyebrow">HERRAMIENTAS</p>
          <h2>Accesorios.</h2>
          <p>
            La configuración puede variar por mercado o variante; confirma el contenido de la caja
            antes de comprar.
          </p>
        </div>
        <AccessoryGrid product={p} />
      </section>
      <section className="section two-column-content">
        <div>
          <p className="eyebrow">CORTE</p>
          <h2>El cortapelos.</h2>
          <p>
            {p.clippers.included === true
              ? 'Incluido según la ficha consultada. No hemos evaluado calidad de corte, tirones, temperatura ni ergonomía.'
              : 'Presencia del cortapelos pendiente de verificar.'}
          </p>
        </div>
        <div>
          <p className="eyebrow">MANTENIMIENTO</p>
          <h2>Después de la sesión.</h2>
          <p>
            Tiempo de vaciado, limpieza del filtro, pelo atrapado y disponibilidad de recambios
            pendientes de prueba o verificación.
          </p>
        </div>
      </section>
      <section className="section" id="donde-comprar">
        <MerchantOffer product={p} />
      </section>
      <section className="section two-column-content">
        <div>
          <p className="eyebrow">SIGUE INVESTIGANDO</p>
          <h2>Alternativas.</h2>
          <RelatedProducts product={p} />
          <div className="context-links">
            <Link href={`/marcas/${p.brand.toLowerCase()}/`}>Más de {p.brand} ↗</Link>
            <Link href="/comparar/">Comparar con otros modelos ↗</Link>
            <Link href="/mejores/doble-manto/">Qué mirar en doble manto ↗</Link>
            <Link href="/guias/que-es-un-grooming-vacuum/">Cómo funciona un kit ↗</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow">TRAZABILIDAD</p>
          <h2>Fuentes.</h2>
          <SourceList product={p} />
          <Link className="text-link" href="/metodologia/">
            Cómo evaluamos ↗
          </Link>
        </div>
      </section>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: p.name,
          brand: { '@type': 'Brand', name: p.brand },
          model: p.model,
          description: p.shortDescription,
          image: p.image.src,
          sku: p.model,
          dateModified: p.lastReviewed,
          url: canonical(`/modelos/${p.slug}/`),
        }}
      />
    </div>
  );
}
