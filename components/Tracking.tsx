'use client';
import { useEffect } from 'react';
import { track } from '@/lib/analytics';
export function TrackedProductView({ productId }: { productId: string }) {
  useEffect(() => {
    track('product_view', { productId });
  }, [productId]);
  return null;
}
export function AffiliateCTA({
  href,
  productId,
  merchant,
}: {
  href: string;
  productId: string;
  merchant: string;
}) {
  return (
    <a
      className="button dark"
      href={href}
      rel="nofollow sponsored noopener noreferrer"
      target="_blank"
      onClick={() => {
        track('merchant_click', { productId, merchant });
        track('affiliate_click', { productId, merchant });
      }}
    >
      Ver disponibilidad ↗
    </a>
  );
}
