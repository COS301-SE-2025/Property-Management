export interface MaintenanceTask{
    [x: string]: any;
    uuid: string;
    taskUuid?: string;
    title: string;
    des: string;
    status: string;
    scheduled_date: Date;
    approved: boolean;
    approvalStatus: string;
    buuid: string;
    tuuid: string;
    trusteeUuid?: string;
    cuuid?: string;
    img?: string; 
    imageUuid?: string; 
    createdByUuid?: string | null;
    priority?: string;
    maxBudget?: number;
}
