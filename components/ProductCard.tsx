import Link from 'next/link';
import type { Product } from '@/lib/products';
import { value, manufacturerNoise } from '@/lib/products';
import { ProductIllustration } from './Illustration';
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="card-art">
        <ProductIllustration small />
      </div>
      <div className="card-content">
        <p className="eyebrow">
          {product.brand} <span className="dot">·</span> Ficha en investigación
        </p>
        <h3>
          <Link href={`/modelos/${product.slug}/`}>{product.name}</Link>
        </h3>
        <p>{product.shortDescription}</p>
        <div className="card-specs">
          <span>
            <small>Depósito</small>
            <strong>{value(product.bin.capacityLiters, ' l')}</strong>
          </span>
          <span>
            <small>Ruido fabricante</small>
            <strong>{manufacturerNoise(product)}</strong>
          </span>
        </div>
        <Link className="text-link" href={`/modelos/${product.slug}/`}>
          Explorar ficha <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
