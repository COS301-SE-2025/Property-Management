import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { MaintenanceTask } from '../../../../models/maintenanceTask.model';
import { ImageApiService } from '../../../../services/api/Image api/image-api.service';
import { ContractorApiService } from '../../../../services/api/Contractor api/contractor-api.service';
import { ContractorDetails } from '../../../../models/contractorDetails.model';

@Component({
  selector: 'app-timeline-details-dialog',
  imports: [DialogModule, CommonModule],
  templateUrl: './timeline-details-dialog.component.html',
  styles: ``
})
export class TimelineDetailsDialogComponent extends DialogComponent{
  task: MaintenanceTask | undefined;
  imageUrl: string | undefined = undefined;
  contractor: ContractorDetails | undefined;

  constructor(private imageService: ImageApiService, private contractorService: ContractorApiService){
    super();
  }

  override openDialog(task?: MaintenanceTask): void {
    this.task = task;
    this.getImages();
    this.getContractor();
    super.openDialog();
  }

  override closeDialog(): void {
    this.task = undefined;
    super.closeDialog();
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
    const contractorId = this.task?.c_uuid;
    console.log(contractorId);
    if (typeof contractorId === 'string') {
      this.contractor = await this.contractorService.getContractorById(contractorId).toPromise();
    } else {
      this.contractor = undefined;
    }
  }
}
