export interface TaskProgress{
    progressUuid?: string;
    submissionDate: number[];
    subDate?: Date;
    contractorUuid: string;
    taskUuid: string;
    imageId?: string;
    progressPercentage: number;
    workDescription: string;
    inventoryUsageUuid?: string;
    quantityUsed: number;
    quantityName?: string
    remarks: string | null;
    lastUpdated: number[];
}