import { Budget } from "./budget.model";
import { Building } from "./building.model";
import { MaintenanceTask } from "./maintenanceTask.model";

export interface BuildingDetails{
    budgetUuid: string;
    approvalDate: Date
    building: Building;
    maintenanceBudget: Budget;
    inventoryBudget: Budget;
    maintenanceTasks: MaintenanceTask[];
}