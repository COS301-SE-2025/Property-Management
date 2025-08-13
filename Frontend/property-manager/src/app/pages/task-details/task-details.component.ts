import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceTask, ContractorDetails, ContractorApiService, ImageApiService, FormatDatePipe, InventoryItemApiService, InventoryUsageApiService, TaskApiService, InventoryUsage, Inventory, getCookieValue } from 'shared';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BreadCrumbService } from '../../components/breadcrumb/breadcrumb.service';
import { InventoryUsageComponent } from '../../components/inventory-usage/inventory-usage.component';
import { lastValueFrom } from 'rxjs';
import { ContractorTimelineComponent } from "./contractor-timeline/contractor-timeline.component";

@Component({
  selector: 'app-timeline-details',
  templateUrl: './task-details.component.html',
  styles: ``,
  imports: [FormatDatePipe, CommonModule, HeaderComponent, CardModule, TableModule, InventoryUsageComponent, ContractorTimelineComponent],
})
export class TaskDetailsComponent implements OnInit, OnDestroy {

  task: MaintenanceTask | undefined;
  imageUrl: string | undefined = undefined;
  contractor: ContractorDetails | undefined = undefined;
  inventoryUsage: InventoryUsage[] | undefined = undefined;
  inventoryItem: Inventory[] | undefined = undefined;

  taskId: string | null = null;
  contractorUser = false;

  constructor(
    private imageService: ImageApiService, 
    private contractorService: ContractorApiService, 
    private inventoryUsageService: InventoryUsageApiService,
    private taskService: TaskApiService, 
    private route: ActivatedRoute,
    private breadCrumb: BreadCrumbService
  ) { 
    effect(() => {
     this.breadCrumb.setBreadCrumbs([
        { label: 'Task details', route: `/taskDetails/${this.taskId}`}
      ]);
   });

  }

  async ngOnInit() {
   this.taskId = this.route.snapshot.paramMap.get('taskId');

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
      this.imageUrl = await this.imageService.getImage(this.task.img).toPromise();
    } else {
      this.imageUrl = "assets/images/no_image.png";
    }
  }
  async getContractor()
  {
    const contractorId = this.task?.cuuid;
    if (typeof contractorId === 'string') {
      this.contractor = await this.contractorService.getContractorById(contractorId).toPromise();
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
}
