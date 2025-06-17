// package com.example.propertymanagement.controller

// import com.example.propertymanagement.dto.InventoryItemRequest
// import com.example.propertymanagement.dto.InventoryUsageRequest
// import com.example.propertymanagement.model.InventoryItem
// import com.example.propertymanagement.service.InventoryService
// import com.fasterxml.jackson.databind.ObjectMapper
// import org.junit.jupiter.api.Test
// import org.mockito.Mockito.doNothing
// import org.mockito.kotlin.given
// import org.springframework.beans.factory.annotation.Autowired
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
// import org.springframework.boot.test.mock.mockito.MockBean
// import org.springframework.http.MediaType
// import org.springframework.test.web.servlet.MockMvc
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
// import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
// import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
// import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
// import java.util.NoSuchElementException
// import java.util.UUID
// import java.util.UUID.randomUUID
// import org.junit.jupiter.api.extension.ExtendWith
// import org.springframework.test.context.junit.jupiter.SpringExtension

// @ExtendWith(SpringExtension::class)
// @WebMvcTest(InventoryController::class)
// class InventoryControllerTest {
//     @Autowired
//     lateinit var mockMvc: MockMvc

//     @MockBean
//     lateinit var inventoryService: InventoryService

//     @Autowired
//     lateinit var objectMapper: ObjectMapper

//     val uuid1 = UUID.randomUUID()
//     val uuid2 = UUID.randomUUID()


//     @Test
//     fun `should return all inventory items`() {
//         val items =
//             listOf(
//                 InventoryItem(
//                     itemUuid = uuid1,
//                     name = "Item1",
//                     unit = "pcs",
//                     quantityInStock = 100,
//                     buildingUuid = UUID.randomUUID()
//                 ),
//                 InventoryItem(
//                     itemUuid = uuid2,
//                     name = "Item2",
//                     unit = "kg",
//                     quantityInStock = 50,
//                     buildingUuid = UUID.randomUUID()
//                 ),
//             )
//         given(inventoryService.getAll()).willReturn(items)

//         mockMvc.perform(get("/api/inventory"))
//             .andExpect(status().isOk)
//             .andExpect(jsonPath("$.length()").value(2))
//             .andExpect(jsonPath("$[0].itemUuid").value(uuid1.toString()))
//             .andExpect(jsonPath("$[1].itemUuid").value(uuid2.toString()))
//     }

//     @Test
//     fun `should return inventory item by UUID`() {
//         val item = InventoryItem(
//             itemUuid = uuid1,
//             name = "Item1",
//             unit = "pcs",
//             quantityInStock = 100,
//             buildingUuid = UUID.randomUUID()
//         )
//         given(inventoryService.getByUuid(uuid1)).willReturn(item)

//         mockMvc.perform(get("/api/inventory/$uuid1"))
//             .andExpect(status().isOk)
//             .andExpect(jsonPath("$.itemUuid").value(uuid1.toString()))
//             .andExpect(jsonPath("$.name").value("Item1"))
//     }

//     @Test
//     fun `should return 404 for non-existent inventory item`() {
//         given(inventoryService.getByUuid(uuid1)).willThrow(NoSuchElementException("Item not found: $uuid1"))

//         mockMvc.perform(get("/api/inventory/$uuid1"))
//             .andExpect(status().isNotFound)
//             .andExpect(jsonPath("$.error").value("Item not found: $uuid1"))
//     }

//     @Test
//     fun `should update inventory item`() {
//         val updatedItem = InventoryItem(
//             itemUuid = uuid1,
//             name = "Updated Item",
//             unit = "pcs",
//             quantityInStock = 150,
//             buildingUuid = UUID.randomUUID()
//         )
//         given(inventoryService.update(uuid1, updatedItem)).willReturn(updatedItem)

//         mockMvc.perform(
//             put("/api/inventory/$uuid1")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(updatedItem))
//         ).andExpect(status().isOk)
//             .andExpect(jsonPath("$.itemUuid").value(uuid1.toString()))
//             .andExpect(jsonPath("$.name").value("Updated Item"))
//             .andExpect(jsonPath("$.quantityInStock").value(150))
//     }

//     @Test
//     fun `should return 404 when updating non-existent inventory item`() {
//         val updatedItem = InventoryItem(
//             itemUuid = uuid1,
//             name = "Non-existent Item",
//             unit = "pcs",
//             quantityInStock = 0,
//             buildingUuid = UUID.randomUUID()
//         )
//         given(inventoryService.update(uuid1, updatedItem))
//             .willThrow(NoSuchElementException("Item not found: $uuid1"))

//         mockMvc.perform(
//             put("/api/inventory/$uuid1")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(updatedItem))
//         ).andExpect(status().isNotFound)
//             .andExpect(jsonPath("$.error").value("Item not found: $uuid1"))
//     }

//     @Test
//     fun `should return 400 when updating inventory item with negative quantity`() {
//         val invalidItem = InventoryItem(
//             itemUuid = uuid1,
//             name = "Invalid Item",
//             unit = "pcs",
//             quantityInStock = -10,
//             buildingUuid = UUID.randomUUID()
//         )
//         given(inventoryService.update(uuid1, invalidItem))
//             .willThrow(IllegalArgumentException("Quantity in stock cannot be negative"))

//         mockMvc.perform(
//             put("/api/inventory/$uuid1")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(invalidItem))
//         ).andExpect(status().isBadRequest)
//             .andExpect(jsonPath("$.error").value("Quantity in stock cannot be negative"))
//     }

//     @Test
//     fun `should delete inventory item`() {
//         doNothing().`when`(inventoryService).delete(uuid1)

//         mockMvc.perform(delete("/api/inventory/$uuid1"))
//             .andExpect(status().isNoContent)
//     }

//     @Test
//     fun `should return 404 when deleting non-existent inventory item`() {
//         given(inventoryService.delete(uuid1))
//             .willThrow(NoSuchElementException("Item with ID $uuid1 not found"))

//         mockMvc.perform(delete("/api/inventory/$uuid1"))
//             .andExpect(status().isNotFound)
//             .andExpect(jsonPath("$.error").value("Item with ID $uuid1 not found"))
//     }

//     @Test
//     fun `should add or update inventory item`() {
//         val request = InventoryItemRequest(
//             name = "New Item",
//             quantity = 100,
//             price = 10.0,
//             buildingUuid = uuid1  
//         )

//         doNothing().`when`(inventoryService).addOrUpdateItem(request)

//         mockMvc.perform(
//             post("/api/inventory")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(request))
//         ).andExpect(status().isOk)
//             .andExpect(content().string("Item processed successfully"))
//     }

//     @Test
//     fun `should return 404 when adding or updating inventory item with negative quantity`() {
//         val request =
//             InventoryItemRequest(
//                 name = "Invalid Item",
//                 quantity = -10,
//                 price = 10.0,
//                 buildingUuid = uuid1,
//             )
//         given(inventoryService.addOrUpdateItem(request)).willThrow(IllegalArgumentException("Quantity cannot be negative"))

//         mockMvc
//             .perform(
//                 post("/api/inventory")
//                     .contentType(MediaType.APPLICATION_JSON)
//                     .content(objectMapper.writeValueAsString(request)),
//             ).andExpect(status().isBadRequest)
//             .andExpect(jsonPath("$.error").value("Quantity cannot be negative"))
//     }

//     @Test
//     fun `should use inventory item successfully`() {
//         val request =
//             InventoryUsageRequest(
//                 name = "Item1",
//                 unit = 10,
//                 buildingUuid = uuid1,
//             )
//         val updatedItem = InventoryItem(
//             itemUuid = uuid1,
//             name = "Item1",
//             unit = "pcs",
//             quantityInStock = 90,
//             buildingUuid = UUID.randomUUID()
//         )
//         given(inventoryService.useInventoryItem(request)).willReturn(updatedItem)

//         mockMvc.perform(
//             post("/api/inventory/use")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(request))
//         ).andExpect(status().isOk)
//             .andExpect(jsonPath("$.itemUuid").value(uuid1.toString()))
//             .andExpect(jsonPath("$.quantityInStock").value(90))
//     }

//     @Test
//     fun `should return 404 when using inventory item with zero or negative quantity`() {
//         val request =
//             InventoryUsageRequest(
//                 name = "Item1",
//                 unit = 0,
//                 buildingUuid = uuid1,
//             )
//         given(inventoryService.useInventoryItem(request)).willThrow(IllegalArgumentException("Quantity must be greater than zero"))

//         mockMvc
//             .perform(
//                 post("/api/inventory/use")
//                     .contentType(MediaType.APPLICATION_JSON)
//                     .content(objectMapper.writeValueAsString(request)),
//             ).andExpect(status().isBadRequest)
//             .andExpect(jsonPath("$.error").value("Quantity must be greater than zero"))
//     }
// }
