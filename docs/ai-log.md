# AI Development Log

Registro transparente del uso de **GitHub Copilot (Claude Sonnet 4.6)** durante el desarrollo de este MVP.  
El objetivo es documentar cuándo la IA aportó valor real, cuándo me equivoqué al seguirla y qué validé yo de forma independiente.

---

## Metodología de trabajo

Flujo aplicado en toda la sesión: **proponer → evaluar → aprobar o rechazar → implementar**.  
Ningún bloque de código fue aceptado sin revisión. El evaluador final de cada decisión fue el desarrollador.

Regla principal: si la IA propone algo que no entiendo completamente, no lo acepto.

---

## Tareas delegadas a la IA

| # | Prompt / tarea | Resultado |
|---|---|---|
| 1 | Diseñar la arquitectura del backend (capas, paquetes, tecnologías) | Aceptado con revisión |
| 2 | Generar entidad `Movement` sin Lombok | Aceptado |
| 3 | Implementar `MovementServiceImpl` con lógica de mapeo | Aceptado con revisión |
| 4 | Generar seed data `data.sql` con 2 inversores y 9 movimientos | Aceptado |
| 5 | Diagnosticar error: `data.sql` no se ejecutaba | Aceptado — causa: falta `spring.jpa.defer-datasource-initialization=true` |
| 6 | Generar tests unitarios e integración del backend | Aceptado con revisión |
| 7 | Scaffoldear el frontend (estructura de carpetas, tipos, API layer, hook, componentes) | Aceptado con revisión |
| 8 | Diagnosticar error: `App.tsx` con contenido del template de Vite mezclado | Aceptado — causa: sustitución parcial; resuelto sobrescribiendo el archivo completo |
| 9 | Implementar estados de UI: spinner, error con retry, empty state | Aceptado con modificaciones menores |
| 10 | Añadir polish visual: border de acento en cards según estado | Aceptado |
| 11 | Reescribir `README.md` completo y autocontenido | Aceptado con revisión |
| 12 | Proponer estructura de `ai-log.md` | Aceptado |
| 13 | Validación final contra el enunciado original | Aceptado — identificó CI/CD y tests de frontend como únicos ítems pendientes |
| 14 | Implementar `.github/workflows/ci.yml` con jobs paralelos | Aceptado con corrección previa: `mvnw` tenía modo `100644` en git, corregido a `100755` |
| 15 | Diagnosticar error de CI: `App.css` con carácter no-UTF8 (`0x97`) | Diagnosticado correctamente — em-dash en Windows-1252; usuario resolvió directamente |
| 16 | Diagnosticar error de CI: `maven-wrapper.properties: No such file` | Diagnosticado — `.mvn/` en `.gitignore`; resuelto con excepción en gitignore |
| 17 | Proponer herramienta y tests mínimos de frontend | Aceptado — Vitest + RTL, 3 archivos, 18 tests |
| 18 | Implementar tests de frontend | Aceptado con corrección: assertion ambigua en `MovementCard.test.tsx` corregida |
| 19 | Diagnosticar error de CI: `'test' does not exist in type 'UserConfigExport'` | Diagnosticado — corregido importando `defineConfig` desde `vitest/config` |

---

## Decisiones aceptadas

- **Arquitectura por capas** (controller → service → repository): estándar de facto en Spring Boot, facilita testing por capa.
- **Records de Java para DTOs**: `MovementResponse` y `ErrorResponse` como `record` — inmutables, sin lógica adicional.
- **`private static toResponse()` en el servicio**: mapeo inline sin MapStruct ni ModelMapper — simple y sin dependencias extra.
- **`useMovements` hook con `retryCount`**: incrementar el contador fuerza re-ejecución del `useEffect` sin librerías de estado externas.
- **`movementFormatters.ts` con funciones puras**: lógica de presentación separada de componentes React — testeable sin renderizar UI.
- **BEM para CSS**: convención predecible y escalable para naming de clases.
- **Maven Wrapper (`mvnw`)**: proyecto reproducible sin Maven instalado globalmente.
- **Jobs paralelos en CI**: dos jobs independientes — si uno falla, el otro sigue y se puede ver exactamente cuál rompió.
- **`--no-transfer-progress` en Maven CI**: evita miles de líneas de logs de descarga en CI.
- **`npm ci` en CI**: reproducible y falla si hay discrepancias con `package-lock.json`.
- **`import { defineConfig } from 'vitest/config'`**: patrón oficial de Vitest para coexistir con la config de Vite.

---

## Decisiones rechazadas o corregidas

- **Lombok**: incluido inicialmente en `pom.xml`. **Rechazado** — incompatible con Java 25. Se reemplazó con constructores y getters/setters explícitos.
- **`mvn` en el README**: el README inicial usaba `mvn spring-boot:run`. **Corregido** a `mvnw.cmd` / `mvnw` porque Maven no está en el PATH del sistema.
- **`.github/workflows/ci.yml` en el árbol del README**: incluido en la estructura cuando no existía aún. **Corregido** en la reescritura del README.
- **`@ExceptionHandler(Exception.class)` genérico**: aceptable para el MVP, señalado como limitación — producción requeriría handlers específicos.
- **`@CrossOrigin` hardcodeado a `localhost:5173`**: funcional para desarrollo, pendiente de configuración por entorno.
- **Job único secuencial para CI**: descartado — si el backend falla, el frontend nunca se evalúa.
- **Assertion `/5/` en test de monto**: colisionaba con la fecha formateada. Corregida a regex específica del formato de moneda.
- **Supuesto falso en `assumptions.md`**: la documentación afirmaba que el frontend usaría datos simulados como fallback — nunca se implementó. Corregido para reflejar el comportamiento real (error banner con retry).

---

## Lo que validé manualmente

- [x] Ejecuté `mvnw.cmd test` y revisé la salida de los 4 tests — todos pasaron
- [x] Abrí `http://localhost:8080/api/v1/investors/INV-001/movements` en el navegador y verifiqué el JSON retornado
- [x] Revisé la consola H2 (`/h2-console`) para confirmar que `data.sql` insertó los 9 registros
- [x] Verifiqué visualmente el frontend: spinner al cargar, cards con border de color según estado, badges de tipo y estado, fecha y monto formateados
- [x] Probé el estado de error desconectando el backend y verificando el banner de error con botón "Reintentar"
- [x] Ejecuté `npm test` localmente — 18/18 tests pasando
- [x] Ejecuté `npm run build` tras cambiar `vite.config.ts` — build limpio sin errores de tipos
- [x] Verifiqué en GitHub Actions que ambos jobs pasaron tras los fixes
- [x] Leí y entendí cada archivo generado antes de aprobarlo

---

## Observaciones

> La IA fue útil para boilerplate (entidades JPA, controladores, tests, componentes React). El mayor riesgo estuvo en los detalles de configuración: timing de `data.sql`, rutas de Maven, contenido residual en `App.tsx`, permisos de `mvnw`, encoding de `App.css`. Todos esos problemas los introdujo la propia IA o su entorno, y también los diagnosticó cuando se le señaló el error concreto.
>
> El flujo más efectivo: _describir el problema con el output exacto → recibir diagnóstico → validar la causa de forma independiente → aprobar la solución_.
>
> El diseño no fue delegado: la arquitectura por capas, la decisión de no usar librerías de mapeo y el modelo de datos fueron evaluados antes de pedir implementación.