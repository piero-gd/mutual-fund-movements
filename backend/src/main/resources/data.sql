-- ─────────────────────────────────────────────────────────────────────────────
-- Seed data – Mutual Fund Movements
-- Inversionista 1: INV-001 (5 movimientos)
-- Inversionista 2: INV-002 (4 movimientos)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO movements (id, investor_id, fund_name, operation_type, status, amount, date) VALUES
-- INV-001
(1,  'INV-001', 'Fondo Conservador Soles',    'SUBSCRIPTION', 'COMPLETED', 5000.00,  '2025-05-01'),
(2,  'INV-001', 'Fondo Conservador Soles',    'REDEMPTION',   'COMPLETED', 1500.00,  '2025-05-10'),
(3,  'INV-001', 'Fondo Crecimiento Moderado', 'SUBSCRIPTION', 'COMPLETED', 8000.00,  '2025-05-15'),
(4,  'INV-001', 'Fondo Crecimiento Moderado', 'SUBSCRIPTION', 'PENDING',   3000.00,  '2025-05-20'),
(5,  'INV-001', 'Fondo Renta Variable',       'SUBSCRIPTION', 'REJECTED',  10000.00, '2025-05-22'),

-- INV-002
(6,  'INV-002', 'Fondo Conservador Soles',    'SUBSCRIPTION', 'COMPLETED', 12000.00, '2025-04-15'),
(7,  'INV-002', 'Fondo Renta Variable',       'SUBSCRIPTION', 'COMPLETED', 6500.00,  '2025-04-28'),
(8,  'INV-002', 'Fondo Renta Variable',       'REDEMPTION',   'PENDING',   2000.00,  '2025-05-18'),
(9,  'INV-002', 'Fondo Conservador Soles',    'REDEMPTION',   'COMPLETED', 3000.00,  '2025-05-21');
