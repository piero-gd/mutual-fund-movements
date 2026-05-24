import type { Movement } from '../types/movement';
import {
  formatAmount,
  formatDate,
  getOperationTypeClass,
  getOperationTypeLabel,
  getStatusClass,
  getStatusLabel,
} from '../utils/movementFormatters';

interface MovementCardProps {
  movement: Movement;
}

export function MovementCard({ movement }: MovementCardProps) {
  return (
    <article className="movement-card">
      <div className="movement-card__header">
        <span className="movement-card__fund">{movement.fundName}</span>
        <span className={`badge badge--type ${getOperationTypeClass(movement.operationType)}`}>
          {getOperationTypeLabel(movement.operationType)}
        </span>
      </div>
      <div className="movement-card__footer">
        <span className={`badge badge--status ${getStatusClass(movement.status)}`}>
          {getStatusLabel(movement.status)}
        </span>
        <span className="movement-card__amount">{formatAmount(movement.amount)}</span>
        <span className="movement-card__date">{formatDate(movement.date)}</span>
      </div>
    </article>
  );
}
