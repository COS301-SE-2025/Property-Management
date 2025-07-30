import { Contractor } from "./contractor.model";

export interface AssignedContractor extends Contractor{
    taskUuid?: string;
    contractorUuid?: string;
    quoteSubmitted?: boolean;
    quoteUuid?: string | null;
}