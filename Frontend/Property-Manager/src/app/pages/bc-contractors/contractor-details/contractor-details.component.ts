import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { BodyCoporateService } from '../../../services/body-coporate.service';
// import { TaskDialogComponent } from '../../task-dialog/task-dialog.component';
// import { MaintenanceTask } from '../../../models/maintenanceTask.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contractor-details',
  imports: [CommonModule, TableModule, ListboxModule],
  templateUrl: './contractor-details.component.html',
  styles: ``
})
export class ContractorDetailsComponent implements OnInit{

  bodyCoporateService = inject(BodyCoporateService);

  contractorDetails = this.bodyCoporateService.contractorDetails()[0]

  maintenanceTasks = this.bodyCoporateService.pendingTasks();

  public publicContractor = true;

  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
      const source = this.route.snapshot.paramMap.get('source');
      this.publicContractor = source === 'public';
  }

  // @ViewChild('taskDialog') taskDialog!: TaskDialogComponent;

  getLengthOfTasks(): number
  {
    return this.maintenanceTasks.length;
  }

  // openTaskDialog(task: MaintenanceTask): void
  // {
  //   this.taskDialog.openDialog(task);
  // }

  makePublicContractor(): void{
    this.publicContractor = true;
  }

  makeTrustedContractor(): void{
    this.publicContractor = false;

    //TODO: add contractor to trusted
    this.router.navigate(['bodyCoporate/contractors']);
  }

}
