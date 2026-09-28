import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { metadata as makeMetadata } from '@/lib/seo';
export const metadata: Metadata = makeMetadata(
  'Sobre Manto Lab',
  'Proyecto editorial especializado en equipos de grooming canino con aspiración.',
  '/sobre-nosotros/',
);
export default function AboutPage() {
  return (
    <div className="container page-shell article-shell">
      <Breadcrumbs items={[{ name: 'Sobre nosotros', path: '/sobre-nosotros/' }]} />
      <div className="page-intro">
        <p className="eyebrow">EL PROYECTO</p>
        <h1>Una categoría confusa merece mejores respuestas.</h1>
        <p>
          Manto Lab es el nombre provisional de un proyecto editorial centrado en kits de peluquería
          canina con aspiración.
        </p>
      </div>
      <div className="article-body">
        <section>
          <h2>Nuestro punto de partida</h2>
          <p>
            Organizamos especificaciones, fuentes y dudas en fichas comparables. El catálogo es
            inicial y no hemos realizado pruebas prácticas propias. Publicaremos conclusiones más
            firmes solo cuando exista evidencia suficiente.
          </p>
        </section>
        <section>
          <h2>Cómo trabajamos</h2>
          <p>
            Separamos los datos declarados por fabricantes de las mediciones propias y mostramos de
            forma visible lo que falta comprobar. Nuestro objetivo es ayudar a formular una compra
            mejor informada.
          </p>
        </section>
      </div>
    </div>
  );
}
