export interface BuildingDetails{
    budgetUuid: string;
    buildingUuid: string;
    totalBudget: number;
    maintenanceBudget: number;
    inventoryBudget: number;
    inventorySpent?: number;
    maintenanceSpent?: number;
    approvalDate: Date
    maintenanceTasks?: {
        title: string;
        description: string;
        status: string;
        approved: boolean;
        proofImages: string[];
    }[];
}