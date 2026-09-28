export function Flow() {
  return (
    <div
      className="flow"
      aria-label="El pelo pasa del perro al accesorio, por la manguera de aspiración y al depósito"
    >
      {[
        ['01', 'Manto'],
        ['02', 'Accesorio'],
        ['03', 'Aspiración'],
        ['04', 'Depósito'],
      ].map(([n, label], i) => (
        <div className="flow-step" key={n}>
          <span>{n}</span>
          <strong>{label}</strong>
          {i < 3 && <b aria-hidden="true">→</b>}
        </div>
      ))}
    </div>
  );
}
