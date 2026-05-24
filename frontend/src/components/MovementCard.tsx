import type { Movement } from '../types/movement';

interface MovementCardProps {
  movement: Movement;
}

export function MovementCard({ movement }: MovementCardProps) {
  return (
    <div className="movement-card">
      <span className="movement-fund">{movement.fundName}</span>
      <span className="movement-type">{movement.operationType}</span>
      <span className="movement-status">{movement.status}</span>
      <span className="movement-amount">S/ {movement.amount.toFixed(2)}</span>
      <span className="movement-date">{movement.date}</span>
    </div>
  );
}
