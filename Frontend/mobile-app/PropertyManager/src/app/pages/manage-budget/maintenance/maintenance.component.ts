import { Component, inject, input, OnInit, signal } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";
import { TableModule } from 'primeng/table';
import { EditBudgetComponent } from '../edit-budget/edit-budget.component';
import { BuildingDetails, FormatAmountPipe, HousesService, MaintenanceTask, FormatDatePipe, TaskApiService, ContractorApiService } from "shared";
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

interface TaskAndQuote extends MaintenanceTask{
  amount?: number;
  doneBy?: string;
  submitted_on?: Date;
} 
@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styles: ``,
  imports: [IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, TableModule, FormatAmountPipe, EditBudgetComponent, FormatDatePipe],
  providers: [MessageService]
})
export class MaintenanceComponent implements OnInit {

  houseService = inject(HousesService);

  maintenance = input.required<MaintenanceTask[]>();
  budget = input.required<BuildingDetails>();
  completedTasks = signal<TaskAndQuote[]>([]);

  constructor(private taskService: TaskApiService, private router: Router, private messageService: MessageService, private contractorService: ContractorApiService){}

  async ngOnInit()
  {
    this.maintenance().forEach(m => {
    if(m.approvalStatus === 'COMPLETED' || m.status === 'done')
    {
      this.completedTasks.set([...this.completedTasks(), m]);
    }
   });

   this.completedTasks().forEach(c => {
    this.taskService.getQuoteFromTaskId(c.uuid).subscribe({
      next: (res) => {
        res.forEach(q => {
          if(q.status === 'APPROVED')
          {
            c.amount = q.amount;
            c.submitted_on = new Date(q.submitted_on);

            this.contractorService.getContractorById(q.c_uuid).subscribe({
              next: (contractor) => {
                c.doneBy = contractor.name
              }
            })
          }
        });
      },
      error: (err) => {
        console.error("Error getting previous tasks", err)
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to get previous work done',
        });
      }
    })
   })
  }

 showMaintenanceDetailsDialog(maintenance: MaintenanceTask | MaintenanceTask[] | undefined): void {
    if(!maintenance || Array.isArray(maintenance)){
      console.error("Invalid maintenance data");
      return;
    }
    this.router.navigate(['/taskDetails', maintenance.uuid]);
  }
  getMaintenanceTotal(): number {
    let total = 0;
    this.completedTasks().forEach((item) => {
      total += item.amount!;
    });
    return total;
  }
}
