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
- **API Response Time:** ≤ 500ms for 95% of requests under normal load
- **Database Query Performance:** ≤ 200ms for complex queries involving joins across 3+ tables
- **File Upload Performance:** ≤ 2 seconds for images up to 10MB
- **Page Load Time:** ≤ 3 seconds for initial page load, ≤ 1 second for subsequent navigations
- **Concurrent User Support:** Support 100 concurrent users without performance degradation
### 3.2 Reliability
- **System Uptime:** 99.5% availability (maximum 3.65 hours downtime per month)
- **Data Consistency:** 100% ACID compliance for financial transactions
- **Backup Recovery:** Recovery Point Objective (RPO) ≤ 1 hour, Recovery Time Objective (RTO) ≤ 4 hours
- **Failover Time:** ≤ 30 seconds for automatic failover in case of primary system failure
### 3.3 Security
- **Authentication:** Use AWS Cognito for authentication. Apply Spring Security in the Kotlin backend with secure session management, CSRF protection, and encrypted HTTPS communication. Sensitive media (e.g., proof of work images) stored securely on AWS S3.

### 3.4 Maintainability
- **Code Coverage:** ≥ 85% unit test coverage, ≥ 70% integration test coverage
- **Documentation Coverage:** 100% of public APIs documented with OpenAPI/Swagger
- **Deployment Time:** ≤ 10 minutes for zero-downtime deployments
- **Bug Fix Time:** 95% of critical bugs resolved within 24 hours
### 3.5 Usability
- **User Interface Responsiveness:** Frontend built with Angular and PrimeNG, offering both light and dark mode. UI is responsive and optimized for mobile, especially for capturing images on-site.
- **User Task Completion:** ≥ 90% task completion rate for core workflows
- **Browser Compatibility:** Support for Chrome, Firefox, Safari, Edge (latest 2 versions)
## 4. Architectural Design and pattern

## 5. Architectural Constraints
#### 5.1 Constraint Satisfaction Matrix

| Constraint | Architecture Component | Satisfaction Method |
|------------|----------------------|---------------------|
| Multi-tenancy | Schema-per-tenant PostgreSQL + Tenant-aware services | Complete data isolation |
| AWS Free Tier | RDS PostgreSQL + EC2 + S3 + Cognito | Careful resource management |
| PrimeNG Requirement | Angular frontend with PrimeNG components | Direct integration |
| Security Best Practices | Spring Security + AWS Cognito + RBAC | Multi-layer security |
| Mobile Support | Responsive Angular UI + PWA capabilities | Cross-platform compatibility |
## 6. Technology Choices

### 6.1 Postgres

| Option                    | Pros                                                                                      | Cons                                             |
| ------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **PostgreSQL** (✔ Chosen) | ACID-compliant, open-source, strong support for complex queries and JSON, AWS RDS support | Slightly heavier than NoSQL                      |
| MySQL                     | Popular, fast, good tooling                                                               | Weaker JSON and concurrency support              |
| MongoDB                   | Schema-flexible, easy scaling                                                             | Less ideal for relational logic and transactions |


### 6.2 Kotlin springboot 
| Option                              | Pros                                                                         | Cons                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------- |
| **Kotlin + Spring Boot** (✔ Chosen) | Modern syntax, null safety, excellent Spring integration, strong type system | Smaller dev pool than Java                            |
| Java + Spring Boot                  | Well-documented, mature, easy migration path                                 | More verbose syntax, no null safety                   |
| Node.js (Express/NestJS)            | Fast for prototyping, non-blocking I/O                                       | Weak typing, may struggle with enterprise scalability |

### 6.3 Angular
| Option                           | Pros                                                                                | Cons                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Angular + PrimeNG** (✔ Chosen) | Built-in form handling, routing, DI, PrimeNG component support, enterprise-friendly | Heavier learning curve, slower builds                      |
| React + MUI                      | Flexible, fast, large community                                                     | Requires more configuration for form validation, routing   |
| Vue.js + Vuetify                 | Lightweight and fast, easier to learn                                               | Smaller community and less adoption in enterprise backends |
