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