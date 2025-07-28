export interface MaintenanceTask{
    [x: string]: any;
    uuid: string;
    title: string;
    des: string;
    status: string;
    scheduled_date: Date;
    approved: boolean;
    buuid: string;
    tuuid: string;
    cuuid?: string;
    img?: string; 
    done?: boolean;
    createdByUuid?: string | null;
}