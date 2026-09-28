import test from 'node:test';
import assert from 'node:assert/strict';
import { products, getMerchantOffer, getProduct, manufacturerNoise } from '../lib/products.ts';
test('catálogo: IDs y slugs únicos, fuentes trazables y sin resultados propios ficticios', () => {
  assert.equal(new Set(products.map((p) => p.id)).size, products.length);
  assert.equal(new Set(products.map((p) => p.slug)).size, products.length);
  for (const p of products) {
    assert.ok(p.sources.length > 0);
    assert.ok(p.sources.every((s) => s.url.startsWith('https://') && s.accessed));
    assert.equal(p.editorialStatus.handsOnTested, false);
    assert.equal(p.noise.measuredDb, null);
    assert.equal(p.lab.hairPickupTest, null);
    assert.equal(getProduct(p.slug), p);
  }
});
test('ofertas: sin precio ni URL afiliada hasta recibir datos verificados', () => {
  for (const p of products) {
    const offer = getMerchantOffer(p.id, 'Amazon España');
    assert.ok(offer);
    assert.equal(offer.affiliateUrl, null);
    assert.equal(offer.price, null);
    assert.equal(offer.availability, null);
  }
  assert.equal(getMerchantOffer('missing', 'Amazon España'), null);
});
test('la cifra de ruido declarada conserva su contexto', () => {
  assert.match(manufacturerNoise(getProduct('neakasa-p2-pro')), /modo eco/);
  assert.match(manufacturerNoise(getProduct('airrobo-pg100')), /laboratorio interno/);
});
