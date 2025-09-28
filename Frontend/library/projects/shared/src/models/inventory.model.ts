export interface Inventory {
    itemUuid: string;
    name: string;
    unit: string;
    quantityInStock: number;
    buildingUuid: string;
    buildingUuidFk?: string;
    price: number; 
    boughtDate?: Date;
}