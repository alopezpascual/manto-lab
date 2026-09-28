export const SITE_NAME = 'Manto Lab';
export const SITE_DESCRIPTION =
  'Compara kits de peluquería canina con aspiración con datos trazables, criterios claros y sin puntuaciones inventadas.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const canonical = (path: string) => `${SITE_URL}${path}`;
