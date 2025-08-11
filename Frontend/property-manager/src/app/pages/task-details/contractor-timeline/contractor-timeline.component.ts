import { Component, input, signal } from "@angular/core";
import { ContractorDetails, ImageApiService, MaintenanceTask, TaskProgresApiService, TaskProgress, FormatTimePipe, getCookieValue } from "shared";
import { CardModule } from "primeng/card";
import { MessageService } from "primeng/api";
import { Toast } from "primeng/toast";
import { CommonModule } from "@angular/common";
import { TimelineModule } from "primeng/timeline";
import { AddProgressDialog } from "../add-progress-dialog/add-progress-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-contractor-timeline',
  templateUrl: './contractor-timeline.component.html',
  styles: ``,
  imports: [CardModule, Toast, TimelineModule, CommonModule, FormatTimePipe, AddProgressDialog],
  providers: [MessageService]
})
export class ContractorTimeline{
    
    public contractor = input.required<ContractorDetails>();
    public task = input.required<MaintenanceTask>();
    public timeline = signal<TaskProgress[]>([]);
    public contractorUser = false;
    public emptyTimeline = false;

    constructor(
        private taskProgressService: TaskProgresApiService, 
        private messageService: MessageService, 
        private imageService: ImageApiService
    ){
    }

    async ngOnInit()
    {
        this.taskProgressService.getTaskProgressByTaskId(this.task().uuid).subscribe({
            next: (res) => {

                res.forEach(async p => {
                    if(p.imageId)
                    {
                        this.imageService.getImage(p.imageId).subscribe({
                            next: (res) => {
                                console.log(res);
                                p.imageId = res;
                            },
                            error: () => {
                                p.imageId = 'assets/images/no_image.png';
                            }
                        })
                    }
                    else
                    {
                        p.imageId = 'assets/images/no_image.png';
                    }
                });
                
            },
            error: (err) => {

                if(err instanceof HttpErrorResponse && err.status === 404)
                {
                    this.emptyTimeline = true;
                }
                else
                {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to load contractor timeline',
                    });
                    console.error(err);
                }
            }
        });

        if(getCookieValue(document.cookie, 'contractorId'))
        {
            this.contractorUser = true;
        }
    }
    navigateToReview(review: string)
    {
        
    }
}
