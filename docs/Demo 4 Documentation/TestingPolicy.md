# **Testing Policy**

## **1. Introduction**

This testing policy outlines the procedures, tools, and standards used to ensure the quality, reliability, and security of the Property Management System (PMS). The system consists of a **Kotlin Spring Boot backend**, an **Angular frontend**, and uses **AWS services** such as Cognito for authentication, S3 for secure file storage, and RDS PostgreSQL for data persistence.

Automated tests are run continuously through **GitHub Actions**, ensuring that all code changes meet the required standards for functionality, security, and maintainability.

The latest versions of test cases and reports can be found in the following repositories:

* **Backend Tests:** `Backend/property-management/src/test/`
* **Frontend Tests:** `Frontend/property-manager/src/app/`
* **GitHub Actions Results:** [GitHub Actions Tab](https://github.com/COS301-SE-2025/Property-Management/actions)

---

## **1.1 Performance**

**Objectives:**

* API response time ≤ 500ms for 95% of requests
* Database query performance ≤ 200ms for complex joins
* File uploads ≤ 2 seconds for files up to 10MB

**Tools Used:**

* **Apache JMeter** – for simulating heavy concurrent requests
* **AWS CloudWatch** – for tracking backend CPU, network, and memory usage

**Tests Conducted:**

1. **Simple Request Simulation:**
   Simulated 10,000 login and dashboard data fetch requests with a 300-second ramp-up.
   Results showed an average response time of **1050 ms** with zero failed requests.

   ![Basic Performance Test](../images/Demo%204/Basic_performance.png)
   ![AWS CloudWatch Metrics](../images/Demo%204/Basic_performance_cloudwatch.png)

2. **File Upload Test:**
   Simulated 1,000 concurrent uploads of 1MB images to the S3 bucket, achieving **average upload times of 500ms**.

   ![File Upload Performance](../images/Demo%204/file_performance.png)


## **1.2 Reliability**

**Objective:**
To ensure continuous uptime and data consistency even during failures.

**Key Measures:**

* 99.5% system uptime
* RPO ≤ 1 hour, RTO ≤ 4 hours
* Automatic failover and daily backups via **AWS RDS**

**Monitoring & Verification:**

* Continuous tracking of system metrics using AWS CloudWatch:

  * CPU Utilization
  * Network Packets
  * CPU Credit Balance
  * Disk I/O

![AWS CloudWatch Stats](../images/AWS%20stats.jpg)

**Result:**
System demonstrated high reliability with zero data corruption during simulated database failover tests.

---

## **1.3 Security**

**Objective:**
To protect all user and contractor data from unauthorized access, enforce proper authentication and authorization, and safeguard sensitive media.

**Technologies Used:**

* **AWS Cognito** for authentication and user management
* **Spring Security** for role-based access control and CSRF protection
* **HTTPS/TLS encryption** for secure communication
* **AWS S3** for encrypted media storage

### **Testing Approach**

* **Backend Security Tests:**
  Implemented with **JUnit** and **Spring Security**

  * Validates authentication, CSRF protection, and SQL injection defense
  * Ensures role-based authorization for all endpoints

* **Frontend Security Tests:**
  Implemented with **Jasmine/Karma**

  * Tests route guards to prevent unauthorized page access

**Test Files:**

| Type                  | File Location        | Tool          | Command          |
| --------------------- | -------------------- | ------------- | ---------------- |
| Authentication & CSRF | `SecurityTests.kt`   | JUnit         | `./gradlew test` |
| SQL Injection         | `SecurityTests.kt`   | JUnit         | `./gradlew test` |
| Authorization Guards  | `auth.guard.spec.ts` | Jasmine/Karma | `npm run test`   |

**Automation:**
All security tests are triggered automatically through **GitHub Actions** upon each push or pull request.

**Results:**
![Backend Security Tests](../images/Demo%204/Backend_Security_Tests.png)
![Frontend Guard Tests](../images/Demo%204/Frontend_Guard_Tests.png)
![GitHub Actions Summary](../images/Demo%204/Github_Actions_Tests.png)

---

## **1.4 Maintainability**

**Objective:**
To ensure that the system remains easy to update, debug, and extend.

**Tools & Practices:**

* **Ktlint** (Kotlin) and **ESLint** (Angular) to enforce coding standards
* **GitHub Actions** pipeline automatically runs linting, build, and tests
* **Code Coverage:** ≥ 85% for unit tests, ≥ 70% for integration

**CI/CD Workflow Steps:**

1. Linting check
2. Build validation
3. Unit and integration testing
4. Security verification
5. Deployment check

![CI Pipeline](../images/Demo%204/Workflow.png)

**Code Standards:**

* camelCase for variables
* PascalCase for classes
* Modular structure for easy navigation
  ![File Structure](../images/Demo%204/File%20Structure.png)

**Database Reliability:**
AWS RDS (PostgreSQL) ensures backups, patching, and version updates are fully automated.

![RDS Backups](../images/Demo%204/RDS%20Backups.png)

---

## **1.5 Usability**

**Objective:**
To ensure a consistent, accessible, and user-friendly interface.

**Testing Methods:**

* Heuristic evaluation (Nielsen’s principles)
* Accessibility testing via **Google Lighthouse**

**Key Findings:**

* Toast notifications improve feedback clarity
* Consistent color themes enhance visual flow
* Error prompts assist users in correcting mistakes
* Accessibility score: **100%**


## **1.6 Justification of Tools**

| Tool               | Purpose                             | Justification                                         |
| ------------------ | ----------------------------------- | ----------------------------------------------------- |
| **JUnit**          | Backend unit and integration tests  | Ideal for Kotlin and integrates with Spring Boot      |
| **JMeter**         | Performance & load testing          | Widely used and reliable for HTTP and REST APIs       |
| **Jasmine/Karma**  | Frontend testing                    | Standard Angular testing stack                        |
| **GitHub Actions** | CI/CD & automation                  | Simplifies testing, integrates with GitHub            |
| **AWS CloudWatch** | Monitoring and reliability tracking | Native AWS solution for real-time performance metrics |
| **Ktlint/ESLint**  | Code quality enforcement            | Prevents inconsistent formatting and errors           |

---

**Final Notes**
The Property Management System adheres to strict testing practices across all software quality dimensions. Automated testing through GitHub Actions, along with real-world performance and reliability validation using AWS and JMeter, ensures that the system remains secure, efficient, and maintainable.

---

