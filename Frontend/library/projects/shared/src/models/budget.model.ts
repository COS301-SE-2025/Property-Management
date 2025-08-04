export interface Budget{
    category: "maintenance" | "inventory" | "Maintenance" | "Inventory";
    budgetAmount: number;
    budgetSpent?: number;
}