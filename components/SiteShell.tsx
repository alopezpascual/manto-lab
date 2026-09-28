import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';
export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label={`${SITE_NAME}, inicio`}>
          <span className="brand-mark">m.</span>
          <span>{SITE_NAME}</span>
        </Link>
        <nav aria-label="Navegación principal">
          <Link href="/modelos/">Modelos</Link>
          <Link href="/comparar/">Comparador</Link>
          <Link href="/encuentra-tu-maquina/">Finder</Link>
          <Link href="/metodologia/">Método</Link>
        </nav>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <span className="brand">
            <span className="brand-mark">m.</span>
            {SITE_NAME}
          </span>
          <p>Menos ruido comercial. Más criterio para cuidar su pelo.</p>
          <p className="muted">
            Proyecto editorial en desarrollo. Datos de fabricante identificados; pruebas propias
            pendientes.
          </p>
        </div>
        <div>
          <h3>Explorar</h3>
          <Link href="/modelos/">Modelos</Link>
          <Link href="/comparar/">Comparador</Link>
          <Link href="/grooming-vacuum/">La categoría</Link>
          <Link href="/guias/que-es-un-grooming-vacuum/">Guías</Link>
          <Link href="/mejores/doble-manto/">Doble manto</Link>
        </div>
        <div>
          <h3>Transparencia</h3>
          <Link href="/metodologia/">Metodología</Link>
          <Link href="/sobre-nosotros/">Sobre nosotros</Link>
          <Link href="/aviso-afiliados/">Afiliación</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        © {new Date().getFullYear()} {SITE_NAME} · Nombre provisional · Hecho para decidir con
        datos.
      </div>
    </footer>
  );
}
export function Disclosure() {
  return (
    <p className="disclosure">
      Algunos enlaces comerciales podrían generar una comisión en el futuro.{' '}
      <Link href="/aviso-afiliados/">Cómo funciona la afiliación</Link>.
    </p>
  );
}
