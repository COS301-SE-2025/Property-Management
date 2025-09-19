import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService, InventoryItemApiService, getCookieValue, MaintenanceTask } from 'shared';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-contractor-inventory-request',
  templateUrl: './contractor-inventory-request.component.html',
  styleUrls: ['./contractor-inventory-request.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class ContractorInventoryRequestComponent implements OnInit {
  form: FormGroup;
  availableItems: any[] = [];
  assignedTasks: MaintenanceTask[] = [];
  loading = false;
  error: string | null = null;
  itemControls: { selected: FormControl, quantity: FormControl }[] = [];


  constructor(
    private fb: FormBuilder,
    private api: ApiService, 
    private inventoryItemApi: InventoryItemApiService,
    private router: Router
  ) {
    this.form = this.fb.group({
      taskUuid: ['', Validators.required]
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

    this.form.get('taskUuid')?.valueChanges.subscribe(selectedUuid => {
      const task = this.assignedTasks.find(t => t.uuid === selectedUuid);
      if (task) {
        this.inventoryItemApi.getInventoryItemsByBuilding(task.buuid).subscribe({
          next: (items) => {
            this.availableItems = items;
            this.itemControls = items.map(() => ({
              selected: new FormControl(false),
              quantity: new FormControl(1, [Validators.min(1)])
            }));
          },
          error: () => {
            this.error = 'Failed to load inventory items';
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const contractorId = getCookieValue(document.cookie, 'contractorId');
    const requests = this.availableItems
      .map((item, i) => ({
        itemUuid: item.itemUuid,
        quantity: this.itemControls[i].quantity.value,
        selected: this.itemControls[i].selected.value
      }))
      .filter(r => r.selected && r.quantity > 0);

    const taskUuid = this.form.value.taskUuid;
    const apiCalls = requests.map(r =>
      this.api.createInventoryUsage({
        itemUuid: r.itemUuid,
        taskUuid,
        usedByContractorUuid: contractorId,
        quantityUsed: r.quantity
      })
    );

    forkJoin(apiCalls).subscribe({
      next: () => {
        this.router.navigate(['/contractorHome']);
      },
      error: () => {
        this.error = 'Failed to submit inventory requests';
        this.loading = false;
      }
    });
  }
}