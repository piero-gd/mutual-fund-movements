export type OperationType = 'SUBSCRIPTION' | 'REDEMPTION';

export type MovementStatus = 'PENDING' | 'COMPLETED' | 'REJECTED';

export interface Movement {
  id: number;
  fundName: string;
  operationType: OperationType;
  status: MovementStatus;
  amount: number;
  date: string; // ISO date string: "YYYY-MM-DD"
}
