# Coding Standards and Quality Document

## Table of Contents

1. Introduction
2. Coding Conventions
   - Naming Conventions
   - Code Structure
   - Commenting and Documentation
3. File Structure
4. Configuration for Consistent Coding Style
5. Code Quality Tools
6. Changes from Previous Structure
7. Conclusion

---

## 1. Introduction

This document defines the coding standards and quality practices used for the **Property Management** system. As a team, we aim to keep our project maintainable, scalable, and consistent across both frontend and backend. These standards will guide our work, improve readability, and support effective collaboration. We simply used these as a guideline for consistency, however, some rules (like naming conventions) were not expected to be followed strictly.

---

## 2. Coding Conventions

### Naming Conventions

- **Variables**: `camelCase` (e.g., `userName`, `totalAmount`)
- **Functions/Methods**: `camelCase` (e.g., `fetchData()`, `submitForm()`)
- **Classes**: `PascalCase` (e.g., `ContractorService`, `InventoryTracker`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`, `API_TIMEOUT`)
- **Components**: `small-case or camelCase` (e.g., `contractorRegister`, `register-owner`)


### Code Structure

- **Indentation**: 4 spaces (no tabs)
- **Line Length**: Preferably Max 80 characters
- **Braces**: K&R style

```javascript
if (isValid) {
    doSomething();
} else {
    handleError();
}
```

### Commenting and Documentation

- Focus comments on *why*, not *what*.
- Keep component-level and file-level documentation up to date.
- Maintain a root `README.md` with setup, run instructions, and architecture overview.

---

## 3. File Structure

The Property Management project follows a monorepo structure for shared tooling and documentation:

```
property-management/
├── frontend/                    # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/           # Global services and route guards
│   │   │   ├── shared/         # Reusable UI and utilities
│   │   │   ├── features/       # Domain-specific modules
│   │   │   │   ├── contractors/
│   │   │   │   ├── inventory/
│   │   │   │   ├── quotes/
│   │   │   │   └── dashboard/
│   │   └── environments/       # Configuration per environment
├── backend/                     # Kotlin Spring Boot application
│   ├── src/main/kotlin/
│   │   ├── config/             # Global configurations
│   │   ├── controller/         # REST endpoints
│   │   ├── service/            # Business logic layer
│   │   ├── repository/         # JPA interfaces
│   │   ├── entity/             # Database entities
│   │   ├── dto/                # Data transfer objects
│   │   └── security/           # Auth and roles
│   └── src/test/kotlin/        # Unit and integration tests
├── docs/                       # Markdown documentation
├── .editorconfig               # Editor defaults for consistency
├── .gitignore                  # Common exclusions
├── docker-compose.yml          # Containerized setup
├── README.md                   # Project overview and setup
```

---

## 4. Configuration for Consistent Coding Style

### ESLint Configuration (for Angular/TypeScript)

Our ESLint setup extends recommended rules for JavaScript, TypeScript, and Angular. It enforces Angular selector naming conventions:

- **Extends:** ESLint, TypeScript, Angular recommended configs
- **Component selectors:** `app-` prefix, kebab-case
- **Directive selectors:** `app` prefix, camelCase
- **Processes inline templates and HTML files**

See `eslint.config.js` in the frontend project for full details.

---

## 5. Code Quality Tools

| Tool          | Purpose                                 |
| ------------- | --------------------------------------- |
| **Prettier**  | Code formatting                         |
| **ESLint**    | Static code linting for TypeScript      |

---

## 6. Changes from Previous Structure

### Improvements Made

- Added project-level config files (`.gitignore`, `.editorconfig`, `docker-compose.yml`, `README.md`) directly under the root folder for centralized tooling and clearer documentation.
- Removed unused folders (`database/`, `infrastructure/`, `.github/`) to simplify the project structure and reflect the current working state of the codebase.
- Cleaned and grouped logical modules under `features/` to improve frontend discoverability.
- Consolidated backend services into modular layers (controller, service, repository, etc.).

---

## 7. Conclusion

These coding standards ensure that our **Property Management** system remains clean, readable, and scalable. All contributors are expected to follow these conventions to promote consistency across the team. This document will evolve with the project, adapting to new tools, technologies, and practices.

