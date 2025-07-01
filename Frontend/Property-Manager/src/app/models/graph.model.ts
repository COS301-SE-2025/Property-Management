export interface Graph {
    labels: Date[] | string[];
    datasets: [
        {
            label?: string;
            data: number[];
            fill?: boolean;
            backgroundColor?: string | string[];
            borderColor: string | string[];
            tension?: number;
            borderWidth?: number;
        }
    ]
}