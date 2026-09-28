import { SITE_NAME } from '@/lib/site';
export function ProductIllustration({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`machine-art ${small ? 'small' : ''}`}
      role="img"
      aria-label="Ilustración esquemática de un equipo de grooming con aspiración; no representa un modelo concreto"
    >
      <span className="art-shadow" />
      <span className="art-body">
        <span className="art-label">{SITE_NAME.toUpperCase().replace(' ', ' / ')}</span>
        <span className="art-window" />
        <span className="art-base" />
      </span>
      <span className="art-hose" />
      <span className="art-head" />
      <span className="art-note">Representación conceptual</span>
    </div>
  );
}
