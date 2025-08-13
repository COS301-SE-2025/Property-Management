import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonModal, IonHeader, IonToolbar, IonButtons, IonContent, IonCardHeader, IonCard, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { ContractorApiService, ContractorDetails, ImageApiService, MaintenanceTask, FormatDatePipe, InventoryUsage, Inventory, InventoryUsageApiService, TaskApiService } from 'shared';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InventoryUsageComponent } from "src/app/components/inventory-usage/inventory-usage.component";

@Component({
  selector: 'app-view-task',
  imports: [IonContent, IonButton, IonModal, IonHeader, IonToolbar, IonButtons, FormatDatePipe, CommonModule, IonCardHeader, IonCard, IonCardTitle, IonCardContent, InventoryUsageComponent],
  templateUrl: './view-task.component.html',
  styles: `
     .no-outline-card {
      box-shadow: none !important;
    }
    .no-outline-card ion-card {
      box-shadow: none !important;
    }
  `,
})
export class ViewTaskComponent extends ModalComponent{

  task: MaintenanceTask | undefined;
  imageUrl: string | undefined = undefined;
  contractor: ContractorDetails | undefined;
  inventoryUsage: InventoryUsage[] | undefined = undefined;
  inventoryItem: Inventory[] | undefined = undefined;

  taskId: string | undefined = undefined;
  
  constructor( private imageService: ImageApiService, private contractorService: ContractorApiService, private inventoryUsageService: InventoryUsageApiService, private taskService: TaskApiService) {
    super();
  }

  override openModal(task?: MaintenanceTask): void {
    this.task = task;
    this.taskId = task?.uuid;
    this.getImages();
    this.getContractor();
    this.getInventoryUsage();
    super.openModal();
  }
  override closeModal(): void {
    this.task = undefined;
    super.closeModal();
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
    } else {
      this.contractor = undefined;
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
