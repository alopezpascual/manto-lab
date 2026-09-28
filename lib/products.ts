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

type AmazonProductInput = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  model: string;
  asin: string;
  image: string;
  shortDescription: string;
  binLiters?: number;
  suctionPa?: number;
  suctionLevels?: number;
  noiseDb?: number;
  noiseQualifier?: string;
  hoseM?: number;
  cableM?: number;
  powerW?: number;
  clippers: boolean;
  attachments: Partial<Product['attachments']>;
  filters?: Partial<Product['filters']>;
  warranty?: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  notIdealFor: string[];
};

function amazonProduct(input: AmazonProductInput): Product {
  const amazonUrl = `https://www.amazon.es/dp/${input.asin}`;
  return {
    ...common,
    id: input.id,
    slug: input.slug,
    brand: input.brand,
    name: input.name,
    model: input.model,
    image: {
      src: input.image,
      alt: `${input.name} con sus accesorios de grooming`,
      sourceLabel: 'Amazon España',
      sourceUrl: amazonUrl,
    },
    status: 'investigación',
    shortDescription: input.shortDescription,
    vacuum: {
      ...common.vacuum,
      powerW: input.powerW ?? null,
      suctionPa: input.suctionPa ?? null,
      suctionLevels: input.suctionLevels ?? null,
    },
    noise: {
      manufacturerDb: input.noiseDb ?? null,
      measuredDb: null,
      manufacturerQualifier: input.noiseQualifier ?? null,
    },
    bin: { capacityLiters: input.binLiters ?? null },
    hose: { lengthM: input.hoseM ?? null },
    cable: { lengthM: input.cableM ?? null },
    clippers: { ...common.clippers, included: input.clippers },
    attachments: { ...common.attachments, ...input.attachments },
    filters: { ...common.filters, ...input.filters },
    warranty: input.warranty ?? null,
    pros: input.pros,
    cons: input.cons,
    bestFor: input.bestFor,
    notIdealFor: input.notIdealFor,
    editorialStatus: {
      researched: true,
      handsOnTested: false,
      manufacturerData: false,
      userReported: false,
    },
    offers: [
      {
        merchant: 'Amazon España',
        affiliateUrl: `${amazonUrl}?tag=dalfgroup-21`,
        price: null,
        priceLastChecked: null,
        availability: null,
      },
    ],
    sources: [
      {
        label: `Ficha de ${input.name} en Amazon España`,
        url: amazonUrl,
        accessed,
        evidence: 'marketplace',
      },
    ],
    lastReviewed: accessed,
    lab: { ...common.lab },
  };
}

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
  amazonProduct({
    id: 'oneisall-lm5',
    slug: 'oneisall-lm5',
    brand: 'oneisall',
    name: 'oneisall LM5',
    model: 'LM5',
    asin: 'B0C655Q2V5',
    image: 'https://m.media-amazon.com/images/I/812owTGermL._AC_SL1500_.jpg',
    shortDescription:
      'Kit de cepillado con aspiración, depósito de 1,5 l y tres niveles de succión según la ficha consultada.',
    binLiters: 1.5,
    suctionPa: 10000,
    suctionLevels: 3,
    noiseQualifier: '<60 dB (vendedor en Amazon)',
    clippers: false,
    attachments: {
      groomingBrush: true,
      desheddingTool: false,
      clippers: false,
      nozzle: true,
      cleaningBrush: true,
    },
    warranty: '24 meses según la ficha consultada',
    pros: ['Depósito de 1,5 l declarado', 'Pensado para cepillado sin cortapelos'],
    cons: ['Sin prueba práctica propia', 'Ruido y aspiración sin medición independiente'],
    bestFor: ['Quien busca cepillar y recoger pelo sin necesitar cortapelos'],
    notIdealFor: ['Quien quiere cortar el pelo con el mismo equipo'],
  }),
  amazonProduct({
    id: 'oneisall-pg08',
    slug: 'oneisall-pg08',
    brand: 'oneisall',
    name: 'oneisall PG08',
    model: 'PG08',
    asin: 'B0FQTCQGMQ',
    image: 'https://m.media-amazon.com/images/I/71AujQvEpKL._AC_SL1500_.jpg',
    shortDescription:
      'Kit 6 en 1 con cortapelos, depósito de 2 l y aspiración declarada de 15.000 Pa.',
    binLiters: 2,
    suctionPa: 15000,
    suctionLevels: 3,
    noiseDb: 59,
    noiseQualifier: 'dato del vendedor en Amazon',
    clippers: true,
    attachments: {
      groomingBrush: true,
      desheddingTool: true,
      clippers: true,
      nozzle: true,
      cleaningBrush: true,
      other: ['Recortadora de patas', 'Lima de uñas'],
    },
    pros: ['Depósito de 2 l declarado', 'Incluye corte, recorte de patas y lima de uñas'],
    cons: ['Sin prueba práctica propia', 'Cifras de ruido y succión declaradas por el vendedor'],
    bestFor: ['Quien quiere un kit amplio de cepillado y corte'],
    notIdealFor: ['Quien necesita datos comparables de rendimiento real'],
  }),
  amazonProduct({
    id: 'neakasa-p1-pro',
    slug: 'neakasa-p1-pro',
    brand: 'Neakasa',
    name: 'Neakasa P1 Pro',
    model: 'P1 Pro',
    asin: 'B0B68M41NV',
    image: 'https://m.media-amazon.com/images/I/81sRFLama+L._AC_SL1500_.jpg',
    shortDescription: 'Kit con cortapelos, cinco herramientas y aspiración declarada de 13.000 Pa.',
    suctionPa: 13000,
    noiseQualifier: '<60 dB (vendedor en Amazon)',
    clippers: true,
    attachments: {
      groomingBrush: true,
      desheddingTool: true,
      clippers: true,
      nozzle: true,
      cleaningBrush: true,
    },
    filters: { washable: true },
    pros: ['Cinco herramientas declaradas', 'Filtro lavable según la ficha consultada'],
    cons: ['Capacidad del depósito pendiente de verificar', 'Sin mediciones propias'],
    bestFor: ['Quien compara un kit Neakasa más sencillo que el P2 Pro'],
    notIdealFor: ['Quien necesita conocer el volumen útil del depósito'],
  }),
  amazonProduct({
    id: 'oneisall-secador-3-en-1',
    slug: 'oneisall-secador-3-en-1',
    brand: 'oneisall',
    name: 'oneisall Secador 3 en 1',
    model: 'Secador 3 en 1',
    asin: 'B0CGM1LKMR',
    image: 'https://m.media-amazon.com/images/I/71tEoRGJ6dL._AC_SL1500_.jpg',
    shortDescription:
      'Equipo que combina aspiración, secado y corte, con depósito de 2,5 l y manguera de 3 m.',
    binLiters: 2.5,
    suctionPa: 15000,
    noiseQualifier: '<60 dB (vendedor en Amazon)',
    hoseM: 3,
    clippers: true,
    attachments: {
      groomingBrush: true,
      desheddingTool: true,
      clippers: true,
      nozzle: true,
      cleaningBrush: true,
      other: ['Secador con siete temperaturas', 'Tres boquillas de secado'],
    },
    warranty: '12 meses según la ficha consultada',
    pros: ['Combina aspiración, secado y corte', 'Depósito de 2,5 l declarado'],
    cons: ['Equipo más complejo que un kit básico', 'Temperatura y ruido sin medición propia'],
    bestFor: ['Quien quiere integrar secado y corte en una sola estación'],
    notIdealFor: ['Quien solo necesita retirar pelo suelto'],
  }),
  amazonProduct({
    id: 'afloia-7-en-1',
    slug: 'afloia-7-en-1',
    brand: 'Afloia',
    name: 'Afloia 7 en 1',
    model: '7 en 1',
    asin: 'B0BYDFHND8',
    image: 'https://m.media-amazon.com/images/I/717hFRK8aZL._AC_SL1500_.jpg',
    shortDescription:
      'Kit con cortapelos inalámbrico, siete herramientas y depósito declarado de 1,5 l.',
    binLiters: 1.5,
    suctionLevels: 3,
    noiseQualifier: '<60 dB (vendedor en Amazon)',
    hoseM: 1.5,
    cableM: 2.7,
    clippers: true,
    attachments: {
      groomingBrush: true,
      desheddingTool: true,
      clippers: true,
      nozzle: true,
      cleaningBrush: true,
    },
    pros: ['Cortapelos inalámbrico declarado', 'Tres niveles de aspiración'],
    cons: ['Potencia de succión no cuantificada en la ficha', 'Sin prueba práctica propia'],
    bestFor: ['Quien valora mover el cortapelos sin cable'],
    notIdealFor: ['Quien compara equipos por una cifra de aspiración verificada'],
  }),
  amazonProduct({
    id: 'h-koenig-paw400',
    slug: 'h-koenig-paw400',
    brand: 'H.Koenig',
    name: 'H.Koenig PAW400',
    model: 'PAW400',
    asin: 'B0BS1QRBBZ',
    image: 'https://m.media-amazon.com/images/I/61yuBp6uhuL._AC_SL1500_.jpg',
    shortDescription:
      'Aspirador cortapelos con depósito de 1 l, filtro HEPA y nueve accesorios declarados.',
    binLiters: 1,
    suctionLevels: 3,
    clippers: true,
    attachments: {
      groomingBrush: true,
      desheddingTool: true,
      clippers: true,
      nozzle: true,
      cleaningBrush: true,
      other: ['Cuatro peines guía'],
    },
    filters: { type: 'HEPA' },
    warranty: '2 años según la ficha consultada',
    pros: ['Filtro HEPA declarado', 'Servicio posventa indicado para España y Portugal'],
    cons: ['Depósito de 1 l', 'Ruido y aspiración sin cifra verificable en la ficha'],
    bestFor: ['Quien prioriza filtro HEPA y soporte ibérico declarado'],
    notIdealFor: ['Quien busca un depósito de gran capacidad'],
  }),
  amazonProduct({
    id: 'gimars-23l',
    slug: 'gimars-23l',
    brand: 'Gimars',
    name: 'Gimars 2,3L',
    model: '2,3L',
    asin: 'B0DJ2SVF1C',
    image: 'https://m.media-amazon.com/images/I/71C1J7ZAW0L._AC_SL1500_.jpg',
    shortDescription: 'Kit 5 en 1 con cortapelos, depósito de 2,3 l y tres niveles de aspiración.',
    binLiters: 2.3,
    suctionPa: 12000,
    suctionLevels: 3,
    noiseQualifier: '<60 dB (vendedor en Amazon)',
    hoseM: 1.4,
    cableM: 2.3,
    clippers: true,
    attachments: {
      groomingBrush: true,
      desheddingTool: null,
      clippers: true,
      nozzle: true,
      cleaningBrush: true,
      other: ['Cuatro peines guía'],
    },
    pros: ['Depósito de 2,3 l declarado', 'Tres niveles de aspiración cuantificados'],
    cons: ['Deslanador no confirmado', 'Sin prueba de captura de pelo propia'],
    bestFor: ['Quien quiere investigar un depósito mayor de 2 l'],
    notIdealFor: ['Quien necesita deslanador confirmado'],
  }),
  amazonProduct({
    id: 'behome-6-en-1',
    slug: 'behome-6-en-1',
    brand: 'BEHOME',
    name: 'BEHOME 6 en 1',
    model: '6 en 1',
    asin: 'B0D2RX5FRK',
    image: 'https://m.media-amazon.com/images/I/61YWkblCfBL._AC_SL1000_.jpg',
    shortDescription:
      'Kit 6 en 1 con cortapelos, tres modos de aspiración y depósito declarado de 2,2 l.',
    binLiters: 2.2,
    suctionLevels: 3,
    noiseQualifier: 'hasta 60 dBA (vendedor en Amazon)',
    clippers: true,
    attachments: {
      groomingBrush: true,
      desheddingTool: null,
      clippers: true,
      nozzle: false,
      cleaningBrush: true,
      other: ['Cepillo de masaje', 'Rodillo quitapelos'],
    },
    pros: ['Depósito de 2,2 l declarado', 'Incluye cepillo de masaje y rodillo'],
    cons: ['Potencia de succión pendiente de verificar', 'Deslanador no confirmado'],
    bestFor: ['Quien valora un depósito grande y accesorios para textiles'],
    notIdealFor: ['Quien necesita comparar potencia de aspiración'],
  }),
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
