import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceTask, ContractorDetails, ContractorApiService, ImageApiService, FormatDatePipe, InventoryItemApiService, InventoryUsageApiService, TaskApiService, InventoryUsage, Inventory, getCookieValue, TaskProgresApiService } from 'shared';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BreadCrumbService } from '../../components/breadcrumb/breadcrumb.service';
import { InventoryUsageComponent } from '../../components/inventory-usage/inventory-usage.component';
import { lastValueFrom } from 'rxjs';
import { ContractorTimelineComponent } from "./contractor-timeline/contractor-timeline.component";
import { ContractorInventoryRequestComponent } from '../contractor-inventory-request/contractor-inventory-request.component';
import { ProgressSpinnerModule } from "primeng/progressspinner";


@Component({
  selector: 'app-timeline-details',
  templateUrl: './task-details.component.html',
  styles: ``,
  imports: [FormatDatePipe, CommonModule, CardModule, TableModule, InventoryUsageComponent, ContractorTimelineComponent, ContractorInventoryRequestComponent, ProgressSpinnerModule],
})
export class TaskDetailsComponent implements OnInit, OnDestroy {

  task: MaintenanceTask | undefined;
  imageUrl: string | undefined = undefined;
  contractor: ContractorDetails | undefined = undefined;
  inventoryUsage: InventoryUsage[] | undefined = undefined;
  inventoryItem: Inventory[] | undefined = undefined;

  taskId: string | null = null;
  contractorUser = false;
  loading = true;

  get isTaskApproved(): boolean {
    return this.task?.status === 'APPROVED';
  }
  
  constructor(
    private imageService: ImageApiService, 
    private contractorService: ContractorApiService, 
    private inventoryUsageService: InventoryUsageApiService,
    private taskService: TaskApiService, 
    private route: ActivatedRoute,
    private breadCrumb: BreadCrumbService,
    private taskProgressService: TaskProgresApiService,
    private router: Router
  ) { 
    effect(() => {
     this.breadCrumb.setBreadCrumbs([
        { label: 'Task details', route: `/taskDetails/${this.taskId}`}
      ]);
   });

  }

  async ngOnInit() {
    this.loading = true;
    this.taskId = this.route.snapshot.paramMap.get('taskId');
    this.contractorUser = false;

    if(this.taskId)
    {
      this.taskService.getTaskById(this.taskId).subscribe({
        next: async (res) => {
          this.task = res;
          this.getImages();
          this.getContractor();
          this.getInventoryUsage();


          const start = Date.now();
          while(this.imageUrl === undefined && this.contractor === undefined && Date.now() - start < 2000)
          {
            await new Promise(res => setTimeout(res, 100));
          }

          await new Promise(res => setTimeout(res, 2000));
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }

    if(getCookieValue(document.cookie, 'contractorId'))
    {
      this.contractorUser = true;
    }
  }
  ngOnDestroy(): void {
    this.breadCrumb.clearBreadCrumb();
  }

  async getImages() {
    if (this.task?.img) {
      try {
        // First, get all task progress records for this task
        const progressRecords = await lastValueFrom(
          this.taskProgressService.getTaskProgressByTaskId(this.taskId!)
        );
        
        // Get the first progress UUID if available
        const progressUuid = progressRecords.length > 0 
          ? progressRecords[0].progressUuid 
          : undefined;
        
        const taskUuid = this.taskId ?? undefined;
        
        // Fetch image using both task UUID and progress UUID
        this.imageUrl = await lastValueFrom(
          this.imageService.getImage(
            this.task.img,      // imageId
            taskUuid,           // task_uuid
            undefined,          // user_uuid
            undefined,       // progress_uuid
            undefined           // building_uuid
          )
        );
      } catch (error) {
        console.error('Error fetching image:', error);
        this.imageUrl = "assets/images/no_image.png";
      }
    } else {
      this.imageUrl = "assets/images/no_image.png";
    }
  }

  async getContractor()
  {
    const contractorId = this.task?.cuuid;
    if (typeof contractorId === 'string') {
      this.contractor = await this.contractorService.getContractorById(contractorId).toPromise();

      //Get profile image
      if(this.contractor?.img)
      {
        this.imageService.getImage(this.contractor.img).subscribe({
          next: (url) => {
            if (this.contractor) {
              this.contractor.img = url;
            }
          }
        })
      }
    }
  }
  async getInventoryUsage()
  {
    if(this.taskId)
    { 
      this.inventoryUsage = await lastValueFrom(
        this.inventoryUsageService.getUsageRecordsByTaskId(this.taskId)
      );
    }
  }
  
  contractorDetails(contractorId: string)
  {
    this.breadCrumb.setBreadCrumbs([
        { label: 'Task details', route: `/taskDetails/${this.taskId}`},
        { label: 'Contractor details', route: `/contractorDetails/${contractorId}/trusted` }
      ]);
    this.router.navigate(['/contractorDetails', contractorId, 'trusted']);
  }
}
