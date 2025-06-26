export interface Inventory {
    itemId: number;
    name: string;
    unit: string;
    quantityInStock: number;
    buildingId: number;
    price?: number; 
    boughtDate?: Date;
}