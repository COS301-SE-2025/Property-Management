export interface BuildingDetails{
    name: string;
    address: string;
    totalBudget: number;
    maintenanceBudget: number;
    inventoryBudget: number;
    inventorySpent: number;
    maintenanceSpent: number;
    maintenanceTasks: {
        title: string;
        description: string;
        status: string;
        approved: boolean;
        proofImages: string[];
    }[];
}