export interface Quote{
    uuid: string;
    t_uuid: string;
    c_uuid: string;
    amount: number;
    submitted_on: Date,
    doc: string;
    status?: string;
}