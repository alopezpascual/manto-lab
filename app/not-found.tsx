import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="container not-found">
      <p className="eyebrow">ERROR 404</p>
      <h1>Esta página no está en el laboratorio.</h1>
      <p>Quizá la dirección haya cambiado o todavía no exista.</p>
      <Link className="button dark" href="/">
        Volver al inicio ↗
      </Link>
    </div>
  );
}
