# AI Development Log

Registro transparente del uso de **GitHub Copilot (Claude Sonnet 4.6)** durante el desarrollo de este MVP.  
El objetivo es documentar cuándo la IA aportó valor real, cuándo me equivoqué al seguirla y qué validé yo de forma independiente.

---

## Metodología de trabajo

Flujo aplicado en toda la sesión: **proponer → evaluar → aprobar o rechazar → implementar**.  
Ningún bloque de código fue aceptado sin revisión. El evaluador final de cada decisión fue el desarrollador.

Regla principal: si la IA propone algo que no entiendo completamente, no lo acepto.

---

## Sesión: 2026-05-24

### Tareas delegadas a la IA

| # | Prompt / tarea | Resultado |
|---|---|---|
| 1 | Diseñar la arquitectura del backend (capas, paquetes, tecnologías) | Aceptado con revisión |
| 2 | Generar entidad `Movement` sin Lombok | Aceptado |
| 3 | Implementar `MovementServiceImpl` con lógica de mapeo | Aceptado con revisión |
| 4 | Generar seed data `data.sql` con 2 inversores y 9 movimientos | Aceptado |
| 5 | Diagnosticar error: `data.sql` no se ejecutaba | Aceptado — causa: falta `spring.jpa.defer-datasource-initialization=true` |
| 6 | Generar tests unitarios e integración | Aceptado con revisión |
| 7 | Scaffoldear el frontend (estructura de carpetas, tipos, API layer, hook, componentes) | Aceptado con revisión |
| 8 | Diagnosticar error: `App.tsx` con contenido del template de Vite mezclado | Aceptado — causa: `replace_string_in_file` parcial; resuelto con `Set-Content` |
| 9 | Implementar estados de UI: spinner, error con retry, empty state | Aceptado con modificaciones menores |
| 10 | Añadir polish visual: border de acento en cards según estado | Aceptado |
| 11 | Reescribir `README.md` completo y autocontenido | Aceptado con revisión |
| 12 | Proponer estructura de `ai-log.md` | Aceptado |

---

## Sesión: 2026-05-25

### Tareas delegadas a la IA

| # | Prompt / tarea | Resultado |
|---|---|---|
| 1 | Validación final contra el enunciado original | Aceptado — identificó CI/CD y tests de frontend como únicos ítems pendientes |
| 2 | Proponer opciones de workflow CI/CD en GitHub Actions | Aceptado — Opción B (jobs paralelos) elegida |
| 3 | Implementar `.github/workflows/ci.yml` | Aceptado con corrección previa: se detectó que `mvnw` tenía modo `100644` en git y se corrigió a `100755` antes de crear el workflow |
| 4 | Diagnosticar error de CI: `App.css` con carácter no-UTF8 (`0x97`) | Diagnosticado correctamente — em-dash en Windows-1252; usuario resolvió directamente |
| 5 | Diagnosticar error de CI: `maven-wrapper.properties: No such file` | Diagnosticado — `.mvn/` estaba en `.gitignore`; resuelto con excepción `!backend/.mvn/wrapper/maven-wrapper.properties` |
| 6 | Proponer herramienta y conjunto mínimo de tests de frontend | Aceptado — Vitest + RTL, 3 archivos, 18 tests |
| 7 | Implementar tests de frontend | Aceptado con corrección: assertion `/5/` en `MovementCard.test.tsx` colisionaba con la fecha; corregido a `/S\/\s*5[.,]000/` |
| 8 | Diagnosticar error de CI: `'test' does not exist in type 'UserConfigExport'` | Diagnosticado — `defineConfig` importado desde `'vite'` no incluye tipos de Vitest; corregido a `vitest/config` |

### Decisiones aceptadas

- **Jobs paralelos en CI**: dos jobs independientes (`backend` / `frontend`) sobre `ubuntu-latest`. Aceptado porque un fallo en uno no oculta el estado del otro.
- **`--no-transfer-progress` en Maven CI**: evita miles de líneas de logs de descarga. Aceptado.
- **Cache de Maven y npm en CI**: `actions/setup-java` con `cache: maven` y `actions/setup-node` con `cache: npm`. Aceptado por acelerar builds subsiguientes.
- **`npm ci` en lugar de `npm install` en CI**: reproducible y falla si hay discrepancias con `package-lock.json`. Aceptado como estándar correcto para CI.
- **`import { defineConfig } from 'vitest/config'`**: Opción A recomendada por ser el patrón oficial de Vitest. Aceptado.

### Decisiones rechazadas o corregidas

- **Job único secuencial (Opción A de CI)**: descartado porque oculta fallos — si el backend falla, el frontend nunca se evalúa.
- **`mvn` directo en CI sin wrapper**: descartado por inconsistencia con el README que usa `mvnw`, y porque la versión de Maven del runner podría no coincidir.
- **Assertion `/5/` en test de monto**: la IA propuso esa regex que colisionó con la fecha formateada. Corregida a `/S\/\s*5[.,]000/` para apuntar al monto específico.

### Lo que validé manualmente

- [x] Ejecuté `npm test` localmente tras cada cambio — 18/18 tests pasando
- [x] Ejecuté `npm run build` localmente tras cambiar `vite.config.ts` — build limpio sin errores de tipos
- [x] Verifiqué en GitHub Actions que el workflow se ejecutó correctamente en ambos jobs tras los fixes
- [x] Revisé el contenido de `maven-wrapper.properties` antes de forzar su tracking con `git add -f`

---

### Decisiones aceptadas

- **Arquitectura por capas** (controller → service → repository): propuesta por la IA, aceptada porque es el estándar de facto en Spring Boot y facilita el testing por capa de forma independiente.
- **Records de Java para DTOs**: `MovementResponse` y `ErrorResponse` como `record`. Propuesta por la IA, aceptada porque son inmutables y no necesitan lógica adicional.
- **`private static toResponse()` en el servicio**: método de mapeo estático sin librería externa (MapStruct, ModelMapper). Aceptado porque es simple y no añade dependencias.
- **`useMovements` hook con `retryCount`**: estado interno que incrementa para forzar re-ejecución del `useEffect`. Elegante y sin librerías; aceptado.
- **`movementFormatters.ts` con funciones puras**: separación de lógica de presentación de los componentes React. Propuesta por la IA, aceptada por facilitar testing futuro sin renderizar React.
- **BEM para CSS**: convención de naming para clases. Aceptada porque es predecible y escalable.
- **Maven Wrapper (`mvnw`)**: añadido para que el proyecto sea reproducible sin Maven instalado globalmente. Propuesta acertada.

---

### Decisiones rechazadas o corregidas

- **Lombok**: la IA lo incluyó inicialmente en `pom.xml`. **Rechazado** — incompatible con Java 25. La IA lo diagnosticó correctamente al fallar los tests y propuso eliminar Lombok y escribir constructores/getters/setters explícitos. Corrección aceptada.
- **`mvn` en el README**: el README inicial generado usaba `mvn spring-boot:run`. **Corregido** a `.\mvnw.cmd` / `./mvnw` porque Maven no está en el PATH del sistema.
- **`.github/workflows/ci.yml` en el árbol del README**: la IA incluyó este archivo en la estructura aunque no existe. **Corregido** en la reescritura del README.
- **`@ExceptionHandler(Exception.class)` genérico**: aceptable para el MVP pero señalado como limitación. En producción requeriría handlers específicos por excepción.
- **`@CrossOrigin` hardcodeado a `localhost:5173`**: funcional para desarrollo pero señalado como pendiente de configuración por entorno (dev/prod).

---

### Lo que validé manualmente

- [x] Ejecuté `.\mvnw.cmd test` y revisé la salida de los 4 tests — todos pasaron
- [x] Abrí `http://localhost:8080/api/v1/investors/INV-001/movements` en el navegador y verifiqué el JSON retornado
- [x] Revisé la consola H2 (`/h2-console`) para confirmar que `data.sql` insertó los 9 registros
- [x] Verifiqué visualmente el frontend: spinner al cargar, cards con border de color según estado, badge de tipo y estado, fecha y monto formateados correctamente
- [x] Probé el estado de error desconectando el backend y verificando el banner de error con botón "Reintentar"
- [x] Leí y entendí cada archivo generado antes de aprobarlo — no hubo aceptación ciega
- [x] Revisé el `README.md` final antes de commitear para confirmar que los comandos son correctos

---

### Observaciones sobre la IA en esta sesión

> La IA fue muy útil para la generación inicial de boilerplate (entidades JPA, controladores, tests). El mayor riesgo fue en los detalles de configuración: `data.sql` timing, rutas de Maven, contenido residual en `App.tsx`. Todos esos bugs los introdujo la propia IA o su entorno de ejecución, y también los diagnosticó cuando se los señalé con el error concreto.
>
> El flujo más efectivo fue: _describir el problema con el output del error exacto → recibir diagnóstico → validar la causa yo mismo → aprobar la solución_.
>
> No usé la IA para pensar el diseño: la arquitectura por capas, la decisión de no usar librerías de mapeo, y el modelo de datos los evalué yo antes de pedir que los implementara.
