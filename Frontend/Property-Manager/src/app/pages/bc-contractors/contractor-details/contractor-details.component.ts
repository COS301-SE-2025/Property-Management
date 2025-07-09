import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { BodyCoporateService } from '../../../services/body-coporate.service';
// import { TaskDialogComponent } from '../../task-dialog/task-dialog.component';
// import { MaintenanceTask } from '../../../models/maintenanceTask.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { ContractorDetails } from '../../../models/contractorDetails.model';
import { FormatPhoneNumberPipe } from "../../../pipes/format-phone-number.pipe";
import { firstValueFrom } from 'rxjs';
import { getCookieValue } from '../../../../utils/cookie-utils';
import { ContractorApiService } from '../../../services/api/Contractor api/contractor-api.service';
import { ImageApiService } from '../../../services/api/Image api/image-api.service';

@Component({
  selector: 'app-contractor-details',
  imports: [CommonModule, TableModule, ListboxModule, HeaderComponent, FormatPhoneNumberPipe],
  templateUrl: './contractor-details.component.html',
  styles: ``
})
export class ContractorDetailsComponent implements OnInit{

  bodyCoporateService = inject(BodyCoporateService);
  contractorService = inject(ContractorApiService);
  imageService = inject(ImageApiService);

  contractorDetails = this.bodyCoporateService.contractorDetails;
  currentContractor = signal<ContractorDetails | null>(null);

  // maintenanceTasks = this.bodyCoporateService.pendingTasks();

  public publicContractor = true;

  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
      const source = this.route.snapshot.paramMap.get('source');
      this.publicContractor = source === 'public';

      const contractorId = this.route.snapshot.paramMap.get('contractorId');
      console.log(contractorId);

      const foundContractor = this.contractorDetails().find(c => c.uuid === contractorId);

      if(foundContractor)
      {
        this.currentContractor.set(foundContractor);
      }
      else{
        this.contractorService.getContractorById(contractorId!).subscribe(contractor => {
          console.log(contractor);

          if (contractor) {
            this.imageService.getImage(contractor.img ?? '').subscribe(i => {
              this.currentContractor.set(contractor);
              const curr = this.currentContractor();
              if (curr) {
                curr.img = i;
                this.currentContractor.set(curr);
              }
            })
          }
        });
      }
  }

  // @ViewChild('taskDialog') taskDialog!: TaskDialogComponent;

  // getLengthOfTasks(): number
  // {
  //   return this.maintenanceTasks.length;
  // }

  // openTaskDialog(task: MaintenanceTask): void
  // {
  //   this.taskDialog.openDialog(task);
  // }

  makePublicContractor(): void{
    this.publicContractor = true;
  }
  
  async makeTrustedContractor(){
    this.publicContractor = false;
    
    const contractor = this.currentContractor();

    if (contractor !== null) 
    {
      const bcId = getCookieValue(document.cookie, 'bodyCoporateId');
      contractor.corporate_uuid = bcId;
      console.log(contractor);

      await firstValueFrom(this.bodyCoporateService.updateContractor(contractor))
      this.router.navigate(['bodyCoporate/contractors']).then(() => {
        window.location.reload();
      });
    }
  }
}
