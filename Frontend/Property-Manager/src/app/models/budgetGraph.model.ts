export interface BudgetGraph {
    labels: number[];
    datasets: [
        {
            label?: string;
            data: number[];
            fill: boolean;
            borderColor: string;
            tension: number;
        }
    ]
}