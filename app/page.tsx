import Link from 'next/link';
import { ProductIllustration } from '@/components/Illustration';
import { Flow } from '@/components/Flow';
import { ProductCard } from '@/components/ProductCard';
import { Disclosure } from '@/components/SiteShell';
import { products } from '@/lib/products';
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow line-label">EL LABORATORIO DEL GROOMING DOMÉSTICO</p>
            <h1>
              Cuida su pelo.
              <br />
              <em>No llenes la casa de él.</em>
            </h1>
            <p>
              Entiende y compara máquinas de peluquería canina con aspiración según tu perro, su
              manto y la forma en que vais a utilizarlas.
            </p>
            <div className="hero-actions">
              <Link className="button dark" href="/encuentra-tu-maquina/">
                Encuentra tu máquina <span aria-hidden="true">↗</span>
              </Link>
              <Link className="button outline" href="/comparar/">
                Comparar modelos
              </Link>
            </div>
            <div className="hero-trust">
              <span>
                <b>01</b> Datos con fuente
              </span>
              <span>
                <b>02</b> Vacíos visibles
              </span>
              <span>
                <b>03</b> Método reproducible
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-caption">
              <span>FIG. 01</span>
              <span>SISTEMA DE ASPIRACIÓN / ESQUEMA</span>
            </div>
            <ProductIllustration />
            <div className="visual-footer">
              <span>Una máquina. Varias preguntas importantes.</span>
              <span>↓</span>
            </div>
          </div>
        </div>
      </section>
      <section className="flow-section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">CÓMO FUNCIONA</p>
            <h2>Del manto al depósito.</h2>
            <p>
              El accesorio desprende el pelo; la aspiración intenta recogerlo antes de que termine
              en el suelo. Lo que importa es cómo funciona el sistema completo.
            </p>
          </div>
          <Flow />
        </div>
      </section>
      <section className="section container">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">ELIGE CON CRITERIO</p>
            <h2>Dos caminos para decidir.</h2>
          </div>
          <p>
            Empieza por tu perro o compara las especificaciones que conocemos. Cuando un dato falta,
            lo verás.
          </p>
        </div>
        <div className="path-grid">
          <Link href="/encuentra-tu-maquina/" className="path-card primary">
            <span>01 / FINDER</span>
            <h3>Tu perro primero.</h3>
            <p>
              Siete preguntas para identificar qué características conviene investigar en cada
              modelo.
            </p>
            <b>Encontrar equipo ↗</b>
          </Link>
          <Link href="/comparar/" className="path-card">
            <span>02 / COMPARADOR</span>
            <h3>Modelo frente a modelo.</h3>
            <p>
              Ruido, depósito, accesorios y mantenimiento. Muestra solo diferencias cuando las haya.
            </p>
            <b>Abrir comparador ↗</b>
          </Link>
        </div>
      </section>
      <section className="section product-section">
        <div className="container">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">CATÁLOGO EN INVESTIGACIÓN</p>
              <h2>Máquinas bajo la lupa.</h2>
            </div>
            <Link className="text-link" href="/modelos/">
              Ver todos los modelos ↗
            </Link>
          </div>
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <p className="method-note">
            Las fichas combinan datos de fabricante y campos pendientes. No hemos realizado pruebas
            propias todavía.
          </p>
        </div>
      </section>
      <section className="section container editorial-split">
        <div>
          <p className="eyebrow">MANTO / LAB</p>
          <h2>Una prueba vale más que una promesa.</h2>
          <p>
            Hemos diseñado un protocolo para medir ruido, captura de pelo, capacidad útil y tiempo
            de limpieza en condiciones comparables. Hasta ejecutar esas pruebas, distinguimos las
            cifras de fabricante de cualquier conclusión propia.
          </p>
          <Link className="text-link" href="/metodologia/">
            Conocer el método ↗
          </Link>
        </div>
        <div className="lab-panel">
          <div>
            <span>RUIDO</span>
            <strong>— dB</strong>
            <small>Pendiente de medición</small>
          </div>
          <div>
            <span>CAPTURA DE PELO</span>
            <strong>— %</strong>
            <small>Pendiente de prueba</small>
          </div>
          <div>
            <span>LIMPIEZA</span>
            <strong>— min</strong>
            <small>Pendiente de prueba</small>
          </div>
        </div>
      </section>
      <div className="container">
        <Disclosure />
      </div>
    </>
  );
}
