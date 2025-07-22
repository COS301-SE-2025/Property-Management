export interface Quote{
    quote_id: number;
    task_id: number;
    contractor_id: number;
    amount: number;
    submitted_on: Date,
    type: string;
}