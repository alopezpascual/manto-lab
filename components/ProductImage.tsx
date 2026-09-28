import Image from 'next/image';
import type { Product } from '@/lib/products';

export function ProductImage({
  product,
  compact = false,
  preload = false,
}: {
  product: Product;
  compact?: boolean;
  preload?: boolean;
}) {
  return (
    <figure className={`product-photo${compact ? ' compact' : ''}`}>
      <Image
        src={product.image.src}
        alt={product.image.alt}
        fill
        sizes={compact ? '(max-width: 720px) 100vw, 33vw' : '(max-width: 900px) 100vw, 44vw'}
        preload={preload}
      />
      {!compact && (
        <figcaption>
          Imagen:{' '}
          <a href={product.image.sourceUrl} target="_blank" rel="noopener noreferrer">
            {product.image.sourceLabel}
          </a>
        </figcaption>
      )}
    </figure>
  );
}
