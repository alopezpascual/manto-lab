'use client';
import { useState } from 'react';
import Link from 'next/link';
import { products, value, manufacturerNoise, type Product } from '@/lib/products';
import { track } from '@/lib/analytics';
const sections: { title: string; rows: { label: string; get: (p: Product) => string }[] }[] = [
  {
    title: 'Máquina',
    rows: [
      {
        label: 'Dimensiones',
        get: (p) =>
          p.dimensions.width && p.dimensions.depth && p.dimensions.height
            ? `${value(p.dimensions.width)} × ${value(p.dimensions.depth)} × ${value(p.dimensions.height)} cm`
            : value(null),
      },
      { label: 'Peso', get: (p) => value(p.weightKg, ' kg') },
      { label: 'Potencia', get: (p) => value(p.vacuum.powerW, ' W') },
      { label: 'Depósito', get: (p) => value(p.bin.capacityLiters, ' l') },
      { label: 'Manguera', get: (p) => value(p.hose.lengthM, ' m') },
      { label: 'Cable', get: (p) => value(p.cable.lengthM, ' m') },
    ],
  },
  {
    title: 'Grooming',
    rows: [
      { label: 'Cepillo', get: (p) => tri(p.attachments.groomingBrush) },
      { label: 'Deslanador', get: (p) => tri(p.attachments.desheddingTool) },
      { label: 'Cortapelos', get: (p) => tri(p.clippers.included) },
      { label: 'Boquilla', get: (p) => tri(p.attachments.nozzle) },
    ],
  },
  {
    title: 'Perro',
    rows: [
      { label: 'Doble manto', get: (p) => tri(p.hairCompatibility.doubleCoat, true) },
      { label: 'Pelo largo', get: (p) => tri(p.hairCompatibility.long, true) },
      { label: 'Varios perros', get: (p) => tri(p.dogCompatibility.multipleDogs, true) },
    ],
  },
  {
    title: 'Confort',
    rows: [
      { label: 'Ruido fabricante', get: (p) => manufacturerNoise(p) },
      {
        label: 'Ruido medido',
        get: (p) =>
          p.noise.measuredDb == null ? 'Pendiente de medición' : `${p.noise.measuredDb} dB`,
      },
      { label: 'Niveles de aspiración', get: (p) => value(p.vacuum.suctionLevels) },
    ],
  },
  {
    title: 'Mantenimiento',
    rows: [
      { label: 'Filtro lavable', get: (p) => tri(p.filters.washable) },
      { label: 'Recambios', get: (p) => value(p.filters.replacements) },
      { label: 'Limpieza', get: (p) => value(p.maintenance) },
    ],
  },
  {
    title: 'Compra',
    rows: [
      { label: 'Garantía', get: (p) => value(p.warranty) },
      {
        label: 'Precio verificado',
        get: (p) =>
          p.offers[0]?.price == null ? 'Pendiente de verificar' : `${p.offers[0].price} €`,
      },
      { label: 'Disponibilidad en España', get: (p) => value(p.offers[0]?.availability) },
    ],
  },
];
function tri(v: boolean | null, compatibility = false) {
  return v === null
    ? compatibility
      ? 'Sin evaluar'
      : 'Pendiente de verificar'
    : v
      ? 'Sí, según fabricante'
      : 'No';
}
export function Comparison({ initial = [] }: { initial?: string[] }) {
  const [selected, setSelected] = useState<string[]>(
    initial.length >= 2 ? initial.slice(0, 3) : products.slice(0, 2).map((p) => p.id),
  );
  const [differences, setDifferences] = useState(false);
  const chosen = selected
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => !!p);
  function toggle(id: string) {
    setSelected((previous) => {
      const next = previous.includes(id)
        ? previous.filter((x) => x !== id)
        : previous.length < 3
          ? [...previous, id]
          : previous;
      track('comparison_started', { count: next.length });
      if (next.length >= 2) track('comparison_completed', { count: next.length });
      return next;
    });
  }
  return (
    <div className="comparison-tool">
      <div className="selector-panel">
        <div>
          <p className="eyebrow">SELECCIÓN</p>
          <h2>Elige 2 o 3 modelos</h2>
          <p>Datos en blanco significan que aún no hemos podido verificarlos.</p>
        </div>
        <div className="selector-options">
          {products.map((p) => (
            <label className={`select-chip ${selected.includes(p.id) ? 'active' : ''}`} key={p.id}>
              <input
                type="checkbox"
                checked={selected.includes(p.id)}
                disabled={!selected.includes(p.id) && selected.length >= 3}
                onChange={() => toggle(p.id)}
              />
              <span>{p.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="comparison-toolbar">
        <strong>{chosen.length} modelos seleccionados</strong>
        <label className="toggle">
          <input
            type="checkbox"
            checked={differences}
            onChange={(e) => {
              setDifferences(e.target.checked);
              track('filter_used', { filter: 'differences' });
            }}
          />{' '}
          Mostrar solo diferencias
        </label>
      </div>
      {chosen.length < 2 ? (
        <div className="empty-state">
          <h3>Elige al menos dos modelos</h3>
          <p>La comparación aparecerá aquí.</p>
        </div>
      ) : (
        <>
          <div className="comparison-desktop">
            <div className="compare-head">
              <span>Característica</span>
              {chosen.map((p) => (
                <Link key={p.id} href={`/modelos/${p.slug}/`}>
                  {p.name} ↗
                </Link>
              ))}
            </div>
            {sections.map((section) => {
              const rows = section.rows.filter(
                (row) => !differences || new Set(chosen.map(row.get)).size > 1,
              );
              return (
                rows.length > 0 && (
                  <section key={section.title}>
                    <h3>{section.title}</h3>
                    {rows.map((row) => (
                      <div className="compare-row" key={row.label}>
                        <span>{row.label}</span>
                        {chosen.map((p) => (
                          <span
                            key={p.id}
                            className={
                              row.get(p).startsWith('Pendiente') || row.get(p) === 'Sin evaluar'
                                ? 'unknown'
                                : ''
                            }
                          >
                            {row.get(p)}
                          </span>
                        ))}
                      </div>
                    ))}
                  </section>
                )
              );
            })}
          </div>
          <div className="comparison-mobile">
            {sections.map((section) => {
              const rows = section.rows.filter(
                (row) => !differences || new Set(chosen.map(row.get)).size > 1,
              );
              return (
                rows.length > 0 && (
                  <details key={section.title} open>
                    <summary>{section.title}</summary>
                    {rows.map((row) => (
                      <div className="mobile-compare-row" key={row.label}>
                        <h4>{row.label}</h4>
                        <div>
                          {chosen.map((p) => (
                            <p key={p.id}>
                              <b>{p.name}</b>
                              <span>{row.get(p)}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </details>
                )
              );
            })}
          </div>
        </>
      )}
      <p className="method-note">
        Las cifras del fabricante no son mediciones comparables hechas en un mismo laboratorio.{' '}
        <Link href="/metodologia/">Ver metodología →</Link>
      </p>
    </div>
  );
}
