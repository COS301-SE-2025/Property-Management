# Testing Policy

### 1.1 Performance
- **API Response Time:** ≤ 500ms for 95% of requests under normal load
- **Database Query Performance:** ≤ 200ms for complex queries involving joins across 3+ tables
- **File Upload Performance:** ≤ 2 seconds for images up to 10MB

### 1.2 Reliability
- **System Uptime:** 99.5% availability (maximum 3.65 hours downtime per month)
- **Data Consistency:** 100% ACID compliance for financial transactions
- **Backup Recovery:** Recovery Point Objective (RPO) ≤ 1 hour, Recovery Time Objective (RTO) ≤ 4 hours
- **Failover Time:** ≤ 30 seconds for automatic failover in case of primary system failure
### 1.3 Security
- **Authentication:** Use AWS Cognito for authentication. Apply Spring Security in the Kotlin backend with secure session management, CSRF protection, and encrypted HTTPS communication. Sensitive media (e.g., proof of work images) stored securely on AWS S3.

### 1.4 Maintainability
- **Code Coverage:** ≥ 85% unit test coverage, ≥ 70% integration test coverage
- **Documentation Coverage:** 100% of public APIs documented with OpenAPI/Swagger
- **Deployment Time:** ≤ 10 minutes for zero-downtime deployments
- **Bug Fix Time:** 95% of critical bugs resolved within 24 hours

### 1.5 Usability
- **User Interface Responsiveness:** Frontend built with Angular and PrimeNG, offering both light and dark mode. UI is responsive and optimized for mobile, especially for capturing images on-site.
- **User Task Completion:** ≥ 90% task completion rate for core workflows
- **Browser Compatibility:** Support for Chrome, Firefox, Safari, Edge (latest 2 versions)



## 2. Quality requirements Testing

### 2.1 Performance

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

### 2.2 Reliability

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

### 2.3 Security

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

### 2.4 Maintainability

To ensure long-term maintainability and code quality, we have implemented a comprehensive strategy covering code standards, automated testing, and deployment practices.

#### Code Quality Enforcement

**Backend (Kotlin)**
- **Ktlint** is used to enforce Kotlin coding standards, ensuring consistent formatting and naming conventions across the codebase.
- Automatically catches syntax errors, unused variables, and stylistic issues.

**Frontend (Angular)**
- **ESLint** enforces TypeScript/JavaScript coding standards and best practices.
- Identifies potential bugs, code smells, and maintains consistent code style.

Both linting tools run automatically via **GitHub Actions** on every push to the backend, frontend, and dev branches.

#### Continuous Integration Pipeline

Our CI/CD pipeline ensures code quality and stability through automated checks:

1. **Automated Linting**: Code style and formatting validation
2. **Automated Build**: Ensures the entire application compiles successfully
3. **Automated Testing**: Runs all unit, integration, and security tests
4. **Merge Protection**: Changes can only be merged to main if all checks pass

![CI Pipeline](../images/Demo%204/Workflow.png)

This approach ensures that:
- Breaking changes are caught early in development
- Existing functionality remains intact
- Code quality standards are consistently maintained

#### Coding Standards Documentation

We maintain a comprehensive coding standards document that defines:
- **Naming Conventions**: camelCase for variables/functions, PascalCase for classes
- **File and Folder Structure**: Organized by feature modules with clear separation of concerns
![File Structure Example](../images/Demo%204/File%20Structure.png)


These standards ensure:
- Uniform code appearance across the entire codebase
- High readability for all team members
- Easy navigation and file discovery based on naming conventions

#### Database Management & Deployment

**AWS RDS with PostgreSQL** provides fully managed database infrastructure:

| Feature | Benefit |
|---------|---------|
| Automated Daily Snapshots | Point-in-time recovery capability |
| Automatic Security Patches | Reduced vulnerability exposure |
| Minor Version Updates | Latest features and bug fixes |
| High Availability | Global service with minimal downtime |
| Easy Scalability | Vertical and horizontal scaling options |

This managed approach reduces operational burden, allowing developers to focus on feature development rather than infrastructure maintenance.

![RDS Backups](../images/Demo%204/RDS%20Backups.png)

### 2.5 Usability
#### Nielsen's 10 usability heuristics
- Visibility of system status
<br>
Yes we had very externsive use of toasts that show the status of multiple operations within the system.

- Match between system and real world:
Our system has a very well developed match with the real-world as we have multiple real world user groups, namely:-

  - **Body corporate**
  - **Trustee**
  - **Contractor**
  <br>
We have a quotes,voting system for trustee's and a ten year maintenance plan that you can find in the real year.

- User control and freedom:
A contractor can change and update their profile and a trustee can change their property details

- Consistency and standards:
We kept the same theme and styling through our pages to keep good cosistency.

- Error prevention:
we have toasts that warn the user to add missing field in a form.

- Recognition rather than recall:
for the header we used a cork and profile icons as button for the settings and profile page.

- Flexibility and efficiency:
Accommodates both novice and expert users by having bold headings foor each page that discribes it's function.

- Aesthetic and minimalist design:
No irrelevant information was used throughout the system with deliberate and skillfull use of white space to emphasis the utility of the system.

- Help users recognize, diagnose, and recover from errors:
The login page tells you if you inout an incorrect email or password.

- Help and documentation:
It is very easy to find the help page because it tis the dropdown of the header.

#### Accessability
<img src="../images/Demo%204/usability.png" alt="Lighthouse accessibility test results showing all accessibility checks passed for the Property Management System web application. The interface displays a green checkmark and a score of 100, indicating excellent accessibility. The environment is a browser window with a clean and professional layout, conveying a positive and successful tone." />

Used Lighthouse to assess the accessability of the page.




