import type { MovementStatus, OperationType } from '../types/movement';

export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
  }).format(amount);
}

// Add T00:00:00 to avoid UTC-to-local timezone shift
export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

export function getOperationTypeLabel(type: OperationType): string {
  const labels: Record<OperationType, string> = {
    SUBSCRIPTION: 'Suscripción',
    REDEMPTION: 'Rescate',
  };
  return labels[type];
}

export function getStatusLabel(status: MovementStatus): string {
  const labels: Record<MovementStatus, string> = {
    PENDING: 'Pendiente',
    COMPLETED: 'Completado',
    REJECTED: 'Rechazado',
  };
  return labels[status];
}

export function getStatusClass(status: MovementStatus): string {
  const classes: Record<MovementStatus, string> = {
    PENDING: 'status--pending',
    COMPLETED: 'status--completed',
    REJECTED: 'status--rejected',
  };
  return classes[status];
}

export function getOperationTypeClass(type: OperationType): string {
  const classes: Record<OperationType, string> = {
    SUBSCRIPTION: 'type--subscription',
    REDEMPTION: 'type--redemption',
  };
  return classes[type];
}
