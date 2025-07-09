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


### 2.2 Contractors

- As a contractor, I want to upload images of completed work so that I can provide evidence of task completion.

- As a contractor, I want to view assigned tasks and deadlines so that I can plan my work schedule efficiently.

- As a contractor, I want to request inventory items for specific projects so that I have the necessary materials to complete assigned tasks.

## Use Cases
![alt text](../images/Demo%201/UseCase_Login.png)
![alt text](../images/Demo%201/useCase1.png)
![alt text](../images/Demo%201/useCase2.png)
![alt text](../images/Demo%201/useCase3.png)

## 3. Functional Requirements 
### FR 1. Contractor Management Subsystem

#### FR - 1.1: Contractor Profile Management
 
1.1.1 The system must allow users to create, update, and archive contractor profiles.
1.1.2 Each contractor profile must include at minimum: name, contact information, specialized services, business registration details, and onboarding date.
1.1.3 The system must support attaching necessary documentation to contractor profiles (certifications, insurance, etc.).

#### FR - 1.2: Contractor Work History Tracking

1.2.1 The system must maintain a comprehensive history of all work performed by each contractor.
1.2.2 The system must allow users to upload images and documentation as proof of completed work.
1.2.3 The system must capture metadata for work evidence including date, location (unit numbers), and project reference.

#### FR - 1.3: Contractor Performance Rating

1.3.1 The system must provide a rating mechanism for evaluating contractor performance.
1.3.2 Rating criteria must include at minimum: quality of work, timeliness, cost adherence, and professionalism.
1.3.3 The system must calculate and display average ratings over time for each contractor.
1.3.4 The system must allow filtering and sorting contractors based on performance ratings.

#### FR - 1.4: Contractor-Maintenance Plan Integration

1.4.1 The system must associate contractors with specific maintenance plans and projects.
1.4.2 The system must display contractor availability against scheduled maintenance tasks.
1.4.3 The system must track contractor commitments across multiple maintenance plans.

#### FR - 1.5: Contractor Expense Management

1.5.1 The system must record all expenses associated with contractor services.
1.5.2 The system must categorize expenses by project, maintenance type, and fiscal period.
1.5.3 The system must integrate contractor expenses into the property's annual budget.
1.5.4 The system must generate expense reports filtered by contractor, time period, or project.

### FR 2. Inventory Management Subsystem

#### FR - 2.1: Inventory Item Tracking

2.1.1 The system must maintain a database of all inventory items with details including item name, description, quantity, location, and unit cost.
2.1.2 The system must track inventory movements (additions and depletions).
2.1.3 The system must maintain historical records of inventory levels.
2.1.4 The system must alert users when inventory levels fall below predefined thresholds.

#### FR - 2.2: Trustee Approval Workflow

2.2.1 The system must implement an approval workflow for inventory item usage.
2.2.2 The system must notify designated trustees when approval for inventory usage is required.
2.2.3 The system must track the status of approval requests (pending, approved, rejected).
2.2.4 The system must record trustee approval details including approver, date, and any comments.

#### FR - 2.3: Inventory Usage Tracking

2.3.1 The system must record the specific usage of inventory items by contractors.
2.3.2 Each inventory usage record must be linked to a specific project and contractor.
2.3.3 The system must calculate inventory consumption rates over time.
2.3.4 The system must generate reports on inventory usage by project, contractor, or time period.

### FR 3. Quote Management Subsystem

#### FR - 3.1: Quote Collection

3.1.1 The system must allow users to record quotes from multiple contractors for the same project.
3.1.2 Each quote must include detailed line items, total cost, estimated timeline, and terms.
3.1.3 The system must support attaching quote documentation (PDFs, images).
3.1.4 The system must allow users to make notes and annotations on quotes.

#### FR - 3.2: Quote Comparison

3.2.1 The system must provide a side-by-side comparison view of quotes for the same project.
3.2.2 The comparison must highlight differences in cost, timeline, and scope.
3.2.3 The system must calculate and display cost variances between quotes.
3.2.4 The system must allow users to flag specific aspects of quotes for discussion or review.

#### FR - 3.3: Quote Approval Process

3.3.1 The system must implement a multi-stage approval workflow for quotes.
3.3.2 The system must notify designated trustees when quote approval is required.
3.3.3 The system must track approval status including pending, approved, and rejected.
3.3.4 The system must document all approvals with approver details, timestamp, and any conditions.
3.3.5 The system must support the requirement for three quotes before approval can be granted.

### FR 4. Maintenance Planning Subsystem

#### FR - 4.1: Maintenance Schedule Management

4.1.1 The system must allow creation and management of maintenance schedules.
4.1.2 The system must support recurring and one-time maintenance activities.
4.1.3 The system must provide calendar and list views of scheduled maintenance.
4.1.4 The system must send notifications for upcoming scheduled maintenance.

#### FR - 4.2: Maintenance History Tracking

4.2.1 The system must maintain a comprehensive history of all completed maintenance activities.
4.2.2 The system must link maintenance history to contractors, inventory usage, and expenses.
4.2.3 The system must support filtering and searching maintenance history by various criteria.
4.2.4 The system must generate maintenance history reports.

#### FR - 4.3: Maintenance Budget Integration

4.3.1 The system must integrate maintenance activities with budget planning.
4.3.2 The system must track actual maintenance costs against budgeted amounts.
4.3.3 The system must generate variance reports for maintenance budgets.
4.3.4 The system must provide forecasting tools for future maintenance budgeting.

### FR 5. Multi-tenant Administration Subsystem

#### FR - 5.1: Tenant Isolation

5.1.1 The system must maintain strict data isolation between different property management tenants.
5.1.2 The system must prevent cross-tenant data access or visualization.
5.1.3 The system must support tenant-specific configurations and customizations.

#### FR - 5.2: User Access Control

5.2.1 The system must implement role-based access control for all functions.
5.2.2 The system must support custom role definitions per tenant.
5.2.3 The system must maintain detailed access logs for security auditing.
5.2.4 The system must enforce password complexity and rotation policies.

#### FR - 5.3: AWS Cognito Integration

5.3.1 The system must utilize AWS Cognito for user authentication.
5.3.2 The system must support single sign-on where appropriate.
5.3.3 The system must implement secure authentication workflows including multi-factor authentication.

## 4. Service Contracts
## 4.1 Owner Register
**Service Contract Name:** ownerRegister
**Parameters:** { name: string, email: string, password: string, phone: string}

**Pre-conditions:**
- The user must not be a registered user.
- User information (name, email, password,phone) must be provided.

**Post-conditions:**
- A registered user is created.
- The user is navigated to the Owner Home page.

**Actors:**
- Owner

**Scenario:**
The Owner accesses the registration page, enters their details, and submits the form and navigates the Owner to the Owner home page.

## 4.2 Contractor Register
**Service Contract Name:** contractorRegister
**Parameters:** { name: string, email: string, string address, password: string, phone: string}

**Pre-conditions:**
- The user must not be a registered user.
- User information (name, email, address,password,phone) must be provided.

**Post-conditions:**
- A registered user is created.
- The user is navigated to the Comtractor Home page.

**Actors:**
- Contractor

**Scenario:**
The Contractor accesses the registration page, enters their details, and submits the form and navigates the Contractor to the Contractor home page.

## 4.3 Login
**Service Contract Name:** signin
**Parameters:** { email: string, password: string }

**Pre-conditions:**
- The user must be a registered user.
- A valid registered email address and password must be provided.

**Post-conditions:**
- The user is signed into the system and navigated to the main/landing page.

**Actors:**
- User

**Scenario:**
The user enters their email and password on the login page. The system verifies the credentials and either grants access, navigating the user to the main/landing page, or denies access and prompts them to try again.

## 4.4 View Property
**Service Contract Name:** viewProperty
**Parameters:** { }

**Pre-conditions:**
- The Owner must be a registered Owner with a verified email and already logged in.
- Owner must be on the Owner Home page and click property card.

**Post-conditions:**
- Can see inventory levels, the budget and the timeline of a property.

**Actors:**
- Owner

**Scenario:**
Owner clicks a property card and views a property.

## 4.5 Add a Property
**Service Contract Name:** addProperty
**Parameters:** { name: string, address: string, city: string, suburb: string, province: string, type: string }

**Pre-conditions:**
- The Owner must be logged in and press add property button in the home page
- Owner will then fill in form.

**Post-conditions:**
- Will create a new property on the Owner home page.

**Actors:**
- Owner

**Scenario:**
Owner logs in then clicks add property button he then fills in form and creates a new property.

## 4.6 Create a quotation
**Service Contract Name:** createQoutation
**Parameters:** {name: string, proffesion: string, address: string, number: string, email: string, amount: int }

**Pre-conditions:**
- Contractor must be logged in and then click on a project.

**Post-conditions:**
- A quote is now created

**Actors:**
- Contractor

**Scenario:**
A contractor creates a new quote by clicking on a available project.

 

<br />
<br />

## 5. Domain Model

![Domain model](../images/Demo%201/301%20Domain.png)

## 6. Architectural Requirements

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

- **Presentation Layer**: Angular + PrimeNG frontend, served via Ionic for hybrid mobile use.
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

# 7. Technology Requirements

## System Requirements
1. Node.js: v18.19.1 or newer
2. npm
3. Visual studio code is recommended
4. Angular CLI 19.2.0 or newer
5. Typescript 5.6.0 or newer
6. RxJS version 6.5.0 or newer
7. Java openjdk version 21.0.7 or newer
8. Gradle version 4.4.1 or newer
9. PostgreSQL version 17 or newer

---

### Cloning Repository
1. Open a terminal or command prompt.
2. Clone the repository using the command:
   ```bash
   git clone https://github.com/COS301-SE-2025/Property-Management.git

3. Navigate to the project directory:
   ```bash
   cd Property-Management
   ```


## Running Backend
### Database Setup (PostgreSQL)

Follow the steps below to create the `property_management` database.

```bash
# 1. Switch to the postgres system user (if not already the current user)
sudo -i -u postgres

# 2. Enter the PostgreSQL interactive terminal
psql

# 3. Set the password for the 'postgres' user
ALTER USER postgres WITH PASSWORD 'pg123';

# 4. Create the new database
CREATE DATABASE property_management;

# 5. Grant all privileges on the database to the postgres user (optional, usually not needed as postgres is a superuser)
GRANT ALL PRIVILEGES ON DATABASE property_management TO postgres;

# 6. Exit the PostgreSQL terminal
\q

# 7. Return to your original user
exit
```
To run the back end, in your terminal run

```bash
make all
```

To run our unit tests, in your terminal run

```bash
make build
```
Afterwards, locate and run in your browser the index.html file to show the tests ran by in your terminal running

```bash
cd Backend/property-management/build/reports/tests/test
```


## Running Frontend
To run the full service, make sure that the backend is running in a separate terminal.

To run the Front end, in your terminal run
```bash
cd Frontend/Property-Manager
```

## Development server
To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to http://localhost:4200/.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the dist/ directory.

## Running unit tests

To execute unit tests with the karma test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```
