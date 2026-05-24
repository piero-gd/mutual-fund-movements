import type { Movement } from '../types/movement';

const BASE_URL = 'http://localhost:8080/api/v1';

export async function fetchMovements(investorId: string): Promise<Movement[]> {
  const response = await fetch(`${BASE_URL}/investors/${investorId}/movements`);

  if (!response.ok) {
    throw new Error(`Error al obtener movimientos: ${response.status}`);
  }

  return response.json();
}
