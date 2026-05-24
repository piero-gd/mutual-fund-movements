import { useMovements } from '../hooks/useMovements';
import { MovementList } from '../components/MovementList';

const INVESTOR_ID = 'INV-001';

export function MovementsPage() {
  const { movements, loading, error } = useMovements(INVESTOR_ID);

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
            <p className="feedback-state__text">Cargando movimientos...</p>
          </div>
        )}

        {error && (
          <div className="feedback-state feedback-state--error">
            <p className="feedback-state__text">Algo salió mal. Intenta nuevamente.</p>
          </div>
        )}

        {!loading && !error && <MovementList movements={movements} />}
      </main>
    </div>
  );
}
