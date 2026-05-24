# Supuestos del Proyecto

Este documento registra las decisiones tomadas ante información incompleta en el enunciado.

## Dominio

1. **Identificación del inversionista**  
   El enunciado no define autenticación. Se asume un `investorId` como parámetro de ruta. El endpoint principal es `GET /api/v1/investors/{investorId}/movements`. No se implementa auth en esta etapa MVP.

2. **Campos de un movimiento**  
   El enunciado lista: fondo asociado, tipo de operación, estado, monto y fecha.  
   Se asume que un movimiento incluye también un `id` único para identificación.

3. **Tipos de operación**  
   El enunciado no los enumera. Se asumen dos tipos representativos del negocio:
   - `SUBSCRIPTION` — suscripción / aporte al fondo
   - `REDEMPTION` — rescate / retiro del fondo

4. **Estados posibles**  
   El enunciado menciona "operaciones en proceso". Se asumen tres estados:
   - `COMPLETED` — operación finalizada
   - `PENDING` — operación en proceso
   - `REJECTED` — operación rechazada

5. **Moneda**  
   Se asume moneda única (PEN — soles peruanos) para el MVP. No se contempla conversión de moneda.

6. **Nombre del fondo**  
   Se asume que el fondo tiene nombre y se retorna como campo de texto descriptivo. No se modela como entidad separada en esta etapa.

7. **Datos de prueba**  
   Se utilizan datos semilla en H2 (`data.sql`) para simular movimientos reales sin necesidad de infraestructura externa.

8. **Sin paginación**  
   El MVP no incluye paginación. Se retornan todos los movimientos del inversionista ordenados por fecha descendente.

## Frontend

1. **Inversionista de prueba**  
   Para el MVP se usa un `investorId` fijo (`"INV-001"`) para demostración, hardcodeado en la página principal.

2. **Conexión con el backend**  
   El frontend se conecta al backend real. Si el backend no está disponible, se documentará como pendiente y se usarán datos simulados como fallback temporal.
