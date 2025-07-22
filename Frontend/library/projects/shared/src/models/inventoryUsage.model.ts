export interface InventoryUsage{
    usageUuid: string;
    itemUuid: string;
    taskUuid: string;
    contractorUuid: string;
    quantityUsed: number;
    trusteeApproval: boolean;
    approvedDate: Date;
}