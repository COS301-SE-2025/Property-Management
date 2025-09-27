import { Inventory } from "./inventory.model";

export interface Anomaly extends Inventory{
    email: string;
    trusteeUuid: string;
    houseName: string;
}