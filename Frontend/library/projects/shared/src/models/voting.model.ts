import { MaintenanceTask } from "./maintenanceTask.model";

export interface Voting extends MaintenanceTask{
    sessionUuid: string;
    taskUuid: string;
    corporateUuid: string;
    votingEndsAt: number[];
    isActive: boolean;
}