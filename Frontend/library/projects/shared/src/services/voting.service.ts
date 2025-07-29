import { Injectable, signal } from '@angular/core';
import { BodyCoporateService, ImageApiService, MaintenanceTask, TaskApiService, Voting } from '../public-api';
import { VotingApiService } from './api/Voting api/voting-api.service';

@Injectable({
  providedIn: 'root'
})

export class VotingService{
    //Check if bc or trustee
    //If bc get all trustees
    //Get all tasks thats scheduled date is past now

    votingTasks = signal<Voting[]>([]); 
    pendingTasks = signal<MaintenanceTask[]>([]);

    constructor(private votingApiService: VotingApiService, private taskApiService: TaskApiService, private imageService: ImageApiService, private bodyCorporateService: BodyCoporateService){}

    async getBodyCorporateVotingTasks()
    {
        console.log('getting tasks');
        const date = new Date();
        this.pendingTasks.set([]);
        this.votingTasks.set([]);

        await this.bodyCorporateService.loadPendingTasks();
        const tasks = this.bodyCorporateService.pendingTasks();

        
        tasks.forEach(task => {
            if(!task.approved)
            {
                //add to pending tasks tasks 
                if(task.scheduled_date > date)
                {
                    if(!task.img)
                    {
                        task.img = "assets/images/no_image.png";
                    }
                    else
                    {
                        if(task.img === '00000000-0000-0000-0000-000000000000')
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
                }
            }
            else
            {
                //Get session data based on if the task has been approved and add to voting tasks, new endpoint
            }
        })
    }
    async getTrusteeVotingTasks(trusteeId: string)
    {
        const date = new Date();
        this.votingTasks.set([]);
        
        this.taskApiService.getAllTasks().subscribe({
            next: (tasks) => {

                tasks.forEach(t => {

                    if(t.tuuid === trusteeId)
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
                            else
                            {
                                this.imageService.getImage(t.img).subscribe({
                                    next: (image) => {
                                        t.img = image;
                                    }
                                });
                            }
    
                            if(t.approved && t.scheduled_date > date)
                            {
                                //TODO: Get session info
                                // this.addToVoting(t);
                            }
                        }
                    }
                });
            }
        });
    }
    castVote(taskId: string, corporateId: string)
    {

    }
    getAllVotes(sessionId: string)
    {

    }
    async createVotingSession(contractors: string[], taskId: string, bcId: string)
    {
        //Update approval and assign contractors
        this.taskApiService.updateTaskApproval(true, taskId);
        this.taskApiService.assignContractorsToTask(contractors, taskId);

        //Create session
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        now.setDate(now.getDate() + 3);

        const formattedDate = now.toISOString().split('.')[0];

        console.log(now);
        
        this.votingApiService.createSession(taskId, bcId, formattedDate).subscribe({
            next: (res) => {
                console.log(res);
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
    getSessionTaskId(sessionId: string)
    {
        return this.votingApiService.getSessionDetails(sessionId);
    }
    private addToPending(task: MaintenanceTask)
    {
        this.pendingTasks.set([...this.pendingTasks(), task])
    }
    private addToVoting(task: Voting)
    {
        this.votingTasks.set([...this.votingTasks(), task]);
    }
}