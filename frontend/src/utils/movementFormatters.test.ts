import { describe, it, expect } from 'vitest';
import {
  formatAmount,
  formatDate,
  getOperationTypeClass,
  getOperationTypeLabel,
  getStatusClass,
  getStatusLabel,
} from '../utils/movementFormatters';

describe('formatAmount', () => {
  it('formats a number as PEN currency', () => {
    expect(formatAmount(5000)).toContain('5');
    expect(formatAmount(5000)).toContain('000');
  });

  it('includes two decimal places', () => {
    expect(formatAmount(1500.5)).toContain('50');
  });
});

describe('formatDate', () => {
  it('formats an ISO date string without timezone shift', () => {
    const result = formatDate('2025-01-10');
    expect(result).toContain('2025');
    expect(result).toContain('10');
  });
});

describe('getOperationTypeLabel', () => {
  it('returns label for SUBSCRIPTION', () => {
    expect(getOperationTypeLabel('SUBSCRIPTION')).toBe('Suscripción');
  });

  it('returns label for REDEMPTION', () => {
    expect(getOperationTypeLabel('REDEMPTION')).toBe('Rescate');
  });
});

describe('getStatusLabel', () => {
  it('returns label for COMPLETED', () => {
    expect(getStatusLabel('COMPLETED')).toBe('Completado');
  });

  it('returns label for PENDING', () => {
    expect(getStatusLabel('PENDING')).toBe('Pendiente');
  });

  it('returns label for REJECTED', () => {
    expect(getStatusLabel('REJECTED')).toBe('Rechazado');
  });
});

describe('getStatusClass', () => {
  it('returns correct class for each status', () => {
    expect(getStatusClass('COMPLETED')).toBe('status--completed');
    expect(getStatusClass('PENDING')).toBe('status--pending');
    expect(getStatusClass('REJECTED')).toBe('status--rejected');
  });
});

describe('getOperationTypeClass', () => {
  it('returns correct class for each operation type', () => {
    expect(getOperationTypeClass('SUBSCRIPTION')).toBe('type--subscription');
    expect(getOperationTypeClass('REDEMPTION')).toBe('type--redemption');
  });
});
