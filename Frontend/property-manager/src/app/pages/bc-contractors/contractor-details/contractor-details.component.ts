import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BodyCoporateService } from 'shared';
// import { TaskDialogComponent } from '../../task-dialog/task-dialog.component';
// import { MaintenanceTask } from '../../../models/maintenanceTask.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { ContractorDetails } from 'shared';
import { FormatPhoneNumberPipe } from "shared";
import { getCookieValue } from 'shared';
import { ContractorApiService } from 'shared';
import { ImageApiService } from 'shared';

@Component({
  selector: 'app-contractor-details',
  imports: [CommonModule, TableModule, ListboxModule, HeaderComponent, FormatPhoneNumberPipe, ToastModule],
  templateUrl: './contractor-details.component.html',
  styles: ``,
  providers: [MessageService]
})
export class ContractorDetailsComponent implements OnInit{

  bodyCoporateService = inject(BodyCoporateService);
  contractorService = inject(ContractorApiService);
  imageService = inject(ImageApiService);

  contractorDetails = this.bodyCoporateService.contractorDetails;
  currentContractor = signal<ContractorDetails | null>(null);

  // maintenanceTasks = this.bodyCoporateService.pendingTasks();

  public publicContractor = true;

  constructor(private route: ActivatedRoute, private router: Router, private messageService: MessageService){}

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

      this.bodyCoporateService.updateContractor(contractor).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Contractor succesfully added'
          });
          setTimeout(() => {
            this.router.navigate(['bodyCoporate/contractors']).then(() => {
              window.location.reload();
            });
          }, 2500);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add contractor, please try again'
          })
        }
      });
    }
  }
}
