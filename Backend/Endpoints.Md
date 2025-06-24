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

# Trustee Endpoints:
## To add:
Method: POST 
Link: http://localhost:8080/api/trustee
Body: {
    "name" : "[name]",
    "email" : "[email]",
    "phone" : "[phone]",
    "apikey" : "[apikey]"
}

## To get all in table
Method: GET
Link: http://localhost:8080/api/trustee
return[
    {
        "trustee_id": 3,
        "name": "Karabelo",
        "email": "ktaole04.w@gmail.com",
        "phone": "0123456789",
        "apikey": "d65qw4d65aw4d6w4ad"
    },
    {
        "trustee_id": 4,
        "name": "Sean",
        "email": "seanM03@gmail.com",
        "phone": "0987456321",
        "apikey": "65f465f13w84fe238"
    }
]

## To get a specific id
Method: GET
Link: http://localhost:8080/api/trustee/{id} (where {id} is the id of the trustee)
Return:{
    "trustee_id": 4,
    "name": "Sean",
    "email": "seanM03@gmail.com",
    "phone": "0987456321",
    "apikey": "65f465f13w84fe238"
}

## To update 
Method: PUT
Link: http://localhost:8080/api/trustee
Body: 
    Body: {
        "trustee_id" : "[id]",
        "[Item to change, like name, phone ect]" : "[new item]"
}

## To delete
Method: DELETE
Link: http://localhost:8080/api/trustee
Body: 
    Body: {
        "trustee_id" : "[id]"
}

# Contractor Endpoints:
## To add:
Method: POST 
Link: http://localhost:8080/api/contractor
Body: {
    "name" : "[name]",
    "email" : "[email]",
    "phone" : "[phone]",
    "apikey" : "[apikey]",
    "banned" : [ban status, boolean]
}

## To get all in table
Method: GET
Link: http://localhost:8080/api/contractor
Return:[
    {
        "contractorId": 3,
        "name": "Jack",
        "email": "jackfitnesss@gmail.com",
        "phone": "0123456789",
        "apikey": "d6q5d46qw54dq",
        "banned": false
    }
]

## To get a specific id
Method: GET
Link: http://localhost:8080/api/contractor/{id} (where {id} is the id of the contractor)
Return:{
        "contractorId": 3,
        "name": "Jack",
        "email": "jackfitnesss@gmail.com",
        "phone": "0123456789",
        "apikey": "d6q5d46qw54dq",
        "banned": false
    }

## To update 
Method: PUT
Link: http://localhost:8080/api/contractor
Body:{
    "contractor_id" : "[id]",
    "[Item to change, like name, phone ect]" : "[new item]"
}

## To delete
Method: DELETE
Link: http://localhost:8080/api/contractor/{id} (where {id} is the id of the contractor)


# Quote Endpoints
## To add:
Method: POST 
Link: http://localhost:8080/api/qoute
Body: {
    "task_id" : "[task_id]",
    "contractor_id" : "[contractor_id]",
    "amount" : "[amount]",
    "submitted_on" : "[submitted_on]",
    "type" : "type"
}
Prerequisites:
1. There must be an existing task_id
2. There must be an existing contractor_id

Explanations:
1. "type" Identifies the type of quote, either Maintenance or Inventory quote
2. If a Inventory quote then there is no need for the task_id and contractor_id and those fields will be null in the table
3. "submitted_on" is a data type "timestamp with timezone" and an example is this: 2025-05-25T11:12:47.858+00:00 


## To get all in table
Method: GET
Link: http://localhost:8080/api/quote
Return:[
    {
        "quote_id": 4,
        "task_id": 101,
        "contractor_id": 3,
        "amount": 100.00,
        "submitted_on": "2025-05-25T11:12:47.858+00:00",
        "type": "Maintenance"
    }
]

## To get a specific id
Method: GET
Link: http://localhost:8080/api/quote/{id} (where {id} is the id of the quote)
Return:{
    "quote_id": 4,
    "task_id": 101,
    "contractor_id": 3,
    "amount": 100.00,
    "submitted_on": "2025-05-25T11:12:47.858+00:00",
    "type": "Inventory"
}

## To update 
Method: PUT
Link: http://localhost:8080/api/quote/{id} (where {id} is the id of the quote)
Body: {
    "[Item to change]" : "[new item]"
}

## To delete
Method: DELETE
Link: http://localhost:8080/api/quote/{id} (where {id} is the id of the quote)
