import { Contractor } from "./contractor.model";

export interface ContractorDetails extends Contractor {
   address: string;
   city: string;
   postal_code: string;
   reg_number: string;
   description: string;
   services: string;
   img?: string;
   corporate_uuid?: string;
   project_history?: string;
}