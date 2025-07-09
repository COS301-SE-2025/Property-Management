export interface Property{
    buildingUuid?: string;
    name: string;
    address: string;
    type: string;
    trustees: string | string[] | null;
    propertyValue: number | null;
    primaryContractors: number[] | null;
    latestInspectionDate: string;
    propertyImage?: string | null;
    area: number;
    coporateUuid?: string;
}