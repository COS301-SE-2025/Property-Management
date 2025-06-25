export interface InventoryUsage{
    usageId: string;
    itemId: string;
    taskId: string;
    contractorId: string;
    quantityUsed: number;
    trusteeApproval: boolean;
    approvedDate?: Date;
}