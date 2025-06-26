import { Contractor } from "./contractor.model";

export interface ContractorDetails extends Contractor{
    address: string;
    status: string;
    licenseNum: number;
    descriptionAndSkills: string | string[];
    services: string | string[];
    certificates: string | string[];
    licenses: string | string[];
    projectHistory: string | string[];
    projectHistoryProof: string | string[];
}