# Property Management System - Software Requirements Specification

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document outlines the requirements for the Property Management system, a comprehensive solution designed to streamline maintenance operations for property managers and corporate bodies. The system addresses critical challenges in contractor management, inventory control, and maintenance planning to enhance operational efficiency and financial oversight.

### 1.2 Business Need

Property forms the foundation of a healthy economy, with proper maintenance being essential to preserving and growing property investments. Current property management processes involve complex, disconnected activities such as:

- Obtaining multiple quotes
- Tracking contractor performance history
- Managing inventory
- Planning maintenance schedules

These fragmented processes lead to inefficiencies, inconsistent record-keeping, and potential financial losses. The Property Management system aims to consolidate these activities into a single, cohesive platform that provides clear insights into current property conditions and future maintenance requirements.

### 1.3 Project Scope

The Property Management system will deliver a multi-tenant web application focused on three core areas:

#### Contractor Sourcing and Management:
- Track contractor details
- Document completed work with visual evidence
- Implement performance ratings
- Integrate with maintenance plans
- Manage associated expenses

#### Inventory Management:
- Monitor the movement of inventory items
- Implement trustee approval workflows
- Track usage by specific contractors on designated projects

#### Quote Management:
- Facilitate collection, comparison, and approval of contractor quotes for maintenance projects

The system will be built using:
- Frontend: Angular with PrimeNG
- Backend: Kotlin Spring Boot
- Database: PostgreSQL
- Hosting: AWS cloud services (within the free tier)
- Authentication: AWS Cognito

The solution will adhere to security best practices and implement multi-tenancy architecture to ensure appropriate data isolation between different property entities.

## 2. User Stories

### 2.1 Trustees/Property Managers

- As a trustee, I want to approve or reject quotes for maintenance projects so that I can control expenses and ensure value for money.

- As a trustee, I want to approve inventory usage requests so that I can monitor and control resource allocation.

- As a property manager, I want to view consolidated maintenance plans so that I can ensure all required work is scheduled appropriately.

- As a property manager, I want to review contractor performance ratings so that I can make informed decisions when selecting contractors for future work.

- As a property manager, I want to view annual budget reports incorporating maintenance costs so that I can plan finances effectively.

### 2.2 Maintenance Coordinators

- As a maintenance coordinator, I want to create and manage maintenance plans so that all required property upkeep is properly scheduled.

- As a maintenance coordinator, I want to collect and compare multiple quotes for projects so that I can recommend the best value options to trustees.

- As a maintenance coordinator, I want to track the progress of ongoing maintenance projects so that I can ensure timely completion.

- As a maintenance coordinator, I want to assign contractors to specific maintenance tasks so that work is distributed effectively.

### 2.3 Contractors

- As a contractor, I want to upload images of completed work so that I can provide evidence of task completion.

- As a contractor, I want to view assigned tasks and deadlines so that I can plan my work schedule efficiently.

- As a contractor, I want to request inventory items for specific projects so that I have the necessary materials to complete assigned tasks.

### 2.4 Inventory Managers

- As an inventory manager, I want to track stock levels of maintenance items so that I can ensure adequate supplies are available.

- As an inventory manager, I want to record the distribution of inventory items to contractors so that I can maintain accurate usage records.

- As an inventory manager, I want to generate reports on inventory consumption by project so that I can analyze usage patterns and costs.

### 2.5 System Administrators

- As a system administrator, I want to manage tenant accounts so that I can ensure proper system access and data isolation.

- As a system administrator, I want to configure user roles and permissions so that I can enforce appropriate access controls.

- As a system administrator, I want to monitor system performance so that I can address any issues promptly.

## 3. Service Contracts


## 4. Domain Model

![Domain model](./301%20Domain.png)

## 5. Architectural Requirements

### 1. Quality Requirements

| **Aspect**       | **Requirement Description** |
|------------------|------------------------------|
| **Performance**  | The system must support up to **500 concurrent users**, with **backend API responses < 300ms** for common queries (e.g., inventory lookups, contractor records). |
| **Reliability**  | Target **99.5% uptime**, with robust error handling, retry logic, and monitoring. Implement **JUnit 5 and integration testing** using **Testcontainers** to ensure backend resilience. |
| **Scalability**  | Designed to scale horizontally via **Docker** containers on **AWS EC2** (Free Tier). PostgreSQL and Spring Boot are configured to scale with application usage. |
| **Security**     | Use **AWS Cognito** for authentication. Apply **Spring Security** in the Kotlin backend with secure session management, CSRF protection, and encrypted HTTPS communication. Sensitive media (e.g., proof of work images) stored securely on **AWS S3**. |
| **Maintainability** | Modular backend codebase in **Kotlin using Spring Boot**, organized using standard architectural patterns. Code is **version-controlled via GitHub**, documented with **Swagger/OpenAPI**, and CI/CD automated via **GitHub Actions**. |
| **Usability**    | Frontend built with **Angular and PrimeNG**, offering both **light and dark mode**. UI is responsive and optimized for mobile, especially for capturing images on-site. |
| **Auditability** | Maintain detailed logs for critical actions (e.g., inventory use, approvals). Include **timestamps**, **user IDs**, and **action types** for traceability and compliance. |

---

### 2. Architectural Patterns

The project uses a **Layered Architecture**, which separates concerns across the system:

- **Presentation Layer**: Angular + PrimeNG frontend, optionally served via Ionic for hybrid mobile use.
- **Application Layer**: **Kotlin Spring Boot services**, implementing core business logic and REST endpoints.
- **Persistence Layer**: PostgreSQL used for structured data. AWS S3 is used for storing media assets.
- **Integration Layer**: RESTful APIs exposed to frontend clients and external systems.
- **Security Layer**: Authentication and authorization via **AWS Cognito**, session management via Spring Security.

This pattern improves modularity, security, testability, and maintenance.

---

### 3. Design Patterns
- **Repository Pattern**: Abstracts database interactions in Spring Data Repositories for cleaner Kotlin service layers.
- **Factory Pattern**: Simplifies creation of domain entities like users or inventory items with default configurations.
- **Observer Pattern**: Used to notify subsystems (e.g., logging, notifications) of important changes like quote approval.
- **DTO Pattern (Data Transfer Object)**: Separates backend entities from REST payloads, improving API security and flexibility.
- **Singleton Pattern**: Applied to configuration services and global utilities to ensure consistent state and behavior.

---

### 4. Constraints

| **Constraint**   | **Details** |
|------------------|-------------|
| **Authentication** | Must use **AWS Cognito** for user management and login (no custom-built auth). |
| **Frontend Library** | All UI components must be built using **PrimeNG**. |
| **Cost Limitation** | Entire system must operate within the **AWS Free Tier** (EC2, RDS, S3, Cognito). |
| **Mobile Features** | Must support **mobile photo capture** (proof of contractor work) via Ionic or responsive web. |
| **No Proprietary Software** | Only **open-source or free-tier tools** may be used in development and deployment. |
| **CI/CD** | CI/CD must be handled through **GitHub Actions**, supporting automated testing and deployments. |

---

## 6. Technology Requirements

