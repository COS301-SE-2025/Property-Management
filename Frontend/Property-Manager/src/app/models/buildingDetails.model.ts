export interface BuildingDetails{
    budgetUuid: string;
    buildingUuid: string;
    approvalDate: Date
    totalBudget?: number;
    inventoryBudget: number;
    inventorySpent: number;
    maintenanceBudget: number;
    maintenanceSpent: number;
    year?: number;   
}