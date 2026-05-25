import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MovementCard } from '../components/MovementCard';
import type { Movement } from '../types/movement';

const base: Movement = {
  id: 1,
  fundName: 'Fondo Conservador PEN',
  operationType: 'SUBSCRIPTION',
  status: 'COMPLETED',
  amount: 5000,
  date: '2025-01-10',
};

describe('MovementCard', () => {
  it('renders the fund name and amount', () => {
    render(<MovementCard movement={base} />);
    expect(screen.getByText('Fondo Conservador PEN')).toBeInTheDocument();
    expect(screen.getByText(/S\/\s*5[.,]000/)).toBeInTheDocument();
  });

  it('renders status and operation type badges', () => {
    render(<MovementCard movement={base} />);
    expect(screen.getByText('Completado')).toBeInTheDocument();
    expect(screen.getByText('Suscripción')).toBeInTheDocument();
  });

  it('applies the correct accent class for COMPLETED', () => {
    const { container } = render(<MovementCard movement={base} />);
    expect(container.querySelector('article')).toHaveClass('movement-card--completed');
  });

  it('applies the correct accent class for PENDING', () => {
    const { container } = render(
      <MovementCard movement={{ ...base, status: 'PENDING' }} />,
    );
    expect(container.querySelector('article')).toHaveClass('movement-card--pending');
  });

  it('applies the correct accent class for REJECTED', () => {
    const { container } = render(
      <MovementCard movement={{ ...base, status: 'REJECTED' }} />,
    );
    expect(container.querySelector('article')).toHaveClass('movement-card--rejected');
  });
});
