import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Flow } from '@/components/Flow';
import { guides } from '@/lib/editorial';
import { metadata as makeMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { canonical } from '@/lib/site';
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  return g ? makeMetadata(g.title, g.intro, `/guias/${slug}/`) : {};
}
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) notFound();
  return (
    <div className="container page-shell article-shell">
      <Breadcrumbs
        items={[
          { name: 'Guías', path: '/guias/que-es-un-grooming-vacuum/' },
          { name: g.title, path: `/guias/${slug}/` },
        ]}
      />
      <div className="page-intro">
        <p className="eyebrow">GUÍA / FUNDAMENTOS</p>
        <h1>{g.title}.</h1>
        <p>{g.intro}</p>
      </div>
      <Flow />
      <div className="article-body">
        {g.sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}
        <aside className="article-callout">
          <h3>¿Pasamos a los modelos?</h3>
          <p>Consulta las fichas, compara lo confirmado y detecta lo que aún falta medir.</p>
          <Link className="button dark" href="/modelos/">
            Explorar modelos ↗
          </Link>
        </aside>
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: g.title,
          description: g.intro,
          mainEntityOfPage: canonical(`/guias/${slug}/`),
        }}
      />
    </div>
  );
}
