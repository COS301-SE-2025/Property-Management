import { Injectable, signal } from '@angular/core';
import { ImageApiService, MaintenanceTask, TaskApiService } from '../public-api';
import { VotingApiService } from './api/Voting api/voting-api.service';

@Injectable({
  providedIn: 'root'
})

export class VotingService{
    //Check if bc or trustee
    //If bc get all trustees
    //Get all tasks thats scheduled date is past now

    votingTasks = signal<MaintenanceTask[]>([]); 
    pendingTasks = signal<MaintenanceTask[]>([]);

    constructor(private votingApiService: VotingApiService, private taskApiService: TaskApiService, private imageService: ImageApiService){}

    getBodyCorporateVotingTasks(bcId: string)
    {

    }
    async getTrusteeVotingTasks(trusteeId: string)
    {
        const date = new Date();
        this.votingTasks.set([]);
        this.pendingTasks.set([]);
        
        this.taskApiService.getAllTasks().subscribe({
            next: (tasks) => {

                tasks.forEach(t => {
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
                            this.addToVoting(t);
                        }
                        else if(t.scheduled_date > date)
                        {
                            this.addToPending(t);
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
    getVotingTaskById(taskId: string)
    {
        return this.votingTasks().find(task => task.uuid === taskId);
    }
    getPendingTaskById(taskId: string)
    {
        return this.pendingTasks().find(task => task.uuid === taskId);
    }
    getSessionId(taskId: string)
    {
        
    }
    private addToPending(task: MaintenanceTask)
    {
        this.pendingTasks.set([...this.pendingTasks(), task])
    }
    private addToVoting(task: MaintenanceTask)
    {
        this.votingTasks.set([...this.votingTasks(), task]);
    }
}