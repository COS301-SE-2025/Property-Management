# Property Management System - Software Requirements Specifications

## 1. Architectural Design Strategy

The project uses **Decomposition**, which modularizes the system into smaller, more manageable parts:

### 1.1 Reasons for us using decomposition:
- **Improved understanding of system**: Understanding each smaller part makes it easier for each member to understand the system as a whole.
- **Increased maintainability**: Changes are localised to specific parts, reducing the risk of changes affecting unrelated parts.

- **Faster development**: Each member can be delegated or assigned a part which makes it quicker to develop since each person doesnt need to rely on a component being done first.

- **Better scalability**: Each individual part can be scaled independently based on its needs.

## 2. Architectural Strategies

The project uses a **Layered Architecture**, which separates concerns across the system:

- **Presentation Layer**: Angular + PrimeNG frontend, served via Ionic for hybrid mobile use.
- **Application Layer**: **Kotlin Spring Boot services**, implementing core business logic and REST endpoints.
- **Persistence Layer**: PostgreSQL used for structured data. AWS S3 is used for storing media assets.
- **Integration Layer**: RESTful APIs exposed to frontend clients and external systems.
- **Security Layer**: Authentication and authorization via **AWS Cognito**, session management via Spring Security.

This pattern improves modularity, security, testability, and maintenance.

---

## 3. Architectural Quality Requirements

### 3.1 Performance

### 3.2 Reliability

### 3.3 Security

### 3.4 Maintainability

### 3.5 Usability

## 4. Architectural Design and pattern

## 5. Architectural Constraints

## 6. Technology Choices

### 6.1 Postgres

### 6.2 Kotlin springboot 

### 6.3 Angular