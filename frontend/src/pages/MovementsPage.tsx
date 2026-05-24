import { useMovements } from '../hooks/useMovements';
import { MovementList } from '../components/MovementList';

const INVESTOR_ID = 'INV-001';

export function MovementsPage() {
  const { movements, loading, error, retry } = useMovements(INVESTOR_ID);

  return (
    <div className="page">
      <header className="page__header">
        <div className="page__header-content">
          <h1 className="page__title">Movimientos del Fondo Mutuo</h1>
          <p className="page__subtitle">Inversor: {INVESTOR_ID}</p>
        </div>
        {!loading && !error && (
          <span className="page__count">
            {movements.length} movimiento{movements.length !== 1 ? 's' : ''}
          </span>
        )}
      </header>

      <main className="page__content">
        {loading && (
          <div className="feedback-state">
            <svg className="spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeDasharray="47 16" />
            </svg>
            <p className="feedback-state__text">Cargando movimientos...</p>
          </div>
        )}

        {error && (
          <div className="feedback-state feedback-state--error">
            <svg className="feedback-state__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M10.29 3.86 1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="feedback-state__text">No se pudieron cargar los movimientos.</p>
            <button className="btn-retry" onClick={retry}>Reintentar</button>
          </div>
        )}

        {!loading && !error && <MovementList movements={movements} />}
      </main>
    </div>
  );
}
