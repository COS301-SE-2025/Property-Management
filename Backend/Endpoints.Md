# Building Endpoints

## Create a Building
**POST** `/api/buildings`

**Request Body Example:**
```json
{
  "name": "Block A",
  "address": "123 Main St",
  "type": "Apartment",
  "propertyValue": 1000000.0,
  "primaryContractors": [1, 2],
  "latestInspectionDate": "2025-06-26",
  "area": 1200.0,
  "trusteeUuid": "e7b8c3a2-9b2e-4d8a-8f6b-123456789abc",
  "coporateUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc",
  "propertyImageId": "img_123"
}
```

**Response Example (201 Created):**
```json
{
  "name": "Block A",
  "address": "123 Main St",
  "type": "Apartment",
  "propertyValue": 1000000.0,
  "primaryContractors": [1, 2],
  "latestInspectionDate": "2025-06-26",
  "propertyImage": "img_123",
  "area": 1200.0,
  "buildingUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "trusteeUuid": "e7b8c3a2-9b2e-4d8a-8f6b-123456789abc",
  "coporateUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
}
```

---

## Get All Buildings
**GET** `/api/buildings`

**Response Example:**
```json
[
  {
    "name": "Block A",
    "address": "123 Main St",
    "type": "Apartment",
    "propertyValue": 1000000.0,
    "primaryContractors": [1, 2],
    "latestInspectionDate": "2025-06-26",
    "propertyImage": "img_123",
    "area": 1200.0,
    "buildingUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
    "trusteeUuid": "e7b8c3a2-9b2e-4d8a-8f6b-123456789abc",
    "coporateUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
  }
]
```

---

## Get Building by UUID
**GET** `/api/buildings/{uuid}`

**Response Example:**
```json
{
  "name": "Block A",
  "address": "123 Main St",
  "type": "Apartment",
  "propertyValue": 1000000.0,
  "primaryContractors": [1, 2],
  "latestInspectionDate": "2025-06-26",
  "propertyImage": "img_123",
  "area": 1200.0,
  "buildingUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "trusteeUuid": "e7b8c3a2-9b2e-4d8a-8f6b-123456789abc",
  "coporateUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
}
```

---

## Update Building
**PUT** `/api/buildings/{uuid}`

**Request Body Example:**
```json
{
  "name": "Block A - Updated",
  "address": "123 Main St",
  "type": "Apartment",
  "propertyValue": 1200000.0,
  "primaryContractors": [1, 2, 3],
  "latestInspectionDate": "2025-07-01",
  "area": 1300.0,
  "trusteeUuid": "e7b8c3a2-9b2e-4d8a-8f6b-123456789abc",
  "coporateUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc",
  "propertyImageId": "img_456"
}
```

**Response Example:**
```json
{
  "name": "Block A - Updated",
  "address": "123 Main St",
  "type": "Apartment",
  "propertyValue": 1200000.0,
  "primaryContractors": [1, 2, 3],
  "latestInspectionDate": "2025-07-01",
  "propertyImage": "img_456",
  "area": 1300.0,
  "buildingUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "trusteeUuid": "e7b8c3a2-9b2e-4d8a-8f6b-123456789abc",
  "coporateUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
}
```

---

## Delete Building
**DELETE** `/api/buildings/{uuid}`

**Response:**  
- `204 No Content` if deleted  
- `404 Not Found` if not found

---

## Get Buildings by Trustee
**GET** `/api/buildings/trustee/{trusteeUuid}`

**Response Example:**
```json
{
  "trusteeUuid": "e7b8c3a2-9b2e-4d8a-8f6b-123456789abc",
  "buildings": [
    {
      "name": "Block A",
      "address": "123 Main St",
      "type": "Apartment",
      "propertyValue": 1000000.0,
      "primaryContractors": [1, 2],
      "latestInspectionDate": "2025-06-26",
      "propertyImage": "img_123",
      "area": 1200.0,
      "buildingUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
      "trusteeUuid": "e7b8c3a2-9b2e-4d8a-8f6b-123456789abc",
      "coporateUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
    }
  ]
}
```

---

## Search Buildings by Name
**GET** `/api/buildings/search?name={name}`

**Response Example:**
```json
[
  {
    "name": "Block A",
    "address": "123 Main St",
    "type": "Apartment",
    "propertyValue": 1000000.0,
    "primaryContractors": [1, 2],
    "latestInspectionDate": "2025-06-26",
    "propertyImage": "img_123",
    "area": 1200.0,
    "buildingUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
    "trusteeUuid": "e7b8c3a2-9b2e-4d8a-8f6b-123456789abc",
    "coporateUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
  }
]
```

---

## Get Buildings by Type
**GET** `/api/buildings/type/{type}`

**Response Example:**
```json
[
  {
    "name": "Block A",
    "address": "123 Main St",
    "type": "Apartment",
    "propertyValue": 1000000.0,
    "primaryContractors": [1, 2],
    "latestInspectionDate": "2025-06-26",
    "propertyImage": "img_123",
    "area": 1200.0,
    "buildingUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
    "trusteeUuid": "e7b8c3a2-9b2e-4d8a-8f6b-123456789abc",
    "coporateUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
  }
]
```

---

# Inventory Item Endpoints

## Get All Inventory Items
**GET** `/api/inventory`

**Response Example:**
```json
[
  {
    "itemUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
    "name": "Light Bulb",
    "unit": "pieces",
    "quantityInStock": 100,
    "buildingUuidFk": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
  }
]
```

---

## Get Inventory Items by Building
**GET** `/api/inventory/building/{buildingUuid}`

- **Path Variable:**  
  - `buildingUuid` (**required**): UUID of the building

**Response Example:**
```json
[
  {
    "itemUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
    "name": "Light Bulb",
    "unit": "pieces",
    "quantityInStock": 100,
    "buildingUuidFk": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
  }
]
```

---

## Get Inventory Item by UUID
**GET** `/api/inventory/{itemUuid}`

- **Path Variable:**  
  - `itemUuid` (**required**): UUID of the inventory item

**Response Example:**
```json
{
  "itemUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "name": "Light Bulb",
  "unit": "pieces",
  "quantityInStock": 100,
  "buildingUuidFk": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
}
```

---

## Create Inventory Item
**POST** `/api/inventory`

**Request Body Fields:**
- `name` (**required**): Name of the inventory item (string)
- `unit` (**required**): Unit of measurement (string)
- `quantity` (**required**): Initial quantity (integer, zero or positive)
- `buildingUuid` (**required**): UUID of the building (string/UUID)

**Request Example:**
```json
{
  "name": "Pipe Segment",
  "unit": "meters",
  "quantity": 50,
  "buildingUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
}
```

**Response Example (201 Created):**
```json
{
  "itemUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "name": "Pipe Segment",
  "unit": "meters",
  "quantityInStock": 50,
  "buildingUuidFk": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
}
```

---

## Update Inventory Item
**PUT** `/api/inventory/{itemUuid}`

- **Path Variable:**  
  - `itemUuid` (**required**): UUID of the inventory item

**Request Body Fields:**  
_All fields are optional; only include the ones you want to update._
- `name` (string, optional)
- `unit` (string, optional)
- `quantity` (integer, optional, must be zero or positive)

**Request Example:**
```json
{
  "name": "LED Lightbulb",
  "quantity": 75
}
```

**Response Example:**
```json
{
  "itemUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "name": "LED Lightbulb",
  "unit": "pieces",
  "quantityInStock": 75,
  "buildingUuidFk": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
}
```

---

## Update Inventory Quantity (Add, Subtract, or Set)
**PATCH** `/api/inventory/{itemUuid}/quantity`

- **Path Variable:**  
  - `itemUuid` (**required**): UUID of the inventory item

**Request Body Fields:**
- `quantity` (**required**): The quantity to set/add/subtract (integer)
- `operation` (**required**): `"SET"`, `"ADD"`, or `"SUBTRACT"` (string, case-insensitive)

**Request Example (add 10):**
```json
{
  "quantity": 10,
  "operation": "ADD"
}
```

**Request Example (set to 50):**
```json
{
  "quantity": 50,
  "operation": "SET"
}
```

**Response Example:**
```json
{
  "itemUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "name": "Pipe Segment",
  "unit": "meters",
  "quantityInStock": 60,
  "buildingUuidFk": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
}
```

---

## Delete Inventory Item
**DELETE** `/api/inventory/{itemUuid}`

- **Path Variable:**  
  - `itemUuid` (**required**): UUID of the inventory item

**Response:**  
- `204 No Content` if deleted  
- `404 Not Found` if not found

---

# Inventory Usage Endpoints

## Create Inventory Usage
**POST** `/api/inventory-usage`

**Request Body Fields:**
- `itemUuid` (**required**): UUID of the inventory item
- `taskUuid` (**required**): UUID of the related task
- `usedByContractorUuid` (**required**): UUID of the contractor who used the item
- `quantityUsed` (**required**): Number of items used (integer)

**Request Example:**
```json
{
  "itemUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "taskUuid": "c2d3e4f5-a6b7-8901-cdef-23456789abcd",
  "usedByContractorUuid": "d3e4f5a6-b7c8-9012-def3-3456789abcde",
  "quantityUsed": 5
}
```

**Response Example (201 Created):**
```json
{
  "usageUuid": "e4f5a6b7-c8d9-0123-ef45-456789abcdef",
  "itemUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "taskUuid": "c2d3e4f5-a6b7-8901-cdef-23456789abcd",
  "usedByContractorUuid": "d3e4f5a6-b7c8-9012-def3-3456789abcde",
  "quantityUsed": 5,
  "trusteeApproved": false,
  "approvalDate": null
}
```

---

## Get All Inventory Usage (Paged)
**GET** `/api/inventory-usage?page=0&size=10&sortBy=usageUuid&sortDir=asc`

**Query Parameters:**
- `page` (optional, default: 0)
- `size` (optional, default: 10)
- `sortBy` (optional, default: "usageUuid")
- `sortDir` (optional, default: "asc")

**Response Example:**
```json
{
  "content": [
    {
      "usageUuid": "e4f5a6b7-c8d9-0123-ef45-456789abcdef",
      "itemUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
      "taskUuid": "c2d3e4f5-a6b7-8901-cdef-23456789abcd",
      "usedByContractorUuid": "d3e4f5a6-b7c8-9012-def3-3456789abcde",
      "quantityUsed": 5,
      "trusteeApproved": false,
      "approvalDate": null
    }
  ],
  "totalElements": 1,
  "totalPages": 1,
  "size": 10,
  "number": 0
}
```

---

## Get Inventory Usage by UUID
**GET** `/api/inventory-usage/{usageUuid}`

- **Path Variable:**  
  - `usageUuid` (**required**): UUID of the usage record

**Response Example:**
```json
{
  "usageUuid": "e4f5a6b7-c8d9-0123-ef45-456789abcdef",
  "itemUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "taskUuid": "c2d3e4f5-a6b7-8901-cdef-23456789abcd",
  "usedByContractorUuid": "d3e4f5a6-b7c8-9012-def3-3456789abcde",
  "quantityUsed": 5,
  "trusteeApproved": false,
  "approvalDate": null
}
```

---

## Update Inventory Usage
**PUT** `/api/inventory-usage/{usageUuid}`

- **Path Variable:**  
  - `usageUuid` (**required**): UUID of the usage record

**Request Body Fields:**  
_All fields are optional; only include the ones you want to update._
- `quantityUsed` (integer, optional)
- `trusteeApproved` (boolean, optional)
- `approvalDate` (date, optional, format: "YYYY-MM-DD")

**Request Example:**
```json
{
  "quantityUsed": 10,
  "trusteeApproved": true,
  "approvalDate": "2025-06-26"
}
```

**Response Example:**
```json
{
  "usageUuid": "e4f5a6b7-c8d9-0123-ef45-456789abcdef",
  "itemUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "taskUuid": "c2d3e4f5-a6b7-8901-cdef-23456789abcd",
  "usedByContractorUuid": "d3e4f5a6-b7c8-9012-def3-3456789abcde",
  "quantityUsed": 10,
  "trusteeApproved": true,
  "approvalDate": "2025-06-26"
}
```

---

## Delete Inventory Usage
**DELETE** `/api/inventory-usage/{usageUuid}`

- **Path Variable:**  
  - `usageUuid` (**required**): UUID of the usage record

**Response Example (200 OK):**
```json
{ "message": "Inventory usage deleted successfully" }
```
- `404 Not Found` if not found

---

## Approve Inventory Usage
**PATCH** `/api/inventory-usage/{usageUuid}/approval`

- **Path Variable:**  
  - `usageUuid` (**required**): UUID of the usage record

**Request Body Fields:**
- `trusteeApproved` (**required**): boolean
- `approvalDate` (optional, date, default: now)

**Request Example:**
```json
{
  "trusteeApproved": true,
  "approvalDate": "2025-06-26"
}
```

**Response Example:**
```json
{
  "usageUuid": "e4f5a6b7-c8d9-0123-ef45-456789abcdef",
  "itemUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "taskUuid": "c2d3e4f5-a6b7-8901-cdef-23456789abcd",
  "usedByContractorUuid": "d3e4f5a6-b7c8-9012-def3-3456789abcde",
  "quantityUsed": 10,
  "trusteeApproved": true,
  "approvalDate": "2025-06-26"
}
```

---

## Get Usage by Item
**GET** `/api/inventory-usage/by-item/{itemUuid}`

- **Path Variable:**  
  - `itemUuid` (**required**): UUID of the inventory item

**Response Example:**
```json
[
  {
    "usageUuid": "e4f5a6b7-c8d9-0123-ef45-456789abcdef",
    "itemUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
    "taskUuid": "c2d3e4f5-a6b7-8901-cdef-23456789abcd",
    "usedByContractorUuid": "d3e4f5a6-b7c8-9012-def3-3456789abcde",
    "quantityUsed": 5,
    "trusteeApproved": false,
    "approvalDate": null
  }
]
```

---

## Get Usage by Task
**GET** `/api/inventory-usage/by-task/{taskUuid}`

- **Path Variable:**  
  - `taskUuid` (**required**): UUID of the task

**Response Example:** _Same as above, but filtered by taskUuid_

---

## Get Usage by Contractor
**GET** `/api/inventory-usage/by-contractor/{contractorUuid}`

- **Path Variable:**  
  - `contractorUuid` (**required**): UUID of the contractor

**Response Example:** _Same as above, but filtered by contractorUuid_

---

## Get Approved Usage
**GET** `/api/inventory-usage/approved`

**Response Example:**
```json
[
  {
    "usageUuid": "e4f5a6b7-c8d9-0123-ef45-456789abcdef",
    "itemUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
    "taskUuid": "c2d3e4f5-a6b7-8901-cdef-23456789abcd",
    "usedByContractorUuid": "d3e4f5a6-b7c8-9012-def3-3456789abcde",
    "quantityUsed": 5,
    "trusteeApproved": true,
    "approvalDate": "2025-06-26"
  }
]
```

---

## Get Pending Approval Usage
**GET** `/api/inventory-usage/pending-approval`

**Response Example:** _Same as above, but only with `trusteeApproved: false`_

---

## Get Total Quantity Used for Item
**GET** `/api/inventory-usage/total-quantity/item/{itemUuid}`

- **Path Variable:**  
  - `itemUuid` (**required**): UUID of the inventory item

**Response Example:**
```json
{ "totalQuantityUsed": 25 }
```

---

## Get Total Quantity Used by Contractor
**GET** `/api/inventory-usage/total-quantity/contractor/{contractorUuid}`

- **Path Variable:**  
  - `contractorUuid` (**required**): UUID of the contractor

**Response Example:**
```json
{ "totalQuantityUsed": 12 }
```

---

# Budget Endpoints

## Create Budget
**POST** `/api/budgets`

**Request Body Fields:**
- `year` (**required**): Budget year (integer)
- `totalBudget` (**required**): Total budget (decimal)
- `maintenanceBudget` (**required**): Maintenance budget (decimal)
- `inventoryBudget` (**required**): Inventory budget (decimal)
- `approvalDate` (**required**): Approval date (string, format: "YYYY-MM-DD")
- `notes` (optional): Notes (string)
- `buildingUuid` (**required**): UUID of the building

**Request Example:**
```json
{
  "year": 2025,
  "totalBudget": 100000.00,
  "maintenanceBudget": 30000.00,
  "inventoryBudget": 20000.00,
  "approvalDate": "2025-06-26",
  "notes": "Annual budget for Block A",
  "buildingUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
}
```

**Response Example (201 Created):**
```json
{
  "budgetUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "year": 2025,
  "totalBudget": 100000.00,
  "maintenanceBudget": 30000.00,
  "inventoryBudget": 20000.00,
  "approvalDate": "2025-06-26",
  "notes": "Annual budget for Block A",
  "inventorySpent": 0.00,
  "maintenanceSpent": 0.00,
  "buildingUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
}
```

---

## Get Budget by UUID
**GET** `/api/budgets/{budgetUuid}`

- **Path Variable:**  
  - `budgetUuid` (**required**): UUID of the budget

**Response Example:**
```json
{
  "budgetUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "year": 2025,
  "totalBudget": 100000.00,
  "maintenanceBudget": 30000.00,
  "inventoryBudget": 20000.00,
  "approvalDate": "2025-06-26",
  "notes": "Annual budget for Block A",
  "inventorySpent": 0.00,
  "maintenanceSpent": 0.00,
  "buildingUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
}
```

---

## Get All Budgets
**GET** `/api/budgets`

**Response Example:**
```json
[
  {
    "budgetUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
    "year": 2025,
    "totalBudget": 100000.00,
    "maintenanceBudget": 30000.00,
    "inventoryBudget": 20000.00,
    "approvalDate": "2025-06-26",
    "notes": "Annual budget for Block A",
    "inventorySpent": 0.00,
    "maintenanceSpent": 0.00,
    "buildingUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
  }
]
```

---

## Get Budgets by Building UUID
**GET** `/api/budgets/building/{buildingUuid}`

- **Path Variable:**  
  - `buildingUuid` (**required**): UUID of the building

**Response Example:** _Same as above, but filtered by buildingUuid_

---

## Get Budgets by Year
**GET** `/api/budgets/year/{year}`

- **Path Variable:**  
  - `year` (**required**): Year (integer)

**Response Example:** _Same as above, but filtered by year_

---

## Get Budget by Building and Year
**GET** `/api/budgets/building/{buildingUuid}/year/{year}`

- **Path Variables:**  
  - `buildingUuid` (**required**): UUID of the building  
  - `year` (**required**): Year (integer)

**Response Example:**
```json
{
  "budgetUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "year": 2025,
  "totalBudget": 100000.00,
  "maintenanceBudget": 30000.00,
  "inventoryBudget": 20000.00,
  "approvalDate": "2025-06-26",
  "notes": "Annual budget for Block A",
  "inventorySpent": 0.00,
  "maintenanceSpent": 0.00,
  "buildingUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
}
```

---

## Update Budget
**PUT** `/api/budgets/{budgetUuid}`

- **Path Variable:**  
  - `budgetUuid` (**required**): UUID of the budget

**Request Body Fields:**  
_All fields are optional; only include the ones you want to update._
- `year` (integer, optional)
- `totalBudget` (decimal, optional)
- `maintenanceBudget` (decimal, optional)
- `inventoryBudget` (decimal, optional)
- `approvalDate` (string, optional, format: "YYYY-MM-DD")
- `notes` (string, optional)
- `inventorySpent` (decimal, optional)
- `maintenanceSpent` (decimal, optional)
- `buildingUuid` (UUID, optional)

**Request Example:**
```json
{
  "year": 2026,
  "totalBudget": 120000.00,
  "maintenanceBudget": 35000.00,
  "notes": "Updated budget"
}
```

**Response Example:**
```json
{
  "budgetUuid": "b1c2d3e4-f5a6-7890-bcde-123456789abc",
  "year": 2026,
  "totalBudget": 120000.00,
  "maintenanceBudget": 35000.00,
  "inventoryBudget": 20000.00,
  "approvalDate": "2025-06-26",
  "notes": "Updated budget",
  "inventorySpent": 0.00,
  "maintenanceSpent": 0.00,
  "buildingUuid": "a1b2c3d4-e5f6-7890-abcd-123456789abc"
}
```

---

## Delete Budget
**DELETE** `/api/budgets/{budgetUuid}`

- **Path Variable:**  
  - `budgetUuid` (**required**): UUID of the budget

**Response:**  
- `204 No Content` if deleted  
- `404 Not Found` if not found

---

# Body Corporate Endpoints

## Register Body Corporate
**POST** `/api/body-corporates/register`

**Request Body Fields:**
- `corporateName` (**required**): Name of the body corporate (string)
- `contributionPerSqm` (**required**): Contribution per square meter (decimal, > 0)
- `totalBudget` (optional, default: 0): Total budget (decimal, non-negative)
- `email` (**required**): Email address (string, valid email)
- `password` (**required**): Password (string, min 8 characters)
- `contactNumber` (optional): Contact number (string)

**Request Example:**
```json
{
  "corporateName": "Sunset Villas",
  "contributionPerSqm": 12.50,
  "totalBudget": 50000.00,
  "email": "admin@sunsetvillas.com",
  "password": "securePass123",
  "contactNumber": "0123456789"
}
```

**Response Example (201 Created):**
```json
{
  "corporateUuid": "c1d2e3f4-5678-90ab-cdef-123456789abc",
  "corporateName": "Sunset Villas",
  "email": "admin@sunsetvillas.com",
  "cognitoUserId": "cognito-uuid-123",
  "username": "admin_1719420000000",
  "emailVerificationRequired": true
}
```

---

## Confirm Registration
**POST** `/api/body-corporates/confirm-registration`

**Request Body Fields:**
- `username` (**required**): Username used for registration (string)
- `code` (**required**): Confirmation code sent to email (string)

**Request Example:**
```json
{
  "username": "admin_1719420000000",
  "code": "123456"
}
```

**Response Example (200 OK):**
```json
{
  "message": "Registration confirmed successfully"
}
```

---

## Login
**POST** `/api/body-corporates/login`

**Request Body Fields:**
- `email` (**required**): Email address (string)
- `password` (**required**): Password (string)

**Request Example:**
```json
{
  "email": "admin@sunsetvillas.com",
  "password": "securePass123"
}
```

**Response Example (200 OK):**
```json
{
  "idToken": "eyJraWQiOiJr...",
  "accessToken": "eyJraWQiOiJr...",
  "refreshToken": "eyJraWQiOiJr...",
  "userType": "BODY_CORPORATE",
  "userId": "cognito-uuid-123"
}
```

---

## Get All Body Corporates (Paged)
**GET** `/api/body-corporates?page=0&size=20&sortBy=corporateName&sortDirection=asc`

**Query Parameters:**
- `page` (optional, default: 0)
- `size` (optional, default: 20)
- `sortBy` (optional, default: "corporateName")
- `sortDirection` (optional, default: "asc")

**Response Example:**
```json
{
  "content": [
    {
      "corporateUuid": "c1d2e3f4-5678-90ab-cdef-123456789abc",
      "corporateName": "Sunset Villas",
      "contributionPerSqm": 12.50,
      "totalBudget": 50000.00,
      "email": "admin@sunsetvillas.com",
      "userId": "cognito-uuid-123",
      "username": "admin_1719420000000"
    }
  ],
  "totalElements": 1,
  "totalPages": 1,
  "size": 20,
  "number": 0
}
```

---

## Get Body Corporate by UUID
**GET** `/api/body-corporates/{id}`

- **Path Variable:**  
  - `id` (**required**): UUID of the body corporate

**Response Example:**
```json
{
  "corporateUuid": "c1d2e3f4-5678-90ab-cdef-123456789abc",
  "corporateName": "Sunset Villas",
  "contributionPerSqm": 12.50,
  "totalBudget": 50000.00,
  "email": "admin@sunsetvillas.com",
  "userId": "cognito-uuid-123",
  "username": "admin_1719420000000"
}
```

---

## Get Body Corporate by Email
**GET** `/api/body-corporates/email/{email}`

- **Path Variable:**  
  - `email` (**required**): Email address

**Response Example:** _Same as above_

---

## Get Body Corporate by User ID
**GET** `/api/body-corporates/user/{userId}`

- **Path Variable:**  
  - `userId` (**required**): Cognito user ID

**Response Example:** _Same as above_

---

## Update Body Corporate
**PUT** `/api/body-corporates/{id}`

- **Path Variable:**  
  - `id` (**required**): UUID of the body corporate

**Request Body Fields:**  
_All fields are optional; only include the ones you want to update._
- `corporateName` (string, optional)
- `contributionPerSqm` (decimal, optional)
- `totalBudget` (decimal, optional)
- `email` (string, optional)

**Request Example:**
```json
{
  "corporateName": "Sunset Villas Updated",
  "totalBudget": 60000.00
}
```

**Response Example:**
```json
{
  "corporateUuid": "c1d2e3f4-5678-90ab-cdef-123456789abc",
  "corporateName": "Sunset Villas Updated",
  "contributionPerSqm": 12.50,
  "totalBudget": 60000.00,
  "email": "admin@sunsetvillas.com",
  "userId": "cognito-uuid-123",
  "username": "admin_1719420000000"
}
```

---

## Delete Body Corporate
**DELETE** `/api/body-corporates/{id}`

- **Path Variable:**  
  - `id` (**required**): UUID of the body corporate

**Response Example (200 OK):**
```json
{ "message": "Body corporate deleted successfully" }
```
- `404 Not Found` if not found

---

## Search Body Corporates by Name
**GET** `/api/body-corporates/search?name={name}`

**Response Example:**
```json
[
  {
    "corporateUuid": "c1d2e3f4-5678-90ab-cdef-123456789abc",
    "corporateName": "Sunset Villas",
    "contributionPerSqm": 12.50,
    "totalBudget": 50000.00,
    "email": "admin@sunsetvillas.com",
    "userId": "cognito-uuid-123",
    "username": "admin_1719420000000"
  }
]
```

---

## Filter Body Corporates by Contribution Range
**GET** `/api/body-corporates/filter/contribution?minContribution=10&maxContribution=20`

**Query Parameters:**
- `minContribution` (**required**): Minimum contribution per sqm (decimal)
- `maxContribution` (**required**): Maximum contribution per sqm (decimal)

**Response Example:** _Same as above, but filtered by contribution range_

---

## Filter Body Corporates by Minimum Budget
**GET** `/api/body-corporates/filter/budget?minBudget=40000`

**Query Parameters:**
- `minBudget` (**required**): Minimum total budget (decimal)

**Response Example:** _Same as above, but filtered by minimum budget_

---

## Get Body Corporate Statistics
**GET** `/api/body-corporates/statistics`

**Response Example:**
```json
{
  "totalBodyCorporates": 5,
  "totalCombinedBudget": 250000.00
}
```

---

### Field Requirements Summary

| Field              | Create | Update | Type      | Notes                        |
|--------------------|--------|--------|-----------|------------------------------|
| corporateName      | req    | opt    | String    | Name of the body corporate   |
| contributionPerSqm | req    | opt    | Decimal   | Contribution per sqm (> 0)   |
| totalBudget        | opt    | opt    | Decimal   | Non-negative, default 0      |
| email              | req    | opt    | String    | Valid email                  |
| password           | req    | -      | String    | Min 8 characters             |
| contactNumber      | opt    | -      | String    | Optional                     |

- **req** = required, **opt** = optional, **-** = not used

---

# Contractor Endpoints

## Create a Contractor
**POST** `/api/contractor`

**Request Body Example:**
```json
{
  "name": "Karabelo",
  "contact_info": "Test",
  "status": false,
  "apikey": "0210323-2313-123",
  "email": "karabelotaole04@gmail.com",
  "phone": "013456789",
  "address": "Tes street",
  "city": "Pretoria",
  "postal_code": "0419",
  "reg_number": "23123123131",
  "description": "Good pipe layer",
  "services": "Pipe laying"
}
```

**Response Example (201 Created):**
```json
{
  "uuid": "d368aef5-0f2d-46a4-b32e-1e2b79cc7e28",
  "name": "Karabelo",
  "contact_info": "Test",
  "status": false,
  "apikey": "0210323-2313-123",
  "email": "karabelotaole04@gmail.com",
  "phone": "013456789",
  "address": "Tes street",
  "city": "Pretoria",
  "postal_code": "0419",
  "reg_number": "23123123131",
  "description": "Good pipe layer",
  "services": "Pipe laying"
}
```

---

## Get All Contractors
**GET** `/api/contractor`

**Response Example:**
```json
[
  {
    "uuid": "d368aef5-0f2d-46a4-b32e-1e2b79cc7e28",
    "name": "Karabelo",
    "contact_info": "Test",
    "status": false,
    "apikey": "0210323-2313-123",
    "email": "karabelotaole04@gmail.com",
    "phone": "013456789",
    "address": "Tes street",
    "city": "Pretoria",
    "postal_code": "0419",
    "reg_number": "23123123131",
    "description": "Good pipe layer",
    "services": "Pipe laying"
  }
]
```

---

## Get Contractor by UUID
**GET** `/api/contractor/{uuid}`

- **Path Variable:**  
  - `uuid` (**required**): UUID of the contractor

**Response Example:**
```json
{
  "uuid": "d368aef5-0f2d-46a4-b32e-1e2b79cc7e28",
  "name": "Karabelo",
  "contact_info": "Test",
  "status": false,
  "apikey": "0210323-2313-123",
  "email": "karabelotaole04@gmail.com",
  "phone": "013456789",
  "address": "Tes street",
  "city": "Pretoria",
  "postal_code": "0419",
  "reg_number": "23123123131",
  "description": "Good pipe layer",
  "services": "Pipe laying"
}
```

---

## Update Contractor
**PUT** `/api/contractor`

**Request Body Example:**
```json
{
  "contact_info": "Test Contact – Available via phone and email",
  "status": true,
  "apikey": "0210323-2313-123",
  "email": "karabelo.moeketsi@example.com",
  "phone": "01232313 - New Updated"
}
```

**Response Example:**
```json
{
  "uuid": "d368aef5-0f2d-46a4-b32e-1e2b79cc7e28",
  "name": "Karabelo",
  "contact_info": "Test Contact – Available via phone and email",
  "status": true,
  "apikey": "0210323-2313-123",
  "email": "karabelo.moeketsi@example.com",
  "phone": "01232313 - New Updated",
  "address": "Tes street",
  "city": "Pretoria",
  "postal_code": "0419",
  "reg_number": "23123123131",
  "description": "Good pipe layer",
  "services": "Pipe laying"
}
```

---

## Delete Contractor
**DELETE** `/api/contractor/{uuid}`

- **Path Variable:**  
  - `uuid` (**required**): UUID of the contractor

**Response:**  
- `204 No Content` if deleted  
- `404 Not Found` if not found


# Image Upload Endpoints

## Upload Image
**POST** `/api/images/upload`

**Content-Type:** `multipart/form-data`

**Description:** Uploads a single image file to S3 and returns a unique image key (usually a UUID).

**Request Example:**
```
Content-Type: multipart/form-data
[File upload field with image data]
```

**Response Example (201 Created):**
```json
{
  "imageKey": "a3f07d2b-2a31-4c9e-bf9e-6f2eaa2c1234"
}
```

**Usage Notes:**
- The returned `imageKey` can be used in other endpoints where image references are needed
- Supported image formats: JPEG, PNG, GIF, WebP
- Maximum file size: 10MB

---

## Get Image URL
**GET** `/api/images/presigned/{uuid}`

- **Path Variable:**  
  - `uuid` (**required**): UUID of the image (imageKey from upload)

**Description:** Returns a presigned URL that can be used to view the image directly.

**Response Example:**
```json
{
  "url": "https://s3.amazonaws.com/bucket-name/images/a3f07d2b-2a31-4c9e-bf9e-6f2eaa2c1234?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=..."
}
```

**Usage Notes:**
- The returned URL is temporary and will expire after a set time period
- Use this URL to display images in your application
- The URL can be used directly in `<img>` tags or API responses

---

### Quote Field Requirements Summary

| Field         | Create | Update | Type      | Notes                           |
|---------------|--------|--------|-----------|--------------------------------|
| task_id       | req*   | opt    | String    | Required for Maintenance quotes |
| contractor_id | req*   | opt    | String    | Required for Maintenance quotes |
| amount        | req    | opt    | Decimal   | Quote amount                   |
| submitted_on  | req    | opt    | Timestamp | ISO 8601 format               |
| type          | req    | opt    | String    | "Maintenance" or "Inventory"   |

- **req** = required, **opt** = optional, **req*** = required for Maintenance quotes only

### Contractor Field Requirements Summary

| Field        | Create | Update | Type    | Notes                    |
|--------------|--------|--------|---------|--------------------------|
| name         | req    | opt    | String  | Contractor name          |
| contact_info | req    | opt    | String  | Contact information      |
| status       | req    | opt    | Boolean | Active/inactive status   |
| apikey       | req    | opt    | String  | API key for contractor   |
| email        | req    | opt    | String  | Email address            |
| phone        | req    | opt    | String  | Phone number             |
| address      | req    | opt    | String  | Physical address         |
| city         | req    | opt    | String  | City                     |
| postal_code  | req    | opt    | String  | Postal code              |
| reg_number   | req    | opt    | String  | Registration number      |
| description  | req    | opt    | String  | Contractor description   |
| services     | req    | opt    | String  | Services offered         |

- **req** = required, **opt** = optional

# Maintenance Task Endpoints

## Create Maintenance Task
**POST** `/api/maintenance`

**Request Body Fields:**
- `title` (**required**): Title of the maintenance task (string)
- `des` (**required**): Description of the maintenance task (string)
- `status` (**required**): Current status of the task (string)
- `scheduled_date` (**required**): Scheduled date for the task (string, format: "YYYY-MM-DD")
- `approved` (**required**): Approval status (boolean)
- `b_uuid` (**required**): UUID of the building (string/UUID)
- `img` (**required**): UUID of the image from images table (string/UUID)
- `t_uuid` (**required**): UUID of the trustee who created the task (string/UUID)

**Request Body Example:**
```json
{
  "title": "Yes b yes",
  "des": "djewoijdwoei",
  "status": "cascsac",
  "scheduled_date": "2025-06-18",
  "approved": false,
  "b_uuid": "67b2a69a-7823-474f-ad68-64aee3c94cc4",
  "img": "80666f00-37a0-4749-9631-dc6befda031c",
  "t_uuid": "c375bc26-d60f-403a-a62c-7c888296da6d"
}
```

**Response Example (201 Created):**
```json
{
  "uuid": "d91657fd-98e6-41d1-8afa-7773a53ed915",
  "title": "Yes b yes",
  "des": "djewoijdwoei",
  "status": "cascsac",
  "scheduled_date": "2025-06-18",
  "approved": false,
  "b_uuid": "67b2a69a-7823-474f-ad68-64aee3c94cc4",
  "img": "80666f00-37a0-4749-9631-dc6befda031c",
  "t_uuid": "c375bc26-d60f-403a-a62c-7c888296da6d"
}
```

---

## Get All Maintenance Tasks
**GET** `/api/maintenance`

**Description:** Returns all maintenance tasks in the system.

**Response Example:**
```json
[
  {
    "uuid": "d91657fd-98e6-41d1-8afa-7773a53ed915",
    "title": "Yes b yes",
    "des": "djewoijdwoei",
    "status": "cascsac",
    "scheduled_date": "2025-06-18",
    "approved": false,
    "b_uuid": "67b2a69a-7823-474f-ad68-64aee3c94cc4",
    "img": "80666f00-37a0-4749-9631-dc6befda031c",
    "t_uuid": "c375bc26-d60f-403a-a62c-7c888296da6d"
  }
]
```

---

## Get Maintenance Task by UUID
**GET** `/api/maintenance/{uuid}`

- **Path Variable:**  
  - `uuid` (**required**): UUID of the maintenance task

**Description:** Returns a specific maintenance task by its UUID.

**Response Example:**
```json
{
  "uuid": "d91657fd-98e6-41d1-8afa-7773a53ed915",
  "title": "Yes b yes",
  "des": "djewoijdwoei",
  "status": "cascsac",
  "scheduled_date": "2025-06-18",
  "approved": false,
  "b_uuid": "67b2a69a-7823-474f-ad68-64aee3c94cc4",
  "img": "80666f00-37a0-4749-9631-dc6befda031c",
  "t_uuid": "c375bc26-d60f-403a-a62c-7c888296da6d"
}
```

---

## Update Maintenance Task
**PUT** `/api/maintenance/{uuid}`

- **Path Variable:**  
  - `uuid` (**required**): UUID of the maintenance task

**Request Body Fields:**  
_All fields are optional; only include the ones you want to update._
- `title` (string, optional)
- `des` (string, optional)
- `status` (string, optional)
- `scheduled_date` (string, optional, format: "YYYY-MM-DD")
- `approved` (boolean, optional)
- `b_uuid` (string/UUID, optional)
- `img` (string/UUID, optional)
- `t_uuid` (string/UUID, optional)

**Request Example:**
```json
{
  "title": "Updated Task Title",
  "status": "In Progress",
  "approved": true
}
```

**Response Example:**
```json
{
  "uuid": "d91657fd-98e6-41d1-8afa-7773a53ed915",
  "title": "Updated Task Title",
  "des": "djewoijdwoei",
  "status": "In Progress",
  "scheduled_date": "2025-06-18",
  "approved": true,
  "b_uuid": "67b2a69a-7823-474f-ad68-64aee3c94cc4",
  "img": "80666f00-37a0-4749-9631-dc6befda031c",
  "t_uuid": "c375bc26-d60f-403a-a62c-7c888296da6d"
}
```

---

## Delete Maintenance Task
**DELETE** `/api/maintenance/{uuid}`

- **Path Variable:**  
  - `uuid` (**required**): UUID of the maintenance task

**Description:** Deletes a specific maintenance task.

**Response:**  
- `204 No Content` if deleted  
- `404 Not Found` if not found

---

### Maintenance Task Field Requirements Summary

| Field          | Create | Update | Type        | Notes                                    |
|----------------|--------|--------|-------------|------------------------------------------|
| title          | req    | opt    | String      | Title of the maintenance task            |
| des            | req    | opt    | String      | Description of the maintenance task      |
| status         | req    | opt    | String      | Current status of the task               |
| scheduled_date | req    | opt    | String      | Scheduled date (format: "YYYY-MM-DD")    |
| approved       | req    | opt    | Boolean     | Approval status                          |
| b_uuid         | req    | opt    | String/UUID | Building UUID (required)                 |
| img            | req    | opt    | String/UUID | Image UUID from images table (required) |
| t_uuid         | req    | opt    | String/UUID | Trustee UUID who created task (required)|

- **req** = required, **opt** = optional

**Required Field Notes:**
- `b_uuid`: Must reference an existing building UUID
- `img`: Must reference an existing image UUID from the images table
- `t_uuid`: Must reference an existing trustee UUID who created the maintenance task

# Quote Endpoints

## Create a Quote
**POST** `/api/quote`

**Request Body Fields:**
- `t_uuid` (**required**): UUID of the maintenance task (string/UUID)
- `c_uuid` (**required**): UUID of the contractor (string/UUID)
- `submitted_on` (**required**): Submission timestamp (string, ISO 8601 format)
- `status` (**required**): Current status of the quote (string)
- `amount` (**required**): Quote amount (decimal)
- `doc` (**required**): Document/notes related to the quote (string)

**Request Body Example:**
```json
{
  "t_uuid": "d91657fd-98e6-41d1-8afa-7773a53ed915",
  "c_uuid": "d368aef5-0f2d-46a4-b32e-1e2b79cc7e28",
  "submitted_on": "2025-06-26T10:00:00.000+02:00",
  "status": "Started",
  "amount": 1000,
  "doc": "jhihiduhidhwqidhqwudh"
}
```

**Response Example (201 Created):**
```json
{
  "uuid": "b9c9cead-4f9e-4f57-99ad-8374e444c4a9",
  "t_uuid": "d91657fd-98e6-41d1-8afa-7773a53ed915",
  "c_uuid": "d368aef5-0f2d-46a4-b32e-1e2b79cc7e28",
  "submitted_on": "2025-06-26T08:00:00.000+00:00",
  "status": "Started",
  "amount": 1000.00,
  "doc": "jhihiduhidhwqidhqwudh"
}
```

---

## Get All Quotes
**GET** `/api/quote`

**Description:** Returns all quotes in the system.

**Response Example:**
```json
[
  {
    "uuid": "b9c9cead-4f9e-4f57-99ad-8374e444c4a9",
    "amount": 1000.00,
    "doc": "jhihiduhidhwqidhqwudh",
    "submitted_on": "2025-06-26T08:00:00.000+00:00",
    "status": "Started",
    "t_uuid": "d91657fd-98e6-41d1-8afa-7773a53ed915",
    "c_uuid": "d368aef5-0f2d-46a4-b32e-1e2b79cc7e28"
  }
]
```

---

## Get Quote by UUID
**GET** `/api/quote/{uuid}`

- **Path Variable:**  
  - `uuid` (**required**): UUID of the quote

**Description:** Returns a specific quote by its UUID.

**Response Example:**
```json
{
  "uuid": "b9c9cead-4f9e-4f57-99ad-8374e444c4a9",
  "amount": 1000.00,
  "doc": "jhihiduhidhwqidhqwudh",
  "submitted_on": "2025-06-26T08:00:00.000+00:00",
  "status": "Started",
  "t_uuid": "d91657fd-98e6-41d1-8afa-7773a53ed915",
  "c_uuid": "d368aef5-0f2d-46a4-b32e-1e2b79cc7e28"
}
```

---

## Delete Quote
**DELETE** `/api/quote/{uuid}`

- **Path Variable:**  
  - `uuid` (**required**): UUID of the quote

**Description:** Deletes a specific quote.

**Response:**  
- `204 No Content` if deleted  
- `404 Not Found` if not found

---

### Quote Field Requirements Summary

| Field        | Create | Type           | Notes                                    |
|--------------|--------|----------------|------------------------------------------|
| t_uuid       | req    | String/UUID    | Maintenance task UUID (required)         |
| c_uuid       | req    | String/UUID    | Contractor UUID (required)               |
| submitted_on | req    | String         | ISO 8601 timestamp format               |
| status       | req    | String         | Current status of the quote              |
| amount       | req    | Decimal        | Quote amount                             |
| doc          | req    | String         | Document/notes related to the quote      |

- **req** = required

**Required Field Notes:**
- `t_uuid`: Must reference an existing maintenance task UUID
- `c_uuid`: Must reference an existing contractor UUID
- `submitted_on`: Must be in ISO 8601 format (e.g., "2025-06-26T10:00:00.000+02:00")

