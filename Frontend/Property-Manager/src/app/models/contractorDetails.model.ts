export interface ContractorDetails {
    contractorId: number;
    name: string;
    email: string;
    phone: string;
    apikey: string;
    banned: boolean;
    images?: string[];

    address: string;
    city: string;
    postal_code: string;
    reg_number: string;
    description: string;
    services: string;
    coporateUuid?: string;
}