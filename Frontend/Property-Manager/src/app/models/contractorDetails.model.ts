export interface ContractorDetails {
    contractorId: number;
    name: string;
    email: string;
    phone: string;
    apikey: string;
    banned: boolean;
    images?: string[];

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