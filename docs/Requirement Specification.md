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


## 5. Domain Model

![Domain model](./301%20Domain.png)

## 6. Architectural Requirements


## 7. Technology Requirements

