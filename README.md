# Mutual Fund Movements

Servicio web para que un inversionista pueda visualizar sus movimientos recientes de Fondos Mutuos.

## Estructura del proyecto

```
mutual-fund-movements/
├── backend/          # Spring Boot (Java 17 + Maven)
├── frontend/         # React + TypeScript (Vite)
├── docs/
│   ├── assumptions.md   # Supuestos ante información incompleta
│   └── decisions.md     # Decisiones técnicas justificadas
└── .github/
    └── workflows/
        └── ci.yml    # GitHub Actions CI
```

## Levantar el backend

```bash
cd backend
mvn spring-boot:run
```

El servicio queda disponible en `http://localhost:8080`.  
Consola H2 (solo dev): `http://localhost:8080/h2-console`

## Levantar el frontend

```bash
cd frontend
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

## Endpoint principal

```
GET /api/v1/investors/{investorId}/movements
```

## Documentación

- [Supuestos](docs/assumptions.md)
- [Decisiones técnicas](docs/decisions.md)
