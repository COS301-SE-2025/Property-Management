export interface Graph {
    labels: number[];
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