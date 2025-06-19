export interface BudgetGraph {
    labels: Number[];
    datasets: [
        {
            label?: string;
            data: Number[];
            fill: boolean;
            borderColor: string;
            tension: number;
        }
    ]
}