import { Contractor } from "./contractor.model";
import { Inventory } from "./inventory.model";

export interface MaintenanceTask{
    uuid: string;
    title: string;
    des: string;
    status: string;
    scheduled_date: Date;
    approved: boolean;
    b_uuid: string;
    t_uuid: string;
    img?: string[] | string; 
    done?: boolean;
}