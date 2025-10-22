import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { HeaderComponent } from "src/app/components/header/header.component";
import { MaintenanceTask, ContractorDetails, InventoryUsage, Inventory, ContractorApiService, ImageApiService, InventoryUsageApiService, TaskApiService, StorageService, FormatDatePipe } from 'shared';
import { ActivatedRoute } from '@angular/router';
import { InventoryUsageComponent } from 'src/app/components/inventory-usage/inventory-usage.component';
import { lastValueFrom } from 'rxjs';
import { ContractorTimelineComponent } from "./contractor-timeline/contractor-timeline.component";
import { TabComponent } from "src/app/components/tab/tab.component";

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styles: ``,
  imports: [IonContent, HeaderComponent, IonCard, CommonModule, InventoryUsageComponent, ContractorTimelineComponent, FormatDatePipe, TabComponent, IonCardHeader, IonCardTitle, IonCardContent],
})
export class ViewTaskComponent  implements OnInit {

  task: MaintenanceTask | undefined;
  imageUrl: string | undefined = undefined;
  contractor: ContractorDetails | undefined = undefined;
  inventoryUsage: InventoryUsage[] | undefined = undefined;
  inventoryItem: Inventory[] | undefined = undefined;

  taskId: string | null = null;
  contractorUser = false;

  isDone = false;

  constructor(
    private imageService: ImageApiService, 
    private contractorService: ContractorApiService, 
    private inventoryUsageService: InventoryUsageApiService,
    private taskService: TaskApiService, 
    private route: ActivatedRoute,
    private storageService: StorageService
  ) { }

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

   if(await this.storageService.get('contractorId'))
   {
    this.contractorUser = true;
   }
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
