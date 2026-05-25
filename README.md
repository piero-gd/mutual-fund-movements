# Mutual Fund Movements

MVP de una pantalla web para que un inversionista visualice sus movimientos recientes de Fondos Mutuos.  
Backend REST con Spring Boot · Frontend con React + TypeScript.

---

## Prerrequisitos

| Herramienta | Versión mínima |
|---|---|
| Java | 17 (LTS) |
| Node.js | 18 |
| npm | 9 |
| Maven | 3.x — o usar el wrapper `mvnw` incluido en el proyecto |

---

## Levantar el proyecto

### Backend

```bash
cd backend

# Windows
.\mvnw.cmd spring-boot:run

# Linux / macOS
./mvnw spring-boot:run
```

Disponible en: `http://localhost:8080`  
Consola H2 (solo desarrollo): `http://localhost:8080/h2-console`  
— JDBC URL: `jdbc:h2:mem:mutualfunddb` · Usuario: `sa` · Sin contraseña

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Disponible en: `http://localhost:5173`  
Requiere que el backend esté corriendo para cargar datos reales.

---

## Endpoint principal

```
GET /api/v1/investors/{investorId}/movements
```

| Parámetro | Tipo | Descripción |
|---|---|---|
| `investorId` | `String` | Identificador del inversionista (ej. `INV-001`) |

**Respuesta exitosa `200 OK`**

```json
[
  {
    "id": 1,
    "fundName": "Fondo Conservador PEN",
    "operationType": "SUBSCRIPTION",
    "status": "COMPLETED",
    "amount": 5000.00,
    "date": "2025-01-10"
  }
]
```

Retorna `[]` si el inversionista no tiene movimientos registrados.

---

## Estructura del proyecto

```
mutual-fund-movements/
├── backend/
│   └── src/
│       ├── main/java/com/coril/mutualfund/
│       │   ├── controller/    # Endpoints HTTP
│       │   ├── service/       # Lógica de negocio
│       │   ├── domain/        # Entidades y enums
│       │   ├── persistence/   # Repositorios JPA
│       │   ├── dto/           # Contratos de respuesta
│       │   └── exception/     # Manejo centralizado de errores
│       └── test/              # Tests unitarios e integración
├── frontend/
│   └── src/
│       ├── api/        # Llamadas HTTP
│       ├── hooks/      # Estado asíncrono
│       ├── types/      # Interfaces TypeScript
│       ├── components/ # Componentes presentacionales
│       ├── pages/      # Pantallas
│       └── utils/      # Formateadores de presentación
└── docs/
    ├── assumptions.md  # Supuestos detallados
    └── decisions.md    # Decisiones técnicas detalladas
```

---

## Decisiones técnicas

| Área | Decisión | Justificación |
|---|---|---|
| Arquitectura backend | Capas (controller → service → repository) | Separación de responsabilidades; facilita el testing por capa y la evolución independiente |
| Build tool | Maven + wrapper `mvnw` | Estándar en proyectos Spring Boot enterprise; reproducible sin instalación global |
| Runtime Java | Java 25 · bytecode target 17 | Java 17 es la versión mínima de Spring Boot 3.x; target 17 garantiza compatibilidad |
| Base de datos | H2 en memoria | Sin infraestructura externa para el MVP; migración a PostgreSQL solo requiere cambiar el datasource |
| DTOs de respuesta | `MovementResponse` record separado de la entidad | Desacopla el contrato de la API del modelo de dominio; permite evolucionar uno sin romper el otro |
| Frontend | Vite + React + TypeScript | HMR rápido; tipado estático como documentación viva del contrato de datos |
| Consumo de API | `fetch` nativo + servicio + hook | Sin dependencias extra; `movementsApi.ts` aísla HTTP, `useMovements` aísla estado asíncrono |
| Formateo visual | `movementFormatters.ts` (funciones puras) | Lógica de presentación separada de la UI — testeable sin renderizar React |

---

## Supuestos ante información incompleta

| Campo / Área | Supuesto | Razonamiento |
|---|---|---|
| Autenticación | No implementada; `investorId` como parámetro de ruta | El enunciado no la menciona; el MVP demuestra la funcionalidad sin añadir complejidad de auth |
| Tipos de operación | `SUBSCRIPTION` y `REDEMPTION` | Representan las dos operaciones fundamentales de un fondo mutuo: aporte y retiro |
| Estados posibles | `COMPLETED`, `PENDING`, `REJECTED` | Cubren el ciclo completo de una operación: finalizada, en proceso y rechazada |
| Moneda | PEN (soles peruanos) | Contexto peruano implícito; no se contempla conversión de moneda |
| `id` del movimiento | Campo adicional incluido | Necesario para identificación unívoca y para el `key` en listas React |
| Nombre del fondo | Texto libre, sin entidad separada | Suficiente para el MVP; en producción sería una relación FK a tabla de fondos |
| Paginación | No implementada; se retornan todos los movimientos | El enunciado no la requiere; resultados ordenados por fecha descendente |
| `investorId` en frontend | Fijo (`INV-001`) para demostración | No hay sesión autenticada; el hardcode está aislado en una constante y es fácilmente reemplazable |

---

## Pendientes — qué no se terminó y cómo se resolvería

| Funcionalidad | Estado | Cómo se resolvería |
|---|---|---|
| Autenticación | Fuera del scope del MVP | Spring Security + JWT en el backend; `httpOnly` cookie o header `Authorization` en el frontend |
| Paginación | No implementada | `Pageable` en el repositorio JPA; query params `?page=0&size=20`; componente de paginación o "cargar más" en el frontend |
| `investorId` dinámico | Hardcodeado en `MovementsPage` | Con auth: extraído del token. Sin auth: parámetro de URL (`/investors/:id`) o input de búsqueda |
| Base de datos persistente | H2 en memoria | Cambiar datasource a PostgreSQL + Flyway para migraciones; la lógica de negocio no cambia |
| Errores detallados en frontend | Mensaje genérico | Distinguir `NetworkError` (backend caído), `404` (inversor sin movimientos) y `5xx` con mensajes específicos por caso |
