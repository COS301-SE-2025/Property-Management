export interface Rating {
  uuid: string;
  contractorUuid: string;
  comment: string;
  rating: number;
  taskUuid: string;
  trusteeUuid: string;
  createdAt?: string;
  contractorName?: string; // for display
  taskName?: string;       // for display
}