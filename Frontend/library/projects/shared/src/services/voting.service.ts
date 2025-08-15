import { Injectable, signal } from '@angular/core';
import { AssignedContractor, BodyCoporateService, ContractorApiService, getCookieValue, HousesService, ImageApiService, MaintenanceTask, Quote, TaskApiService, Voting } from '../public-api';
import { VotingApiService } from './api/Voting api/voting-api.service';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VotingService{
    //Check if bc or trustee
    //If bc get all trustees
    //Get all tasks thats scheduled date is past now

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
        this.pendingTasks.set([]);
        this.votingTasks.set([]);
        this.approvedTasks.set([]);
        this.finalApproval.set([]);

        const bcId = getCookieValue(document.cookie, 'bodyCoporateId');

        await this.bodyCorporateService.loadPendingTasks(bcId);
        const tasks = this.bodyCorporateService.pendingTasks();

        
        tasks.forEach(task => {
            if(task.approvalStatus === 'PENDING' && task.scheduled_date >= date)
            {
                //add to pending tasks tasks 
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
                this.addToPending(task);
            }
            else if(task.scheduled_date > date)
            {
                //Get session data based on if the task has been approved and add to voting tasks
                this.votingApiService.getSessionFromTaskId(task.uuid).subscribe({
                    next:(res) => {

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

                        //Get image
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
                });
            }
            else if(!task.cuuid || task.cuuid === '')
            {
                //Task approved by bc, give summary
                this.votingApiService.getSessionFromTaskId(task.uuid).subscribe({
                    next:(res) => {

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

                        //Get image
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
                            console.warn("Couldnt get session", task);
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

                        //Get image
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
                        this.addToApprovalTasks(votingRes);
                    }
                });
            }
        })
    }
    async getTrusteeVotingTasks(trusteeId: string)
    {
        const date = new Date();
        this.votingTasks.set([]);

        //Get buildings and tasks for each building
        await this.housesService.loadHouses(trusteeId);
        const houses = this.housesService.houses();

       const tasksPromises = houses.map(async house => {
            const tasks = await firstValueFrom(this.taskApiService.getAllTasks());
            const filteredTasks = tasks.filter(t => t.buuid === house.buildingUuid);
            this.housesService.timeline.set(filteredTasks);
            return filteredTasks;
        });

        const allTimelines = await Promise.all(tasksPromises);
        const tasks = allTimelines.flat();

        tasks.forEach(t => {
            if(t.approvalStatus === 'APPROVED' && t.scheduled_date > date)
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

                    //TODO: Get session info
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

                            //Get image
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
        //Update approval and assign contractors
        this.taskApiService.updateTaskApproval("APPROVED", taskId, true).subscribe({
            next: () => {
                //change scheduled date
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
                        //Create session
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