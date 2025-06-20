import { Contractor } from "./contractor.model";
import { Inventory } from "./inventory.model";

export interface MaintenanceTask{
    description: string;
    cost: number;
    DoneBy: Contractor
    DoneOn: Date;
    status: string;
    approved: boolean;
    proofImages?: string[];
    inventoryItemsUsed?: Inventory[];
    ReviewScore?: number;
    ReviewDescription?: string;
    quotationPdf?: string;
}