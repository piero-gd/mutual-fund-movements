import type { Movement } from '../types/movement';
import { MovementCard } from './MovementCard';

interface MovementListProps {
  movements: Movement[];
}

export function MovementList({ movements }: MovementListProps) {
  if (movements.length === 0) {
    return <p className="empty-state">No hay movimientos registrados.</p>;
  }

  return (
    <div className="movement-list">
      {movements.map((movement) => (
        <MovementCard key={movement.id} movement={movement} />
      ))}
    </div>
  );
}
