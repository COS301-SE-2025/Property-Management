export interface Inventory {
    itemUuid: string;
    name: string;
    unit: string;
    quantityInStock: number;
    buildingUuid: string;
    price?: number; 
    boughtDate?: Date;
}