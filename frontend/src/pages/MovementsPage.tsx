import { useMovements } from '../hooks/useMovements';
import { MovementList } from '../components/MovementList';

const INVESTOR_ID = 'INV-001';

export function MovementsPage() {
  const { movements, loading, error } = useMovements(INVESTOR_ID);

  return (
    <main className="page">
      <h1>Mis Movimientos</h1>

      {loading && <p className="loading-state">Cargando movimientos...</p>}

      {error && <p className="error-state">Algo salió mal. Intenta nuevamente.</p>}

      {!loading && !error && <MovementList movements={movements} />}
    </main>
  );
}
