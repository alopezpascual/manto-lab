'use client';

import { useState } from 'react';
import { products } from '@/lib/products';
import { ProductCard } from './ProductCard';

export function ProductCatalog() {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('todas');
  const [withClippers, setWithClippers] = useState(false);
  const [available, setAvailable] = useState(false);
  const brands = [...new Set(products.map((product) => product.brand))].sort((a, b) =>
    a.localeCompare(b, 'es'),
  );

  const normalized = query.trim().toLocaleLowerCase('es');
  const visible = products.filter((product) => {
    const matchesQuery =
      !normalized ||
      `${product.brand} ${product.name} ${product.model}`
        .toLocaleLowerCase('es')
        .includes(normalized);
    const matchesBrand = brand === 'todas' || product.brand === brand;
    const matchesClippers = !withClippers || product.clippers.included === true;
    const matchesAvailability =
      !available || product.offers.some((offer) => Boolean(offer.affiliateUrl));
    return matchesQuery && matchesBrand && matchesClippers && matchesAvailability;
  });

  function reset() {
    setQuery('');
    setBrand('todas');
    setWithClippers(false);
    setAvailable(false);
  }

  return (
    <section aria-label="Catálogo de modelos">
      <div className="catalog-toolbar">
        <label className="catalog-search">
          <span>Buscar modelo</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ej. oneisall, PAW400…"
          />
        </label>
        <label>
          <span>Marca</span>
          <select value={brand} onChange={(event) => setBrand(event.target.value)}>
            <option value="todas">Todas las marcas</option>
            {brands.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="catalog-check">
          <input
            type="checkbox"
            checked={withClippers}
            onChange={(event) => setWithClippers(event.target.checked)}
          />
          <span>Con cortapelos</span>
        </label>
        <label className="catalog-check">
          <input
            type="checkbox"
            checked={available}
            onChange={(event) => setAvailable(event.target.checked)}
          />
          <span>Con enlace de compra</span>
        </label>
      </div>
      <div className="catalog-result-row" aria-live="polite">
        <strong>
          {visible.length} {visible.length === 1 ? 'modelo' : 'modelos'}
        </strong>
        {(query || brand !== 'todas' || withClippers || available) && (
          <button className="plain-button" onClick={reset}>
            Limpiar filtros
          </button>
        )}
      </div>
      {visible.length ? (
        <div className="product-grid">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No hay coincidencias</h2>
          <p>Prueba otra marca o elimina alguno de los filtros.</p>
          <button className="button outline" onClick={reset}>
            Mostrar todos
          </button>
        </div>
      )}
    </section>
  );
}
