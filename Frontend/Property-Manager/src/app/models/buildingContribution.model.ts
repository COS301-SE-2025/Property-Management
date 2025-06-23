import { Building } from "./building.model";

export interface BuildingContribution extends Building{
    UnitNo: string;
    floorArea: number;
    quota: number;
    annualContribution: number;
}