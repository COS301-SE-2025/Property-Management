import { Budget } from "./budget.model";
import { Building } from "./building.model";
import { MaintenanceTask } from "./maintenanceTask.model";

export interface BuildingDetails{
    budgetUuid: string;
    buildingUuid: string;
    approvalDate: Date
    inventoryBudget: number;
    inventorySpent: number;
    maintenanceBudget: number;
    maintenanceSpent: number;
    year?: number;   
}