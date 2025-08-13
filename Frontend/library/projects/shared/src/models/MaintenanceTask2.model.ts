export interface MaintenanceTask2{
    
    uuid: string;
    title: string;
    des: string;
    status: string;
    scheduled_date: Date;
    approved: boolean; 
    approvalStatus: string;
    b_uuid?: string; 
    t_uuid?: string;
    c_uuid?: string;
    img?: string; 
    createdByUuid?: string | null;
}