import { Contractor } from "./contractor.model";

export interface MaintenanceBudget{
    description: string;
    cost: number;
    DoneBy: Contractor;
    DoneOn: Date;
}