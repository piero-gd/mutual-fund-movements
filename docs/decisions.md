# Decisiones Técnicas

Este documento justifica las decisiones de diseño tomadas durante el desarrollo.

## Backend

### Arquitectura en capas

Se adoptó una separación en capas con responsabilidades bien definidas:

| Capa | Responsabilidad |
|---|---|
| `controller` | Recibe y responde peticiones HTTP; delega al servicio |
| `service` | Contiene la lógica de negocio |
| `domain` | Define las entidades y los enums del negocio |
| `persistence` | Acceso a datos mediante repositorios JPA |
| `dto` | Objetos de transferencia que desacoplan la API del dominio interno |
| `exception` | Manejo centralizado de errores con respuestas claras |

**Por qué**: Facilita el testing por capa, la legibilidad del código y la evolución independiente de cada responsabilidad. Sigue el principio de Single Responsibility (SOLID).

### Build tool: Maven

Elegido sobre Gradle por ser el estándar de facto en proyectos Spring Boot enterprise. Tiene mayor compatibilidad en CI/CD y el `pom.xml` es declarativo y legible sin necesidad de personalización.

### Java 17

Versión LTS con soporte extendido. Es la versión mínima requerida por Spring Boot 3.x.

### Spring Boot 3.3.x

Última rama estable de Spring Boot 3. Compatible con Java 17, incluye autoconfiguración de JPA, H2 y el servidor embebido Tomcat sin configuración adicional.

### H2 en memoria

Permite arrancar el servicio sin infraestructura externa. Suficiente para demostrar la funcionalidad del MVP. La migración a una base de datos persistente (PostgreSQL, MySQL) solo requiere cambiar el datasource y las dependencias.

### DTOs de respuesta

La API retorna DTOs, no entidades JPA directamente. Esto evita exponer la estructura interna del dominio y permite evolucionar el modelo sin romper el contrato de la API.

---

## Frontend

### Vite + React + TypeScript

- **Vite** sobre Create React App: bundling más rápido, HMR instantáneo, configuración moderna.
- **TypeScript**: tipado estático que reduce errores en tiempo de desarrollo y sirve como documentación viva de los contratos de datos.

### Estructura de carpetas

| Carpeta | Responsabilidad |
|---|---|
| `api/` | Encapsula todas las llamadas HTTP; el resto de la app no conoce `fetch` ni URLs |
| `types/` | Define interfaces TypeScript compartidas entre capas |
| `hooks/` | Lógica de carga/estado de datos desacoplada de la UI |
| `components/` | Componentes visuales reutilizables, sin lógica de negocio |
| `pages/` | Pantallas completas que componen componentes y consumen hooks |

**Por qué**: Sigue el principio de separación de responsabilidades. Permite testear la lógica (hooks) sin renderizar UI y testear la UI sin depender de la API.

### Testing: Vitest + React Testing Library

Elegido sobre Jest por ser el par natural de Vite: reutiliza la misma configuración de build, sin boilerplate adicional de Babel o `ts-jest`. La API es compatible con Jest, por lo que el conocimiento es transferible. React Testing Library complementa Vitest para testear componentes desde la perspectiva del usuario (texto visible, roles), no de detalles de implementación.

Cobertura implementada: funciones puras (`movementFormatters`), componente con variantes de estado (`MovementCard`) y hook asíncrono con fetch mockeado (`useMovements`).

---

## Repositorio

### Conventional Commits

Commits pequeños y semánticamente descriptivos (`feat:`, `fix:`, `test:`, `ci:`). Facilita el tracking de cambios, la generación de changelogs y la revisión de PR.

### CI/CD: GitHub Actions con jobs paralelos

Dos jobs independientes (`backend` y `frontend`) que corren en paralelo sobre `ubuntu-latest`. El job de backend ejecuta `./mvnw test`; el de frontend ejecuta `npm test` seguido de `npm run build`. Disparado en push y pull_request a `main`.

**Por qué paralelos y no un solo job secuencial**: si un job falla, el otro sigue corriendo y se puede ver exactamente qué parte rompió. Con un job secuencial, un fallo de backend impediría saber si el frontend también tenía errores.
