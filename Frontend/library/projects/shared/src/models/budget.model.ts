export interface Budget{
    category: "maintenance" | "inventory" | "Maintenance" | "Inventory";
    budgetAmount: number;
    budgetSpent?: number;
}

export interface BudgetPrediction extends Budget{
    budget_type: string;
    freq: string;
    timestamp: Date;
    prediction: predictionData[];
    total: number;
}

interface predictionData{
    ds: Date;
    yhat: number;
}