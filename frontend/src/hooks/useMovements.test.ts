import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useMovements } from '../hooks/useMovements';
import type { Movement } from '../types/movement';

vi.mock('../api/movementsApi');
import { fetchMovements } from '../api/movementsApi';

const mockFetch = vi.mocked(fetchMovements);

const mockMovements: Movement[] = [
  {
    id: 1,
    fundName: 'Fondo Conservador PEN',
    operationType: 'SUBSCRIPTION',
    status: 'COMPLETED',
    amount: 5000,
    date: '2025-01-10',
  },
];

describe('useMovements', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts in loading state', () => {
    mockFetch.mockResolvedValue(mockMovements);
    const { result } = renderHook(() => useMovements('INV-001'));
    expect(result.current.loading).toBe(true);
    expect(result.current.movements).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('sets movements after successful fetch', async () => {
    mockFetch.mockResolvedValue(mockMovements);
    const { result } = renderHook(() => useMovements('INV-001'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.movements).toEqual(mockMovements);
    expect(result.current.error).toBeNull();
  });

  it('sets error message when fetch fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useMovements('INV-001'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Network error');
    expect(result.current.movements).toEqual([]);
  });
});
