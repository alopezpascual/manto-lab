import type { Metadata } from 'next';
import { Header, Footer } from '@/components/SiteShell';
import { JsonLd } from '@/components/JsonLd';
import { defaultMetadata } from '@/lib/seo';
import { websiteJson } from '@/lib/seo-data';
import './globals.css';
export const metadata: Metadata = defaultMetadata;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <JsonLd data={websiteJson} />
      </body>
    </html>
  );
}
