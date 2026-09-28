'use client';
import { useState } from 'react';
import Link from 'next/link';
import { products, type Product } from '@/lib/products';
import { track } from '@/lib/analytics';
type Answers = {
  size: string;
  hair: string;
  shedding: string;
  noise: string;
  dogs: string;
  task: string;
  budget: string;
};
const questions: { key: keyof Answers; title: string; options: [string, string][] }[] = [
  {
    key: 'size',
    title: '¿Cómo es tu perro?',
    options: [
      ['pequeño', 'Pequeño'],
      ['mediano', 'Mediano'],
      ['grande', 'Grande'],
    ],
  },
  {
    key: 'hair',
    title: '¿Qué tipo de pelo tiene?',
    options: [
      ['corto', 'Corto'],
      ['largo', 'Largo'],
      ['rizado', 'Rizado'],
      ['doble', 'Doble manto'],
      ['desconocido', 'No estoy seguro'],
    ],
  },
  {
    key: 'shedding',
    title: '¿Cuánto pelo suele soltar?',
    options: [
      ['poco', 'Poco'],
      ['medio', 'Algo'],
      ['mucho', 'Mucho'],
    ],
  },
  {
    key: 'noise',
    title: '¿Le molestan especialmente los ruidos?',
    options: [
      ['si', 'Sí'],
      ['no', 'No'],
      ['desconocido', 'No lo sé'],
    ],
  },
  {
    key: 'dogs',
    title: '¿Cuántos perros tienes?',
    options: [
      ['1', 'Uno'],
      ['2', 'Dos'],
      ['3+', 'Tres o más'],
    ],
  },
  {
    key: 'task',
    title: '¿Qué quieres hacer principalmente?',
    options: [
      ['cepillar', 'Cepillar o deslanar'],
      ['cortar', 'Cortar'],
      ['ambas', 'Ambas cosas'],
    ],
  },
  {
    key: 'budget',
    title: '¿Qué presupuesto tienes?',
    options: [
      ['hasta100', 'Hasta 100 €'],
      ['100-150', '100–150 €'],
      ['150-200', '150–200 €'],
      ['200+', 'Más de 200 €'],
      ['flexible', 'Flexible'],
    ],
  },
];
function evidence(p: Product, a: Answers) {
  const reasons: string[] = [];
  const gaps: string[] = [];
  if (a.task === 'cortar' || a.task === 'ambas') {
    if (p.clippers.included === true) reasons.push('Incluye cortapelos según fabricante');
    else gaps.push('No está confirmado que incluya cortapelos');
  }
  if (a.task === 'cepillar' || a.task === 'ambas') {
    if (p.attachments.groomingBrush === true || p.attachments.desheddingTool === true)
      reasons.push('Tiene accesorio de cepillado o deslanado confirmado');
    else gaps.push('Accesorios de cepillado pendientes de confirmar');
  }
  if (a.hair === 'doble') {
    if (p.attachments.desheddingTool === true)
      reasons.push('Incluye deslanador, pero no hemos probado su uso en doble manto');
    else gaps.push('Deslanador pendiente de confirmar');
  }
  if (a.dogs !== '1') {
    if (p.bin.capacityLiters != null)
      reasons.push(
        `Depósito declarado de ${new Intl.NumberFormat('es-ES').format(p.bin.capacityLiters)} l; falta comprobar volumen útil`,
      );
    else gaps.push('Capacidad del depósito pendiente');
  }
  if (a.noise === 'si') gaps.push('No hay medición de ruido propia ni respuesta canina observada');
  if (a.budget !== 'flexible') gaps.push('No hay precios verificados para aplicar el presupuesto');
  gaps.push('Adecuación al tamaño del perro sin evaluar');
  if (a.hair === 'largo' || a.hair === 'rizado' || a.hair === 'corto')
    gaps.push('Compatibilidad con ese manto sin evaluar');
  if (a.shedding === 'mucho') gaps.push('Captura de muda abundante sin medir');
  return { reasons, gaps };
}
export function Finder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const done = step === questions.length;
  const question = questions[step];
  function pick(v: string) {
    setAnswers((prev) => ({ ...prev, [question.key]: v }));
    if (step === 0) track('finder_started');
    if (step === questions.length - 1) track('finder_completed');
    setStep(step + 1);
  }
  const complete = answers as Answers;
  const matches = done
    ? products
        .map((p) => ({ p, ...evidence(p, complete) }))
        .filter((item) => item.reasons.length > 0)
        .sort((a, b) => b.reasons.length - a.reasons.length)
    : [];
  return (
    <div className="finder-tool">
      {!done ? (
        <>
          <div className="finder-progress">
            <span>
              PASO {step + 1} / {questions.length}
            </span>
            <div>
              <span style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
            </div>
          </div>
          <h2>{question.title}</h2>
          <div className="answer-grid">
            {question.options.map(([id, label]) => (
              <button className="answer" key={id} onClick={() => pick(id)}>
                {label}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          {step > 0 && (
            <button className="plain-button" onClick={() => setStep(step - 1)}>
              ← Volver
            </button>
          )}
        </>
      ) : (
        <>
          <p className="eyebrow">RESULTADO / CON EVIDENCIA DISPONIBLE</p>
          <h2>Una lista para investigar, no un veredicto cerrado.</h2>
          <p className="result-intro">
            Ordenamos los modelos por características confirmadas que encajan con tus respuestas. No
            podemos demostrar qué equipo es mejor para tu perro sin pruebas comparables.
          </p>
          {complete.noise === 'si' && (
            <div className="warning-note">
              <strong>Ruido: decisión pendiente.</strong> Ningún modelo tiene todavía medición
              propia. No podemos clasificar cuál asustará menos a tu perro.
            </div>
          )}
          {complete.budget !== 'flexible' && (
            <div className="warning-note">
              <strong>Presupuesto sin filtrar.</strong> No tenemos precios actuales verificados.
            </div>
          )}
          <div className="result-list">
            {matches.length === 0 && (
              <div className="empty-state">
                <h3>Sin coincidencias verificadas</h3>
                <p>
                  Ningún modelo tiene todavía características confirmadas para esta tarea. Revisa el
                  catálogo y las fuentes antes de decidir.
                </p>
              </div>
            )}
            {matches.map(({ p, reasons, gaps }) => (
              <article key={p.id}>
                <div>
                  <p className="eyebrow">{p.brand}</p>
                  <h3>{p.name}</h3>
                  <p>
                    {reasons.length
                      ? reasons.join(' · ')
                      : 'Sin coincidencias confirmadas con tus criterios.'}
                  </p>
                  <small>Por comprobar: {gaps.join(' · ') || 'Prueba práctica propia'}</small>
                </div>
                <Link className="text-link" href={`/modelos/${p.slug}/`}>
                  Ver ficha ↗
                </Link>
              </article>
            ))}
          </div>
          <button
            className="button outline"
            onClick={() => {
              setStep(0);
              setAnswers({});
            }}
          >
            Empezar de nuevo
          </button>
        </>
      )}
    </div>
  );
}
