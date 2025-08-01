export interface LifeCycleCost{
    type: string;
    description: string;
    condition: string;
    timeFrame: string;
    estimatedBudget: number;
}

export interface CreateLifeCycleCostRequest {
  coporateUuid: string;
  type: string;
  description: string;
  condition: string;
  timeframe: string;
  estimatedCost: number;
}

export interface LifeCycleCostResponse {
  costUuid: string;
  coporateUuid: string;
  type: string;
  description: string | null;
  condition: string | null;
  timeframe: string | null;
  estimatedCost: number | null;
}