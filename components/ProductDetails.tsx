import Link from 'next/link';
import { products, getMerchantOffer, value, manufacturerNoise, type Product } from '@/lib/products';
import { Disclosure } from './SiteShell';
import { AffiliateCTA } from './Tracking';
export function EditorialStatus({ product }: { product: Product }) {
  return (
    <div className="status-note">
      <span className="status-dot" />
      <div>
        <strong>Ficha en investigación</strong>
        <p>
          {product.editorialStatus.manufacturerData
            ? 'Datos declarados por el fabricante.'
            : 'Datos de la ficha comercial consultada.'}{' '}
          Aún no probado por nosotros. Revisión: {product.lastReviewed}.
        </p>
      </div>
    </div>
  );
}
export function MetricPanel({
  number,
  label,
  title,
  intro,
  firstLabel,
  firstValue,
  secondLabel,
  secondValue,
}: {
  number: string;
  label: string;
  title: string;
  intro: string;
  firstLabel: string;
  firstValue: string;
  secondLabel: string;
  secondValue: string;
}) {
  return (
    <div className="metric-panel">
      <div>
        <p className="eyebrow">
          {number} / {label}
        </p>
        <h3>{title}</h3>
        <p>{intro}</p>
      </div>
      <div className="metric-pair">
        <span>
          <small>{firstLabel}</small>
          <strong>{firstValue}</strong>
        </span>
        <span>
          <small>{secondLabel}</small>
          <strong>{secondValue}</strong>
        </span>
      </div>
    </div>
  );
}
export function NoiseIndicator({ product }: { product: Product }) {
  return (
    <MetricPanel
      number="01"
      label="CONFORT"
      title="Ruido"
      intro="Una cifra aislada no permite anticipar la reacción de cada perro."
      firstLabel="Fabricante"
      firstValue={manufacturerNoise(product)}
      secondLabel="Medición propia"
      secondValue={
        product.noise.measuredDb == null
          ? 'Pendiente de medición'
          : `${product.noise.measuredDb} dB`
      }
    />
  );
}
export function SuctionIndicator({ product }: { product: Product }) {
  return (
    <MetricPanel
      number="02"
      label="ASPIRACIÓN"
      title="Aspiración"
      intro="Los Pa declarados por marcas distintas no describen por sí solos cuánto pelo recoge cada equipo."
      firstLabel="Fabricante"
      firstValue={value(product.vacuum.suctionPa, ' Pa')}
      secondLabel="Captura medida"
      secondValue="Pendiente de prueba"
    />
  );
}
export function BinCapacity({ product }: { product: Product }) {
  return (
    <MetricPanel
      number="03"
      label="USO"
      title="Depósito"
      intro="La capacidad nominal no equivale al volumen útil con pelo compactado."
      firstLabel="Capacidad fabricante"
      firstValue={value(product.bin.capacityLiters, ' l')}
      secondLabel="Volumen útil medido"
      secondValue="Pendiente de prueba"
    />
  );
}
const accessoryLabels: [keyof Product['attachments'], string][] = [
  ['groomingBrush', 'Cepillo de grooming'],
  ['desheddingTool', 'Deslanador'],
  ['clippers', 'Cortapelos'],
  ['nozzle', 'Boquilla'],
  ['cleaningBrush', 'Cepillo de limpieza'],
];
export function AccessoryGrid({ product }: { product: Product }) {
  return (
    <div className="accessory-grid">
      {accessoryLabels.map(([key, label]) => (
        <div className="accessory" key={key}>
          <span aria-hidden="true">{product.attachments[key] === true ? '✓' : '?'}</span>
          <strong>{label}</strong>
          <small>
            {product.attachments[key] === true ? 'Según fabricante' : 'Pendiente de verificar'}
          </small>
        </div>
      ))}
    </div>
  );
}
export function GroomingProfile({ product }: { product: Product }) {
  const items: [string, boolean | null][] = [
    ['Pelo corto', product.hairCompatibility.short],
    ['Pelo largo', product.hairCompatibility.long],
    ['Doble manto', product.hairCompatibility.doubleCoat],
    ['Muda intensa', product.hairCompatibility.heavyShedding],
    ['Perros grandes', product.dogCompatibility.large],
    ['Varios perros', product.dogCompatibility.multipleDogs],
  ];
  return (
    <div className="profile-grid">
      {items.map(([label, verified]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>
            {verified === null ? 'Sin evaluar' : verified ? 'Con evidencia' : 'No recomendado'}
          </strong>
        </div>
      ))}
    </div>
  );
}
export function ProsCons({ product }: { product: Product }) {
  return (
    <div className="pros-cons">
      <div>
        <h3>Lo que sabemos</h3>
        <ul>
          {product.pros.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Lo que falta</h3>
        <ul>
          {product.cons.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export function MerchantOffer({ product }: { product: Product }) {
  const offer = getMerchantOffer(product.id, 'Amazon España');
  return (
    <div className="merchant-box">
      <div>
        <p className="eyebrow">DÓNDE COMPRAR</p>
        <h3>{offer?.merchant ?? 'Amazon España'}</h3>
        <p>
          {offer?.affiliateUrl
            ? 'Oferta del modelo exacto verificada. Consulta en Amazon el precio y la disponibilidad actuales.'
            : 'No hemos localizado una oferta española exacta. No mostramos precios ni enlaces de variantes distintas.'}
        </p>
      </div>
      {offer?.affiliateUrl ? (
        <div className="merchant-action">
          <span>Enlace de afiliado</span>
          <AffiliateCTA
            href={offer.affiliateUrl}
            productId={product.id}
            merchant={offer.merchant}
          />
        </div>
      ) : (
        <span className="button disabled" aria-disabled="true">
          Enlace pendiente
        </span>
      )}
      <Disclosure />
    </div>
  );
}
export function SourceList({ product }: { product: Product }) {
  return (
    <ol className="source-list">
      {product.sources.map((s) => (
        <li key={s.url}>
          <a href={s.url} target="_blank" rel="noopener noreferrer">
            {s.label} ↗
          </a>
          <span>
            {s.evidence} · consultada {s.accessed}
          </span>
        </li>
      ))}
    </ol>
  );
}
export function RelatedProducts({ product }: { product: Product }) {
  return (
    <div className="related-list">
      {products
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
        .map((p) => (
          <Link key={p.id} href={`/modelos/${p.slug}/`}>
            {p.name}
            <span>Ver ficha ↗</span>
          </Link>
        ))}
    </div>
  );
}
