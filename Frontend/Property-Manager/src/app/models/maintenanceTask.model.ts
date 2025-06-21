import { Contractor } from "./contractor.model";
import { Inventory } from "./inventory.model";

export interface MaintenanceTask{
    description: string;
    UnitNo: string;
    cost: number;
    DoneBy: Contractor
    DoneOn: Date;
    DueDate: Date;
    status: string;
    approved: boolean;
    proofImages?: string[];
    inventoryItemsUsed?: Inventory[];
    ReviewScore?: number;
    ReviewDescription?: string;
    quotationPdf?: string;
    numOfAssignedContractors: number;
}