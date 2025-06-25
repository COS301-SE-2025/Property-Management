export interface BuildingDetails{
    budgetId: string;
    name: string;
    address: string;
    totalBudget: number;
    maintenanceBudget: number;
    inventoryBudget: number;
    inventorySpent: number;
    maintenanceSpent: number;
    updatedOn: Date
    maintenanceTasks: {
        title: string;
        description: string;
        status: string;
        approved: boolean;
        proofImages: string[];
    }[];
}