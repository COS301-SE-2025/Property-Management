import { Component, input, signal } from "@angular/core";
import { ContractorDetails, ImageApiService, MaintenanceTask, TaskProgresApiService, TaskProgress, FormatTimePipe, getCookieValue, InventoryUsage, Inventory, InventoryUsageApiService, InventoryItemApiService } from "shared";
import { CardModule } from "primeng/card";
import { MessageService } from "primeng/api";
import { Toast } from "primeng/toast";
import { CommonModule } from "@angular/common";
import { TimelineModule } from "primeng/timeline";
import { AddProgressDialog } from "../add-progress-dialog/add-progress-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";
import { TableModule } from "primeng/table";
import { lastValueFrom } from "rxjs";

@Component({
  selector: 'app-contractor-timeline',
  templateUrl: './contractor-timeline.component.html',
  styles: `
    .timeline-title{
        color: #facc15;
    }
  `,
  imports: [CardModule, Toast, TimelineModule, CommonModule, FormatTimePipe, AddProgressDialog, TableModule],
  providers: [MessageService]
})
export class ContractorTimeline{
    
    public contractor = input.required<ContractorDetails>();
    public task = input.required<MaintenanceTask>();
    public timeline = signal<TaskProgress[]>([]);
    public inventoryUsage: InventoryUsage | undefined = undefined;
    public inventoryItem =  signal<Inventory[]>([]);
    public contractorUser = false;
    public bcUser = false;
    public darkMode = false;

    constructor(
        private taskProgressService: TaskProgresApiService, 
        private messageService: MessageService, 
        private imageService: ImageApiService,
        private inventoryUsageService: InventoryUsageApiService,
        private inventoryItemService: InventoryItemApiService
    ){
    }

    async ngOnInit()
    {
        this.timeline.set([]);
        this.inventoryItem.set([]);
        this.taskProgressService.getTaskProgressByTaskId(this.task().uuid).subscribe({
            next: (res) => {
                console.log(res);

                if(res.length === 0)
                {
                    return;
                }

                res.forEach(async p => {
                    if(p.imageId)
                    {
                        this.imageService.getImage(p.imageId).subscribe({
                            next: (res) => {
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

                    if(p.inventoryUsageUuid)
                    {
                        this.getInventoryUsage(p.inventoryUsageUuid, p.quantityUsed);
                    }

                    p.subDate = this.toDate(p.submissionDate);
                    this.timeline.set([...this.timeline(), p]);
                }); 
            },
            error: (err) => {

                if(err instanceof HttpErrorResponse && err.status === 404)
                {
                    this.timeline.set([]);
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
        else if(getCookieValue(document.cookie, 'bodyCorporateId'))
        {
            this.bcUser = true;
        }
        this.darkMode = localStorage.getItem('darkMode') === 'true';
    }
    async getInventoryUsage(usageId: string, quantity: number)
    {
        try{
            this.inventoryUsage = await lastValueFrom(
                this.inventoryUsageService.getInventoryUsageById(usageId)
            );

            if(this.inventoryUsage)
            {
                const inventoryItems = await lastValueFrom(
                    this.inventoryItemService.getInventoryItemsById(this.inventoryUsage.itemUuid)
                )

                inventoryItems.quantityInStock = quantity;

                this.inventoryItem.set([...this.inventoryItem(), inventoryItems]);
            }
        }
        catch(error) {
            console.error("Error fetching inventory", error);
        }
    }
    navigateToReview(review: string)
    {
        
    }
    checkQuantity()
    {
        return this.inventoryItem();
    }
    private toDate(arr: number[]): Date{
        return new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4]);
    }
}
