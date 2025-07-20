import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonModal, IonHeader, IonToolbar, IonButtons, IonContent } from "@ionic/angular/standalone";
import { ContractorApiService, ContractorDetails, ImageApiService, MaintenanceTask, FormatDatePipe } from 'shared';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-view-task',
  imports: [IonContent, IonButton, IonModal, IonHeader, IonToolbar, IonButtons, FormatDatePipe, CommonModule],
  templateUrl: './view-task.component.html',
  styles: ``,
})
export class ViewTaskComponent extends ModalComponent{

  task: MaintenanceTask | undefined;
  imageUrl: string | undefined = undefined;
  contractor: ContractorDetails | undefined;
  
  constructor(private imageService: ImageApiService, private contractorService: ContractorApiService) {
    super();
   }

  override openModal(task?: MaintenanceTask): void {
    this.task = task;
    this.getImages();
    this.getContractor();
    super.openModal();
  }
  override closeModal(): void {
    this.task = undefined;
    super.closeModal();
  }
  async getImages()
  {
    console.log(this.task);
    if (this.task?.img) {
      this.imageUrl = await this.imageService.getImage(this.task.img).toPromise();
    } else {
      this.imageUrl = undefined;
    }
  }
  async getContractor()
  {
    const contractorId = this.task?.c_uuid;
    console.log(contractorId);
    if (typeof contractorId === 'string') {
      this.contractor = await this.contractorService.getContractorById(contractorId).toPromise();
    } else {
      this.contractor = undefined;
    }
  }
}
