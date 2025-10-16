import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceTask, ContractorDetails, ContractorApiService, ImageApiService, FormatDatePipe, InventoryItemApiService, InventoryUsageApiService, TaskApiService, InventoryUsage, Inventory, getCookieValue } from 'shared';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BreadCrumbService } from '../../components/breadcrumb/breadcrumb.service';
import { InventoryUsageComponent } from '../../components/inventory-usage/inventory-usage.component';
import { lastValueFrom } from 'rxjs';
import { ContractorTimelineComponent } from "./contractor-timeline/contractor-timeline.component";
import { ContractorInventoryRequestComponent } from '../contractor-inventory-request/contractor-inventory-request.component';


@Component({
  selector: 'app-timeline-details',
  templateUrl: './task-details.component.html',
  styles: ``,
  imports: [FormatDatePipe, CommonModule, CardModule, TableModule, InventoryUsageComponent, ContractorTimelineComponent, ContractorInventoryRequestComponent],
})
export class TaskDetailsComponent implements OnInit, OnDestroy {

  task: MaintenanceTask | undefined;
  imageUrl: string | undefined = undefined;
  contractor: ContractorDetails | undefined = undefined;
  inventoryUsage: InventoryUsage[] | undefined = undefined;
  inventoryItem: Inventory[] | undefined = undefined;

  taskId: string | null = null;
  contractorUser = false;

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
    private router: Router
  ) { 
    effect(() => {
     this.breadCrumb.setBreadCrumbs([
        { label: 'Task details', route: `/taskDetails/${this.taskId}`}
      ]);
   });

  }

  async ngOnInit() {
   this.taskId = this.route.snapshot.paramMap.get('taskId');
   this.contractorUser = false;

   if(this.taskId)
   {
     this.taskService.getTaskById(this.taskId).subscribe({
      next: (res) => {
        this.task = res;
        this.getImages();
        this.getContractor();
        this.getInventoryUsage();
      },
      error: (err) => {
        console.error(err)
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

  async getImages()
  {
    if (this.task?.img) {
      this.imageUrl = await this.imageService.getTaskImages(this.task.img).toPromise();
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
