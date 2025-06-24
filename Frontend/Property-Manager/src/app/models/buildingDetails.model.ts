import { Budget } from "./budget.model";
import { Building } from "./building.model";
import { MaintenanceTask } from "./maintenanceTask.model";

export interface BuildingDetails{
    building: Building;
    maintenanceBudget: Budget;
    inventoryBudget: Budget;
    maintenanceTasks: MaintenanceTask[];
}