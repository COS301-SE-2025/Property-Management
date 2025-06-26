export interface Inventory {
    itemUuid: string;
    name: string;
    unit: string;
    quantity: number;
    buildingUuid: string;
    price?: number; 
    boughtDate?: Date;
}