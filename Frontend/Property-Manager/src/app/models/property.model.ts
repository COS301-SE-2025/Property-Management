export interface Property{
    name: string;
    address: string;
    type: string;
    trustees: number[] | null;
    propertyValue: number | null;
    primaryContractors: number[] | null;
    latestInspectionDate: string;
    propertyImage: string | null;
}