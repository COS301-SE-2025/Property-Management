export interface Contractor{
    contractorId: number;
    name: string;
    email: string;
    phone: string;
    apikey: string;
    banned: boolean;
    images?: string[];
}