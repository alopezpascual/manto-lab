import test from 'node:test';
import assert from 'node:assert/strict';
import { products, getMerchantOffer, getProduct, manufacturerNoise } from '../lib/products.ts';
test('catálogo: IDs y slugs únicos, fuentes trazables y sin resultados propios ficticios', () => {
  assert.ok(products.length >= 10);
  assert.equal(new Set(products.map((p) => p.id)).size, products.length);
  assert.equal(new Set(products.map((p) => p.slug)).size, products.length);
  for (const p of products) {
    assert.ok(p.sources.length > 0);
    assert.ok(p.sources.every((s) => s.url.startsWith('https://') && s.accessed));
    assert.ok(p.image.src.startsWith('https://'));
    assert.ok(p.image.alt.includes(p.brand));
    assert.equal(p.editorialStatus.handsOnTested, false);
    assert.equal(p.noise.measuredDb, null);
    assert.equal(p.lab.hairPickupTest, null);
    assert.equal(getProduct(p.slug), p);
  }
});
test('ofertas: enlaces afiliados solo para ASIN verificados y sin precio dinámico', () => {
  for (const p of products) {
    const offer = getMerchantOffer(p.id, 'Amazon España');
    assert.ok(offer);
    assert.equal(offer.price, null);
    assert.equal(offer.availability, null);
  }
  assert.equal(
    getMerchantOffer('neakasa-p2-pro', 'Amazon España').affiliateUrl,
    'https://www.amazon.es/dp/B0BDF62D4V?tag=dalfgroup-21',
  );
  assert.equal(
    getMerchantOffer('oneisall-lm2', 'Amazon España').affiliateUrl,
    'https://www.amazon.es/dp/B0BJ2P1LZV?tag=dalfgroup-21',
  );
  assert.equal(getMerchantOffer('airrobo-pg100', 'Amazon España').affiliateUrl, null);
  for (const p of products.filter((product) => product.id !== 'airrobo-pg100')) {
    const url = getMerchantOffer(p.id, 'Amazon España').affiliateUrl;
    assert.match(url, /^https:\/\/www\.amazon\.es\/dp\/[A-Z0-9]{10}\?tag=dalfgroup-21$/);
  }
  assert.equal(getMerchantOffer('missing', 'Amazon España'), null);
});
test('la cifra de ruido declarada conserva su contexto', () => {
  assert.match(manufacturerNoise(getProduct('neakasa-p2-pro')), /modo eco/);
  assert.match(manufacturerNoise(getProduct('airrobo-pg100')), /laboratorio interno/);
});
