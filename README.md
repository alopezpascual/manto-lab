# Manto Lab

Manto Lab es el nombre provisional de un comparador editorial español de kits de peluquería canina con aspiración. La V1 permite explorar tres modelos, comparar hasta tres, usar un finder de siete preguntas y consultar guías, metodología y fuentes. No hay enlaces afiliados, precios ni pruebas propias publicados.

## Stack

Next.js 16, App Router, React 19, TypeScript y CSS propio. Datos estructurados locales. Sin CMS, servicios externos, imágenes de terceros ni analítica externa.

## Desarrollo

Requiere Node.js compatible con Next 16 y pnpm. En este equipo, Node está disponible en el runtime de Codex.

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

`NEXT_PUBLIC_SITE_URL` define la URL canónica pública. Copia `.env.example` a `.env.local` al desplegar y reemplaza `https://example.com`. En desarrollo se usa `http://localhost:3000` si falta.

## Arquitectura

- `app/`: rutas estáticas y plantillas dinámicas del App Router.
- `components/`: interfaz compartida, finder y comparador.
- `lib/products.ts`: modelo central y fixtures con `null` para campos sin verificar.
- `lib/editorial.ts`: ejemplos de páginas editoriales.
- `lib/seo.ts` y `lib/seo-data.ts`: metadata, canónicas y datos estructurados.
- `lib/analytics.ts`: eventos locales mediante `CustomEvent`, sin envío de datos.

## Contenido

Para añadir un producto, crea un registro en `products` con ID y slug únicos, fuentes y fecha de consulta. Cada dato debe tener respaldo. No introduzcas valores estimados como si fueran especificaciones. Las imágenes actuales son esquemas CSS genéricos, no fotografías del modelo. Las fichas dejan la compatibilidad con tipos de pelo sin evaluar hasta que haya evidencia.

Para añadir una marca basta con añadir un producto de esa marca; la ruta de marca se genera automáticamente. Para una comparativa específica, añade un par editorial a `app/comparativas/[slug]/page.tsx`. Para una guía, amplía `lib/editorial.ts`; para una página “mejores para”, añade un criterio editorial allí. El sitemap enumera únicamente las páginas publicadas. No generamos todas las combinaciones ni una página por sinónimo.

## Comercios y afiliación

Cada producto tiene `offers`. `getMerchantOffer(productId, merchant)` centraliza su acceso. Las URL faltantes permanecen en `null`; el CTA aparece desactivado. Al integrar Amazon España, confirma condiciones del programa, variante y destino antes de introducir la URL en el dato, nunca en el componente. Los enlaces comerciales usan `rel="nofollow sponsored noopener noreferrer"`. El aviso legal es provisional y requiere revisión antes de activar monetización.

## SEO e indexación

Homepage, categoría, fichas, guía, página por necesidad, marca y comparativa editorial tienen canonical e indexación. Finder y comparador dinámico son `noindex` y están excluidos del sitemap. Robots permite rastrearlos para que los buscadores puedan leer la directiva `noindex`. Metadata Open Graph/Twitter, breadcrumbs, WebSite y Product/Article sencillos sin ratings ni ofertas falsas. Antes de publicar, configura URL real y revisa contenido, fuentes y Search Console.

## Analytics

`track()` emite `manto:analytics` para los eventos previstos. No hay proveedor conectado. Al integrarlo, escucha el evento y envíalo al servicio escogido respetando la configuración de privacidad. Los eventos comerciales solo deben emitirse al hacer clic real en un enlace activo.

## Estado y próximos datos

V1 técnica completa y build estático verificado. Pendientes: fotografías propias o autorizadas, variantes y disponibilidad en España, precios fechados, enlaces de afiliado reales, especificaciones faltantes, pruebas de ruido/captura/corte/limpieza y revisión jurídica. El finder devuelve una lista de investigación con razones verificables; el presupuesto y sensibilidad al ruido generan avisos cuando no existen datos suficientes.
