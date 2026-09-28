export type Tri = true | false | null;
export type Source = {
  label: string;
  url: string;
  accessed: string;
  evidence:
    | 'fabricante'
    | 'marketplace'
    | 'investigación editorial'
    | 'usuarios'
    | 'medición propia'
    | 'prueba práctica';
};
export type ProductImage = {
  src: string;
  alt: string;
  sourceLabel: string;
  sourceUrl: string;
};
export type Offer = {
  merchant: string;
  affiliateUrl: string | null;
  price: number | null;
  priceLastChecked: string | null;
  availability: string | null;
};
export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  model: string;
  image: ProductImage;
  status: 'investigación' | 'probado';
  shortDescription: string;
  dimensions: { width: number | null; depth: number | null; height: number | null };
  weightKg: number | null;
  vacuum: {
    powerW: number | null;
    suctionLevels: number | null;
    suctionPa: number | null;
    airflow: number | null;
  };
  noise: {
    manufacturerDb: number | null;
    measuredDb: number | null;
    manufacturerQualifier: string | null;
  };
  bin: { capacityLiters: number | null };
  hose: { lengthM: number | null };
  cable: { lengthM: number | null };
  clippers: {
    included: Tri;
    bladeTypes: string[] | null;
    guards: string[] | null;
    adjustableLength: Tri;
  };
  attachments: {
    groomingBrush: Tri;
    desheddingTool: Tri;
    clippers: Tri;
    nozzle: Tri;
    cleaningBrush: Tri;
    other: string[] | null;
  };
  hairCompatibility: { short: Tri; long: Tri; curly: Tri; doubleCoat: Tri; heavyShedding: Tri };
  dogCompatibility: { small: Tri; medium: Tri; large: Tri; multipleDogs: Tri };
  filters: { type: string | null; washable: Tri; replacements: string | null };
  power: string | null;
  storage: string | null;
  maintenance: string | null;
  consumables: string | null;
  warranty: string | null;
  pros: string[];
  cons: string[];
  bestFor: string[];
  notIdealFor: string[];
  editorialStatus: {
    researched: boolean;
    handsOnTested: boolean;
    manufacturerData: boolean;
    userReported: boolean;
  };
  offers: Offer[];
  sources: Source[];
  lastReviewed: string;
  lab: {
    noiseTestDb: number | null;
    hairPickupTest: { inputGrams: number; capturedGrams: number; efficiency: number } | null;
    binTest: string | null;
    clipperTest: string | null;
    setupTimeMin: number | null;
    cleaningTimeMin: number | null;
    hoseReachM: number | null;
    subjectiveDogReaction: string | null;
  };
};
const accessed = '2026-09-28';
const common = {
  dimensions: { width: null, depth: null, height: null },
  weightKg: null,
  vacuum: { powerW: null, suctionLevels: null, suctionPa: null, airflow: null },
  noise: { manufacturerDb: null, measuredDb: null, manufacturerQualifier: null },
  bin: { capacityLiters: null },
  hose: { lengthM: null },
  cable: { lengthM: null },
  clippers: { included: null, bladeTypes: null, guards: null, adjustableLength: null },
  attachments: {
    groomingBrush: null,
    desheddingTool: null,
    clippers: null,
    nozzle: null,
    cleaningBrush: null,
    other: null,
  },
  hairCompatibility: {
    short: null,
    long: null,
    curly: null,
    doubleCoat: null,
    heavyShedding: null,
  },
  dogCompatibility: { small: null, medium: null, large: null, multipleDogs: null },
  filters: { type: null, washable: null, replacements: null },
  power: null,
  storage: null,
  maintenance: null,
  consumables: null,
  warranty: null,
  pros: [],
  cons: [],
  bestFor: [],
  notIdealFor: [],
  editorialStatus: {
    researched: true,
    handsOnTested: false,
    manufacturerData: true,
    userReported: false,
  },
  offers: [
    {
      merchant: 'Amazon España',
      affiliateUrl: null,
      price: null,
      priceLastChecked: null,
      availability: null,
    },
  ],
  lastReviewed: accessed,
  lab: {
    noiseTestDb: null,
    hairPickupTest: null,
    binTest: null,
    clipperTest: null,
    setupTimeMin: null,
    cleaningTimeMin: null,
    hoseReachM: null,
    subjectiveDogReaction: null,
  },
} satisfies Partial<Product>;
export const products: Product[] = [
  {
    ...common,
    id: 'neakasa-p2-pro',
    slug: 'neakasa-p2-pro',
    brand: 'Neakasa',
    name: 'Neakasa P2 Pro',
    model: 'P2 Pro',
    image: {
      src: 'https://neakasa.com/cdn/shop/files/P2Pro-Rake.webp?v=1781513897&width=1200',
      alt: 'Kit de grooming con aspiración Neakasa P2 Pro y sus accesorios',
      sourceLabel: 'Neakasa',
      sourceUrl: 'https://neakasa.com/products/neakasa-p2-pro-dog-grooming-kit-vacuum',
    },
    status: 'investigación',
    shortDescription:
      'Kit de grooming con aspiración y cinco herramientas anunciadas por el fabricante.',
    dimensions: { width: 20.8, depth: 26.8, height: 36.5 },
    weightKg: 2.5,
    bin: { capacityLiters: 2 },
    vacuum: { ...common.vacuum, powerW: 400 },
    hose: { lengthM: 1.5 },
    cable: { lengthM: 2.5 },
    noise: { manufacturerDb: 52, measuredDb: null, manufacturerQualifier: 'modo eco' },
    clippers: { ...common.clippers, included: true },
    attachments: {
      groomingBrush: true,
      desheddingTool: true,
      clippers: true,
      nozzle: true,
      cleaningBrush: true,
      other: null,
    },
    pros: ['Depósito de 2 l declarado por el fabricante', 'Incluye herramienta de corte'],
    cons: ['Ruido y aspiración sin medición independiente', 'Sin prueba práctica publicada'],
    bestFor: ['Quien quiere comparar un kit con cortapelos y depósito de 2 l'],
    notIdealFor: ['Quien necesita confirmar el ruido real antes de comprar'],
    sources: [
      {
        label: 'Ficha oficial Neakasa P2 Pro',
        url: 'https://neakasa.com/products/neakasa-p2-pro-dog-grooming-kit-vacuum',
        accessed,
        evidence: 'fabricante',
      },
      {
        label: 'Oferta verificada en Amazon España: Neakasa P2 Pro',
        url: 'https://www.amazon.es/dp/B0BDF62D4V',
        accessed,
        evidence: 'marketplace',
      },
    ],
    offers: [
      {
        merchant: 'Amazon España',
        affiliateUrl: 'https://www.amazon.es/dp/B0BDF62D4V?tag=dalfgroup-21',
        price: null,
        priceLastChecked: null,
        availability: null,
      },
    ],
  },
  {
    ...common,
    id: 'oneisall-lm2',
    slug: 'oneisall-lm2',
    brand: 'oneisall',
    name: 'oneisall LM2',
    model: 'LM2',
    image: {
      src: 'https://oneisall.com/cdn/shop/files/oneisall-lm2-7-in-1-pet-grooming-vacuum-kit-7835980.png?v=1765861339&width=1200',
      alt: 'Kit de grooming con aspiración oneisall LM2 y sus siete accesorios',
      sourceLabel: 'oneisall',
      sourceUrl: 'https://oneisall.com/products/lm2-dog-grooming-vacuum',
    },
    status: 'investigación',
    shortDescription: 'Kit de grooming con cortapelos y depósito de 1,5 l según la ficha oficial.',
    bin: { capacityLiters: 1.5 },
    vacuum: { ...common.vacuum, suctionPa: 12000 },
    hose: { lengthM: 1.5 },
    clippers: { ...common.clippers, included: true },
    attachments: {
      groomingBrush: true,
      desheddingTool: true,
      clippers: true,
      nozzle: true,
      cleaningBrush: true,
      other: ['Recortador de patas', 'Cabezal para uñas'],
    },
    pros: [
      'Depósito de 1,5 l declarado por el fabricante',
      'Incluye cepillo, deslanador y cortapelos',
    ],
    cons: [
      'Ruido sin medición independiente',
      'Variante y compatibilidad eléctrica para España pendientes',
    ],
    bestFor: ['Quien busca un kit con herramientas de cepillado y corte'],
    notIdealFor: ['Quien necesita confirmar el ruido real antes de comprar'],
    sources: [
      {
        label: 'Ficha oficial oneisall LM2',
        url: 'https://oneisall.com/products/lm2-dog-grooming-vacuum',
        accessed,
        evidence: 'fabricante',
      },
      {
        label: 'Oferta verificada en Amazon España: oneisall LM2',
        url: 'https://www.amazon.es/dp/B0BJ2P1LZV',
        accessed,
        evidence: 'marketplace',
      },
    ],
    offers: [
      {
        merchant: 'Amazon España',
        affiliateUrl: 'https://www.amazon.es/dp/B0BJ2P1LZV?tag=dalfgroup-21',
        price: null,
        priceLastChecked: null,
        availability: null,
      },
    ],
  },
  {
    ...common,
    id: 'airrobo-pg100',
    slug: 'airrobo-pg100',
    brand: 'AIRROBO',
    name: 'AIRROBO PG100',
    model: 'PG100',
    image: {
      src: 'https://us.air-robo.com/cdn/shop/files/1_e8f353a7-4289-4d52-81ad-3272a09da3a0_1200x1200.jpg?v=1737081918',
      alt: 'Kit de grooming con aspiración AIRROBO PG100 y sus accesorios',
      sourceLabel: 'AIRROBO',
      sourceUrl: 'https://us.air-robo.com/products/airrobo-pg100',
    },
    status: 'investigación',
    shortDescription:
      'Kit con cortapelos, tres niveles de aspiración y depósito de 2 l declarados por el fabricante.',
    vacuum: { ...common.vacuum, suctionLevels: 3, suctionPa: 12000 },
    noise: {
      manufacturerDb: null,
      measuredDb: null,
      manufacturerQualifier: '<50 dB (solo equipo; laboratorio interno)',
    },
    bin: { capacityLiters: 2 },
    hose: { lengthM: 1.5 },
    clippers: { ...common.clippers, included: true },
    attachments: {
      groomingBrush: true,
      desheddingTool: null,
      clippers: true,
      nozzle: true,
      cleaningBrush: true,
      other: null,
    },
    filters: { type: 'HEPA y esponja', washable: true, replacements: null },
    pros: [
      'Depósito de 2 l y tres niveles declarados por el fabricante',
      'Incluye cortapelos y cepillo de grooming',
    ],
    cons: [
      'Las cifras de ruido y aspiración no son mediciones propias',
      'Variante y disponibilidad española pendientes',
    ],
    bestFor: ['Quien quiere investigar tres niveles de aspiración y depósito de 2 l'],
    notIdealFor: ['Quien necesita confirmar la configuración vendida en España'],
    sources: [
      {
        label: 'Ficha oficial AIRROBO PG100',
        url: 'https://us.air-robo.com/products/airrobo-pg100',
        accessed,
        evidence: 'fabricante',
      },
    ],
  },
];
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getMerchantOffer = (productId: string, merchant: string): Offer | null =>
  products.find((p) => p.id === productId)?.offers.find((o) => o.merchant === merchant) ?? null;
export const value = (n: number | string | null | undefined, unit = '') =>
  n == null
    ? 'Pendiente de verificar'
    : `${typeof n === 'number' ? new Intl.NumberFormat('es-ES').format(n) : n}${unit}`;

export const manufacturerNoise = (p: Product) =>
  p.noise.manufacturerDb == null
    ? (p.noise.manufacturerQualifier ?? 'Pendiente de verificar')
    : `${p.noise.manufacturerDb} dB${p.noise.manufacturerQualifier ? ` (${p.noise.manufacturerQualifier})` : ''}`;
