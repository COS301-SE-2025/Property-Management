export interface Graph {
    labels: Date[] | string[];
    datasets: 
    {
        label?: string;
        data: number[];
        fill?: boolean;
        backgroundColor?: string | string[];
        borderColor: string | string[];
        pointBackgroundColor?: string;
        tension?: number;
        borderWidth?: number;
        borderDash?: number[];
        spanGaps?: boolean;
    }[];
    predictedInventoryBudget?: number;
    predictedMaintenanceBudget?: number;
}