import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, getCookieValue, MaintenanceTask } from 'shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contractor-inventory-request',
  templateUrl: './contractor-inventory-request.component.html',
  styleUrls: ['./contractor-inventory-request.component.scss']
})
export class ContractorInventoryRequestComponent implements OnInit {
  form: FormGroup;
  availableItems: any[] = [];
  assignedTasks: MaintenanceTask[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.form = this.fb.group({
      taskUuid: ['', Validators.required],
      itemUuid: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.loading = true;
    const contractorId = getCookieValue(document.cookie, 'contractorId');
    this.api.getContractorMaintenanceTasks(contractorId).subscribe({
      next: (tasks: MaintenanceTask[]) => {
        this.assignedTasks = tasks;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load tasks';
        this.loading = false;
      }
    });

    this.form.get('taskUuid')?.valueChanges.subscribe(taskUuid => {
      const task = this.assignedTasks.find(t => t.taskUuid === taskUuid);
      if (task) {
        this.api.getInventoryByBuilding(task['b_uuid']).subscribe({
          next: (items) => {

            this.availableItems = items;
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const contractorId = getCookieValue(document.cookie, 'contractorId');
    this.api.createInventoryUsage({
      itemUuid: this.form.value.itemUuid,
      taskUuid: this.form.value.taskUuid,
      usedByContractorUuid: contractorId,
      quantityUsed: this.form.value.quantity
    }).subscribe({
      next: () => {
        this.router.navigate(['/contractorHome']);
      },
      error: () => {
        this.error = 'Failed to submit inventory request';
        this.loading = false;
      }
    });
  }
}