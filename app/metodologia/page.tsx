import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { metadata as makeMetadata } from '@/lib/seo';
export const metadata: Metadata = makeMetadata(
  'Metodología de análisis y pruebas',
  'Cómo distinguimos datos del fabricante, investigación editorial y mediciones propias en kits de grooming.',
  '/metodologia/',
);
const tests = [
  ['Ruido', 'Medición en dB a una distancia, posición, sala y nivel de aspiración estandarizados.'],
  ['Captura de pelo', 'Masa inicial frente a masa recogida, con manto y accesorio documentados.'],
  ['Capacidad útil', 'Volumen de pelo recogido antes del vaciado en una sesión comparable.'],
  ['Cortapelos', 'Calidad de corte, tirones, temperatura y ergonomía en uso controlado.'],
  ['Tiempo de grooming', 'Tiempo necesario para una tarea definida y un manto documentado.'],
  ['Limpieza', 'Tiempo de vaciado, retirada de pelo atrapado y limpieza del filtro.'],
  ['Alcance', 'Longitud de cable y manguera, y movilidad real durante la sesión.'],
  ['Accesorios', 'Utilidad de cada accesorio sobre el tipo de pelo para el que está indicado.'],
];
export default function MethodPage() {
  return (
    <div className="container page-shell">
      <Breadcrumbs items={[{ name: 'Metodología', path: '/metodologia/' }]} />
      <div className="page-intro">
        <p className="eyebrow">MANTO / LAB</p>
        <h1>Cómo sabremos si funciona.</h1>
        <p>
          Las fichas actuales documentan fuentes externas. Nuestro protocolo de pruebas está
          preparado, pero ninguna máquina ha sido probada por nosotros todavía.
        </p>
      </div>
      <div className="evidence-grid">
        <div>
          <span>01</span>
          <h3>Fabricante</h3>
          <p>Especificación declarada, identificada como tal.</p>
        </div>
        <div>
          <span>02</span>
          <h3>Investigación editorial</h3>
          <p>Información contrastada entre documentos y variantes.</p>
        </div>
        <div>
          <span>03</span>
          <h3>Usuarios</h3>
          <p>Experiencias que pueden orientar preguntas, sin confundirse con ensayos.</p>
        </div>
        <div>
          <span>04</span>
          <h3>Medición propia</h3>
          <p>Dato obtenido mediante un protocolo documentado.</p>
        </div>
        <div>
          <span>05</span>
          <h3>Prueba práctica</h3>
          <p>Observación de uso con contexto y límites explícitos.</p>
        </div>
      </div>
      <section className="section">
        <div className="section-head">
          <p className="eyebrow">PROTOCOLO FUTURO</p>
          <h2>Ocho dimensiones, una misma vara.</h2>
        </div>
        <div className="method-grid">
          {tests.map(([title, description], i) => (
            <div key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <small>Sin resultados publicados todavía</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
