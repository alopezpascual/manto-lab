import Link from 'next/link';
import { JsonLd } from './JsonLd';
import { breadcrumbJson } from '@/lib/seo-data';
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const full = [{ name: 'Inicio', path: '/' }, ...items];
  return (
    <>
      <nav aria-label="Migas de pan" className="breadcrumbs">
        {full.map((item, i) => (
          <span key={item.path}>
            {i > 0 && <span aria-hidden="true"> / </span>}
            {i === full.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link href={item.path}>{item.name}</Link>
            )}
          </span>
        ))}
      </nav>
      <JsonLd data={breadcrumbJson(full)} />
    </>
  );
}
