import { MaintenanceTask } from "./maintenanceTask.model";

export interface Voting extends MaintenanceTask{
    sessionUuid: string;
    taskUuid?: string;
    corporateUuid: string;
    votingEndsAt: number[];
    votingEndsAtDate?: Date;
    isActive: boolean;
}

export interface VotingResults{
    sessionUuid: string;
    taskUuid: string;
    votingEnded: boolean;
    winningQuoteUuid: string | null;
    results: Array<{
        quoteUuid: string;
        votesFor: number;
    }>;
}