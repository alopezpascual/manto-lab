export type AnalyticsEvent =
  | 'affiliate_click'
  | 'product_view'
  | 'comparison_started'
  | 'comparison_completed'
  | 'finder_started'
  | 'finder_completed'
  | 'merchant_click'
  | 'filter_used';
export function track(
  event: AnalyticsEvent,
  details: Record<string, string | number | boolean> = {},
) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('manto:analytics', { detail: { event, ...details } }));
}
