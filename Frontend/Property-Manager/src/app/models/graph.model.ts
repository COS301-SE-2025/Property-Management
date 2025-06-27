export interface Graph {
    labels: Date[];
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