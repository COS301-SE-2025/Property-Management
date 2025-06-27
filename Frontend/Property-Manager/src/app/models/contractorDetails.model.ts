import { Contractor } from "./contractor.model";

export interface ContractorDetails extends Contractor{
    address: string;
    city: string;
    postal_code: string;
    reg_number: string;
    description: string;
    services: string;
    coporateUuid?: string;
}