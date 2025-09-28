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

## 4. Architectural Design Strategy

The team has adopted the Decomposition design strategy to implement the 
Property Management System. 
This approach involves breaking down the system into smaller , manageable subsystems. Each subsystem can be developed, tested, and maintained independently, while still integrating seamlessly into the overall solution. 
Reasons for using Decomposition 
- **Improved understanding of system:**  Understanding each smaller part makes it easier for each member to understand the system as a whole. 
- **Increased maintainability:** Changes are localised to specific parts, reducing the risk of changes affecting unrelated parts. 
- **Faster development:** Each member can be delegated or assigned a part which makes it quicker to develop since each person doesn’t need to rely on a component being done first. 
- **Better scalability:** Each individual part can be scaled independently based on its needs

### 5. Quality requirements Testing

### 5.1 Performance

Using Jmeter, we run two test suites:

#### 1. Simple example requests
This request simulates the simple data a user would request when first logging into the platform, this makes 10000 requests withs a ramp up time of 300 seconds. This involves fetching data from a single endpoints. The results are shown in the screenshot below:

![alt text](../images/Demo%204/Basic_performance.png)

As shown we have a average response time of 1050 ms and no errors occured with any of the requests

![alt text](../images/Demo%204/Basic_performance_cloudwatch.png)

Here is also a screenshot from our cloudwatch showing the CPU utilization and the network statistics

#### 2. Uploading files
This requests simulates file uploads to our s3 bucket to test file upload performance. We tested 1000 concurrent file uploads with a ramp up time of 30 seconds. The results are shown in the screenshot below:

![alt text](../images/Demo%204/file_performance.png)

As shown, it takes an average of 500ms for a file of size 1mb to be uploaded and receive the presigned url back.

### 5.2 Reliability

To ensure the robustness and stability of our system under various conditions, we conducted a series of reliability tests and implemented key infrastructure safeguards.

#### Infrastructure & Monitoring
- Our system is hosted and managed on **Amazon Web Services (AWS)**, leveraging its scalability and reliability.
- Real-time monitoring is enabled via AWS CloudWatch, tracking key performance metrics such as:
  - **CPU Utilization**
  - **Network Packets**
  - **Network In (bytes)**
  - **CPU Credit Usage**
  - **Network Packets In (count)**
  - **CPU Credit Balance (count)**

![System Monitoring Screenshot](../images/AWS%20stats.jpg)

### 5.3 Security

#### Security Testing Strategy

Our security testing approach ensures that all critical backend and frontend security mechanisms are validated automatically as part of our CI/CD pipeline.

**Backend Security Tests**

- **Authentication, Authorization, CSRF, and SQL Injection** are tested using JUnit and Spring Security in the backend.
- All security tests are implemented in `Backend/property-management/src/test/kotlin/com/propertymanagement/security/SecurityTests.kt`.
- These tests verify:
  - Protected endpoints require authentication.
  - CSRF protection blocks unauthorized POST/DELETE requests.
  - SQL injection attempts are rejected.
  - Contractor and building endpoints enforce access control.

**Frontend Security Tests**

- **Route Guards** are tested using Jasmine/Karma in the frontend.
- Guard tests are implemented in `Frontend/property-manager/src/app/guards/auth.guard.spec.ts`.
- These tests ensure that unauthenticated users cannot access protected routes.

#### Security Test Automation

- All tests are run automatically via **GitHub Actions** on every push and pull request.
- Test results are available in the Actions tab of our GitHub repository.

#### Security Test Implementation

| Security Aspect      | Tool/Method        | Test File/Location                                                      | How to Run/Test                        |
|----------------------|--------------------|-------------------------------------------------------------------------|----------------------------------------|
| Authentication       | JUnit, Spring Sec. | SecurityTests.kt | `./gradlew test`                       |
| Authorization Guard  | Jasmine/Karma      | auth.guard.spec.ts            | `npm run test`                         |
| CSRF Protection      | JUnit, Spring Sec. | SecurityTests.kt                                                           | `./gradlew test`                       |
| SQL Injection        | JUnit, Spring Sec. | SecurityTests.kt                                                           | `./gradlew test`                       |

**Key Files Added for Security Testing:**
- SecurityTests.kt
- TestSecurityConfig.kt
- TestIntegrationSecurityConfig.kt
- auth.guard.spec.ts

#### How to Run Security Tests

- **Backend:**  
  Run all backend security tests with:
  ```
  ./gradlew test --tests "*SecurityTests"
  ```
- **Frontend:**  
  Run all frontend guard tests with:
  ```
  npm run test
  ```

#### Test Results

- **Backend Security Tests:**  
    <div style="display: flex; gap: 30px;">
        <img src="../images/Demo%204/Backend_Security_Tests_1.png" alt="Backend Security Test Results 1" width="600"/>
        <img src="../images/Demo%204/Backend_Security_Tests.png" alt="Backend Security Test Results 2" width="600"/>
    </div>

- **Frontend Guard Tests:**  
    <div style="display: flex; gap: 30px;">
        <img src="../images/Demo%204/Frontend_Guard_Tests_1.png" alt="Frontend Guard Test Results" width="450"/>
        <img src="../images/Demo%204/Frontend_Guard_Tests.png" alt="Frontend Guard Test Results" width="450"/>
    </div>
- **GitHub Actions Summary:**  
    <div style="display: flex; gap: 30px;">
        <img src="../images/Demo%204/Github_Actions_Tests.png" alt="GitHub Actions Test Summary" width="900"/>
    </div>

#### Policy Reference

> We use GitHub Actions to run all backend and frontend tests on every push and pull request. Security tests are implemented in SecurityTests.kt for the backend and in guard spec files for the frontend. Test results are available in the Actions tab of our GitHub repository.

### 5.4 Maintainability 

### 5.5 Usability



## 6. Architectural Constraints
#### 6.1 Constraint Satisfaction Matrix

| Constraint | Architecture Component | Satisfaction Method |
|------------|----------------------|---------------------|
| Multi-tenancy | Schema-per-tenant PostgreSQL + Tenant-aware services | Complete data isolation |
| AWS Free Tier | RDS PostgreSQL + EC2 + S3 + Cognito | Careful resource management |
| PrimeNG Requirement | Angular frontend with PrimeNG components | Direct integration |
| Security Best Practices | Spring Security + AWS Cognito + RBAC | Multi-layer security |
| Mobile Support | Responsive Angular UI + PWA capabilities | Cross-platform compatibility |
## 7. Technology Choices

### 7.1 Postgres

| Option                    | Pros                                                                                      | Cons                                             |
| ------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **PostgreSQL** (✔ Chosen) | ACID-compliant, open-source, strong support for complex queries and JSON, AWS RDS support | Slightly heavier than NoSQL                      |
| MySQL                     | Popular, fast, good tooling                                                               | Weaker JSON and concurrency support              |
| MongoDB                   | Schema-flexible, easy scaling                                                             | Less ideal for relational logic and transactions |


### 7.2 Kotlin springboot 
| Option                              | Pros                                                                         | Cons                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------- |
| **Kotlin + Spring Boot** (✔ Chosen) | Modern syntax, null safety, excellent Spring integration, strong type system | Smaller dev pool than Java                            |
| Java + Spring Boot                  | Well-documented, mature, easy migration path                                 | More verbose syntax, no null safety                   |
| Node.js (Express/NestJS)            | Fast for prototyping, non-blocking I/O                                       | Weak typing, may struggle with enterprise scalability |

### 7.3 Angular
| Option                           | Pros                                                                                | Cons                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Angular + PrimeNG** (✔ Chosen) | Built-in form handling, routing, DI, PrimeNG component support, enterprise-friendly | Heavier learning curve, slower builds                      |
| React + MUI                      | Flexible, fast, large community                                                     | Requires more configuration for form validation, routing   |
| Vue.js + Vuetify                 | Lightweight and fast, easier to learn                                               | Smaller community and less adoption in enterprise backends |
