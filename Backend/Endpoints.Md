Get everything in inventory :
Get http://localhost:8080/api/inventory
Example of what is returned:
[
    {
        "itemId": 1,
        "name": "Light Bulb",
        "unit": "pieces",
        "quantityInStock": 100,
        "buildingId": 1
    },
    {
        "itemId": 2,
        "name": "Pipe Segment",
        "unit": "meters",
        "quantityInStock": 50,
        "buildingId": 2
    },
    {
        "itemId": 3,
        "name": "Paint Bucket",
        "unit": "liters",
        "quantityInStock": 20,
        "buildingId": 1
    },
    {
        "itemId": 4,
        "name": "LED Lightbulb",
        "unit": "unit",
        "quantityInStock": 20,
        "buildingId": 1
    }
]

add to inventory ( also updates related tables in budget accordingly):
POST http://localhost:8080/api/inventory
Example of JSON body:
{
  "name": "LED Lightbulb",
  "building_id": 1,
  "quantity": 10,
  "price": 25.00
}

Get all buildings :
GET http://localhost:8080/api/buildings
what is returned:
[
    {
        "buildingId": 1,
        "name": "Block A",
        "address": "123 Main St"
    },
    {
        "buildingId": 2,
        "name": "Block B",
        "address": "456 Oak Ave"
    }
]

Get budget information of certain building :
GET http://localhost:8080/api/budget/1     ( the "1" is the building ID)
WHat is returned:
{
    "budgetId": 1,
    "buildingId": 1,
    "totalBudget": 1000000.00,
    "maintenanceBudget": 500000.00,
    "inventoryBudget": 500000.00,
    "inventorySpent": 50250.00,
    "maintenanceSpent": 50000.00
}

This is for the View Property page :
http://localhost:8080/api/building/1/details  ( "1" is the building ID) ( this returns usefull info on that building including budget information and maintenance tasks)
WHat is returned :
{
    "name": "Block A",
    "address": "123 Main St",
    "totalBudget": 1000000.0,
    "maintenanceBudget": 500000.0,
    "inventoryBudget": 500000.0,
    "inventorySpent": 50250.0,
    "maintenanceSpent": 50000.0,
    "maintenanceTasks": [
        {
            "title": "Roof Repair",
            "description": "Repair leaks in the main roof",
            "status": "Scheduled",
            "approved": false,
            "proofImages": [
                "https://example.com/img1.jpg"
            ]
        }
    ]
}