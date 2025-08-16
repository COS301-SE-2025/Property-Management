export interface Quote {
  uuid: string;           // Quote UUID
  t_uuid: string;         // Task UUID
  c_uuid: string;         // Contractor UUID
  amount: number;
  doc: string;            // Document or description
  status: string;         // Quote status
  submitted_on: number;   // Timestamp (can convert to Date when displaying)
}
