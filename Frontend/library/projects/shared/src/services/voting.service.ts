import { Injectable, signal } from '@angular/core';
import { AssignedContractor, BodyCoporateService, ContractorApiService, getCookieValue, HousesService, ImageApiService, MaintenanceTask, Quote, TaskApiService, Voting } from '../public-api';
import { VotingApiService } from './api/Voting api/voting-api.service';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VotingService{
    votingTasks = signal<Voting[]>([]); 
    assignedContractors = signal<AssignedContractor[]>([]);
    pendingTasks = signal<MaintenanceTask[]>([]);
    finalApproval = signal<Voting[]>([]);
    approvedTasks = signal<Voting[]>([]);

    constructor(
        private votingApiService: VotingApiService, 
        private taskApiService: TaskApiService, 
        private imageService: ImageApiService, 
        private bodyCorporateService: BodyCoporateService, 
        private contractorService: ContractorApiService, 
        private housesService: HousesService
    ){}

    async getBodyCorporateVotingTasks()
    {
        const date = new Date();
        date.setHours(0, 0, 0, 0); 
        
        this.pendingTasks.set([]);
        this.votingTasks.set([]);
        this.approvedTasks.set([]);
        this.finalApproval.set([]);

        const bcId = getCookieValue(document.cookie, 'bodyCoporateId');

        await this.bodyCorporateService.loadPendingTasks(bcId);
        const tasks = this.bodyCorporateService.pendingTasks();

        tasks.forEach(task => {
            const taskDate = new Date(task.scheduled_date);
            taskDate.setHours(0, 0, 0, 0);

            console.log('Processing task:', {
                title: task.title,
                approvalStatus: task.approvalStatus,
                scheduled_date: task.scheduled_date,
                taskDate: taskDate,
                currentDate: date,
                comparison: taskDate >= date
            });

            if(task.approvalStatus === 'PENDING' && taskDate >= date)
            {
                if(!task.img || task.img === '00000000-0000-0000-0000-000000000000')
                {
                    task.img = "assets/images/no_image.png";
                }
                else
                {
                    this.imageService.getImage(task.img).subscribe({
                        next: (image) => {
                            task.img = image;
                        }
                    });
                }
                console.log('Adding to pending tasks:', task.title);
                this.addToPending(task);
            }
            else if(taskDate > date && task.approvalStatus !== 'COMPLETED')
            {
                this.votingApiService.getSessionFromTaskId(task.uuid).subscribe({
                    next:(res) => {

                        if(!res)
                        {
                            console.warn("Couldn't get session", task);
                            return;
                        }

                        const [year, month, day, hour, min] = res.votingEndsAt;
                        const votingDate = new Date(year, month -1, day, hour, min);

                        const votingRes: Voting = {
                            ...task,
                            sessionUuid: res.sessionUuid,
                            corporateUuid: res.corporateUuid,
                            votingEndsAt: res.votingEndsAt,
                            votingEndsAtDate: votingDate,
                            isActive: res.isActive
                        }

                        // Get image
                        if(!votingRes.img || votingRes.img === '00000000-0000-0000-0000-000000000000')
                        {
                            votingRes.img = "assets/images/no_image.png";
                        }
                        else
                        {
                            this.imageService.getImage(votingRes.img).subscribe({
                                next: (image) => {
                                    votingRes.img = image;
                                }
                            });
                        }
                        console.log('Adding to voting tasks:', votingRes.title);
                        this.addToVoting(votingRes);
                    }
                });
            }
            else if(!task.cuuid || task.cuuid === '')
            {
                this.votingApiService.getSessionFromTaskId(task.uuid).subscribe({
                    next:(res) => {

                        if(!res)
                        {
                            console.warn("Couldn't get session", task);
                            return;
                        }

                        const [year, month, day, hour, min] = res.votingEndsAt;
                        const votingDate = new Date(year, month -1, day, hour, min);

                        const votingRes: Voting = {
                            ...task,
                            sessionUuid: res.sessionUuid,
                            corporateUuid: res.corporateUuid,
                            votingEndsAt: res.votingEndsAt,
                            votingEndsAtDate: votingDate,
                            isActive: res.isActive
                        }

                        // Get image
                        if(!votingRes.img || votingRes.img === '00000000-0000-0000-0000-000000000000')
                        {
                            votingRes.img = "assets/images/no_image.png";
                        }
                        else
                        {
                            this.imageService.getImage(votingRes.img).subscribe({
                                next: (image) => {
                                    votingRes.img = image;
                                }
                            });
                        }
                        console.log('Adding to final approval:', votingRes.title);
                        this.addToFinalApproval(votingRes);
                    }
                });
            }
            else
            {
                this.votingApiService.getSessionFromTaskId(task.uuid).subscribe({
                    next:(res) => {

                        if(!res)
                        {
                            console.warn("Couldn't get session", task);
                            return;
                        }

                        const [year, month, day, hour, min] = res.votingEndsAt;
                        const votingDate = new Date(year, month -1, day, hour, min);

                        const votingRes: Voting = {
                            ...task,
                            sessionUuid: res.sessionUuid,
                            corporateUuid: res.corporateUuid,
                            votingEndsAt: res.votingEndsAt,
                            votingEndsAtDate: votingDate,
                            isActive: res.isActive
                        }

                        // Get image
                        if(!votingRes.img || votingRes.img === '00000000-0000-0000-0000-000000000000')
                        {
                            votingRes.img = "assets/images/no_image.png";
                        }
                        else
                        {
                            this.imageService.getImage(votingRes.img).subscribe({
                                next: (image) => {
                                    votingRes.img = image;
                                }
                            });
                        }
                        console.log('Adding to approved tasks:', votingRes.title);
                        this.addToApprovalTasks(votingRes);
                    }
                });
            }
        })
    }

    async getTrusteeVotingTasks(trusteeId: string)
    {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        this.votingTasks.set([]);

        // Get buildings and body corp IDs for each house
        await this.housesService.loadHouses(trusteeId);
        const houses = this.housesService.houses();

        const bodyCorpIds = Array.from( 
            new Set(houses.map(h => h.coporateUuid).filter(h => h !== null))
        );

        let tasks: MaintenanceTask[] = [];
        const taskPromises = bodyCorpIds.map(async id => {
            if(id)
            {
                await this.bodyCorporateService.loadPendingTasks(id);
                return this.bodyCorporateService.pendingTasks();
            }
            return Promise.resolve([]);
        });

        Promise.all(taskPromises).then(task => {
            tasks = task.flat();
            this.processTasks(tasks, date);
        });
    }

    private processTasks(tasks: MaintenanceTask[], date: Date)
    {
        tasks.forEach(t => {
            // Convert scheduled_date string to Date object
            const taskDate = new Date(t.scheduled_date);
            taskDate.setHours(0, 0, 0, 0);

            if(t.approvalStatus === 'APPROVED' && taskDate > date)
            {
                if(!t.img)
                {
                    t.img = "assets/images/no_image.png";
                }
                else
                {
                    if(t.img === '00000000-0000-0000-0000-000000000000')
                    {
                        t.img = "assets/images/no_image.png";
                    }

                    this.votingApiService.getSessionFromTaskId(t.uuid).subscribe({
                        next: (res) => {
                            const [year, month, day, hour, min] = res.votingEndsAt;
                            const votingDate = new Date(year, month -1, day, hour, min);

                            const votingRes: Voting = {
                                ...t,
                                sessionUuid: res.sessionUuid,
                                corporateUuid: res.corporateUuid,
                                votingEndsAt: res.votingEndsAt,
                                votingEndsAtDate: votingDate,
                                isActive: res.isActive
                            }

                            // Get image
                            if(!votingRes.img || votingRes.img === '00000000-0000-0000-0000-000000000000')
                            {
                                votingRes.img = "assets/images/no_image.png";
                            }
                            else
                            {
                                this.imageService.getImage(votingRes.img).subscribe({
                                    next: (image) => {
                                        votingRes.img = image;
                                    }
                                });
                            }
                            this.addToVoting(votingRes);
                        }
                    })
                }
            }
        });
    }

    castVote(sessionId: string, quoteId: string, voterId: string, isTrustee: boolean)
    {
        return this.votingApiService.castVote(sessionId, quoteId, voterId, isTrustee).pipe(
            map(response => {
                if(typeof response === 'string')
                {
                    return { success: true, message: response}
                }
                return response;  
            }),
            catchError(err => {
                console.error('Voting error', err);
                return throwError(() => err);
            })
        );
    }

    handleVotingError(error: any): string {
        if (error.status === 400) {
            try {
                const errorObj = JSON.parse(error.error);
                if (errorObj.error === "You already voted for this quote") {
                    return "You've already voted for this quote";
                }
            } catch (e) {
                console.error(e);
            }
        }
        return 'Failed to cast vote, please try again';
    }

    getAllVotes(sessionId: string)
    {
        return this.votingApiService.getVoteResults(sessionId);
    }

    async createVotingSession(contractors: string[], taskId: string, bcId: string)
    {
        // Update approval and assign contractors
        this.taskApiService.updateTaskApproval("APPROVED", taskId, true).subscribe({
            next: () => {
                // Change scheduled date
                const now = new Date();
                now.setHours(0, 0, 0, 0);
                now.setDate(now.getDate() + 3);

                this.taskApiService.updateTaskScheduledDate(taskId, now).subscribe({
                    next: () => {
                        this.taskApiService.assignContractorsToTask(contractors, taskId).subscribe({
                            error: (err) => {
                                console.error(err);
                            }
                        });
                        // Create session
                        this.votingApiService.createSession(taskId, bcId, now).subscribe({
                        });
                    },
                    error: (err) => {
                        console.error("Error creating session", err)
                    }
                });
            }
        });
    }

    getVotingTaskById(taskId: string)
    {
        return this.votingTasks().find(task => task.uuid === taskId);
    }

    getPendingTaskById(taskId: string)
    {
        return this.pendingTasks().find(task => task.uuid === taskId);
    }

    getTaskIdFromSessionId(sessionId: string)
    {
        return this.votingApiService.getTaskFromSessionId(sessionId);
    }

    getAssignedContractors(taskId: string)
    {
        return this.contractorService.getAssignedContractor(taskId);
    }

    getQuote(quoteId: string)
    {
        return this.votingApiService.getQuote(quoteId);
    }

    updateQuoteStatus(quoteId: string, status : string)
    {
        return this.votingApiService.updateQuoteStatus(quoteId, status);
    }

    getSessionFromTaskId(taskId: string)
    {
        return this.votingApiService.getSessionFromTaskId(taskId);
    }

    private addToPending(task: MaintenanceTask)
    {
        this.pendingTasks.set([...this.pendingTasks(), task])
    }

    private addToVoting(task: Voting)
    {
        this.votingTasks.set([...this.votingTasks(), task]);
    }

    private addToFinalApproval(task: Voting)
    {
        this.finalApproval.set([...this.finalApproval(), task]);
    }

    private addToApprovalTasks(task: Voting)
    {
        this.approvedTasks.set([...this.approvedTasks(), task]);
    }
}