export interface TaskProgress{
    progressUuid?: string;
    submissionDate: Date;
    contractorUuid: string;
    taskUuid: string;
    imageId?: string;
    progressPercentage: number;
    workDescription: string;
    inventoryUsageUuid?: string;
    quantityUsed: number;
    quantityName?: string
    remarks: string | null;
    lastUpdated: Date;
}