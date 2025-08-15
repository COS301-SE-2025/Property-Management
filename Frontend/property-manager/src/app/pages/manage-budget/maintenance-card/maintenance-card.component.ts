import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ContractorApiService, FormatAmountPipe, FormatDatePipe, TaskApiService } from "shared";
import { EditBudgetDialogComponent } from "../edit-budget-dialog/edit-budget-dialog.component";
import { MaintenanceTask } from 'shared';
import { BuildingDetails } from 'shared';
import { HousesService } from 'shared';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";


interface TaskAndQuote extends MaintenanceTask{
  amount?: number;
  doneBy?: string;
  submitted_on?: Date;
} 

@Component({
  selector: 'app-maintenance-card',
  imports: [CardModule, TableModule, FormatAmountPipe, EditBudgetDialogComponent, FormatDatePipe, Toast],
  providers: [MessageService],
  templateUrl: './maintenance-card.component.html',
  styles: ``
})
export class MaintenanceCardComponent implements OnInit{
  houseService = inject(HousesService);

  maintenance = input.required<MaintenanceTask[]>();
  budget = input.required<BuildingDetails>();
  completedTasks = signal<TaskAndQuote[]>([]);

  constructor(private taskService: TaskApiService, private router: Router, private messageService: MessageService, private contractorService: ContractorApiService){}

  async ngOnInit()
  {
   this.maintenance().forEach(m => {
    if(m.approvalStatus === 'COMPLETED')
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
            c.submitted_on = q.submitted_on;

            this.contractorService.getContractorById(q.c_uuid).subscribe({
              next: (contractor) => {
                c.doneBy = contractor.name
              }
            })
          }
        });
        console.log(this.completedTasks());
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
    console.log("Inside show details", maintenance);

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
