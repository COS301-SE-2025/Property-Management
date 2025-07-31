import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceTask, ContractorDetails, ContractorApiService, ImageApiService, FormatDatePipe, InventoryItemApiService, InventoryUsageApiService, TaskApiService, InventoryUsage, Inventory } from 'shared';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from 'property-manager/src/app/components/header/header.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BreadCrumbService } from 'property-manager/src/app/components/breadcrumb/breadcrumb.service';
import { InventoryUsageComponent } from 'property-manager/src/app/components/inventory-usage/inventory-usage.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-timeline-details',
  templateUrl: './timeline-details.component.html',
  styles: ``,
  imports: [FormatDatePipe, CommonModule, HeaderComponent, CardModule, TableModule, InventoryUsageComponent],
})
export class TimelineDetailsComponent implements OnInit, OnDestroy {

  task: MaintenanceTask | undefined;
  imageUrl: string | undefined = undefined;
  contractor: ContractorDetails | undefined = undefined;
  inventoryUsage: InventoryUsage[] | undefined = undefined;
  inventoryItem: Inventory[] | undefined = undefined;

  taskId: string | null = null;

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
  }
  ngOnDestroy(): void {
    this.breadCrumb.clearBreadCrumb();
  }

  async getImages()
  {
    if (this.task?.img) {
      this.imageUrl = await this.imageService.getImage(this.task.img).toPromise();
    } else {
      this.imageUrl = undefined;
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
