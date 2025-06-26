export interface Inventory {
    itemUuid: string;
    name: string;
    unit: string;
    quantity: number;
    buildingUuid: string;
    quantityInStock: number;
    price?: number; 
    boughtDate?: Date;
}