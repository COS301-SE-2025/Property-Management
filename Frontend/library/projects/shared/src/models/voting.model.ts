import { MaintenanceTask } from "./maintenanceTask.model";

export interface Voting extends MaintenanceTask{
    sessionUuid: string;
    taskUuid?: string;
    corporateUuid: string;
    votingEndsAt: number[];
    votingEndsAtDate?: Date;
    isActive: boolean;
}