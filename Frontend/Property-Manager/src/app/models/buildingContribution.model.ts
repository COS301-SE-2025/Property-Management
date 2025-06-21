import { Building } from "./building.model";

export interface BuildingContribution extends Building{
    UnitNo: String;
    floorArea: number;
    quota: number;
    annualContribution: number;
}