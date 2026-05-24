import { useEffect, useState } from 'react';
import { fetchMovements } from '../api/movementsApi';
import type { Movement } from '../types/movement';

interface UseMovementsResult {
  movements: Movement[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useMovements(investorId: string): UseMovementsResult {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchMovements(investorId)
      .then(setMovements)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [investorId, retryCount]);

  return {
    movements,
    loading,
    error,
    retry: () => setRetryCount((c) => c + 1),
  };
}
