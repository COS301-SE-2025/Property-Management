import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ApiService, getCookieValue } from 'shared'; 
import { ActivatedRoute, Router } from '@angular/router';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { MaintenanceTask,Inventory } from 'shared';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

interface FileUploadEvent {
  files: File[];
}





@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    CommonModule,
    ToastModule,
    FileUploadModule,
    DatePickerModule,
    TableModule,
    DropdownModule
  ],
  providers: [MessageService],
  templateUrl: `./quotation.component.html`,
  styles: ``,
   animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [ 
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})

export class QuotationComponent implements OnInit{
  IssueDate = '';
  expirationDate = '';
  quoteNo = '';
  totalAmount = '';

  contractorId = ''; 
  taskId = ''; 
  type = 'pending';
  buildingUuid = '';

  // Properties to fix the template errors
  showAddButton = false;
  showPrice = true; // Set to true to show price column
  bcUser = true; // Set to true to hide actions if needed
  readOnly = false;
  isEditing = false;
  hasChanges = false;
  rows = 5;
  
  // Actual inventory data
  inventory: Inventory[] = [];

  // Properties for inventory management
  editingItems = new Map<string, boolean>();
  draftQuantities = new Map<string, number>();

  constructor(
  private messageService: MessageService,
  private apiService: ApiService,
  private route: ActivatedRoute,
  private router: Router
) {
  const storedId = getCookieValue(document.cookie, 'contractorId');
  if (storedId) {
    this.contractorId = storedId;
  } else {
    console.warn('Contractor ID not found in cookie.');
  }
}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('taskId');
      if (id) {
        this.taskId = id;
        this.loadMaintenanceTaskAndInventory();
      }
    });
    
    if (!this.taskId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No Task Provided',
        detail: 'Task UUID was not provided in the URL.'
      });
      return;
    }
  }

  loadMaintenanceTaskAndInventory(): void {
    this.apiService.getMaintenanceTasks().subscribe({
      next: (tasks: MaintenanceTask[]) => {
        const task = tasks.find(t => t.uuid === this.taskId);
        
        if (!task) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Task Not Found',
            detail: 'The specified task was not found.'
          });
          return;
        }

        // // Check if task is assigned to this contractor
        // if (task.cuuid !== this.contractorId) {
        //   this.messageService.add({
        //     severity: 'warn',
        //     summary: 'Invalid Task',
        //     detail: 'Task not assigned to this contractor.'
        //   });
        //   return;
        // }

        // Get the building UUID from the task
        this.buildingUuid = task.buuid || '';
        
        if (!this.buildingUuid) {
          this.messageService.add({
            severity: 'warn',
            summary: 'No Building Found',
            detail: 'No building associated with this task.'
          });
          return;
        }

        // Load inventory for the building
        this.loadBuildingInventory(this.buildingUuid);
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load maintenance tasks.'
        });
      }
    });
  }

  loadBuildingInventory(buildingUuid: string): void {
    this.apiService.getInventoryByBuilding(buildingUuid).subscribe({
      next: (inventory: Inventory[]) => {
        this.inventory = inventory;
        if (this.inventory.length === 0) {
          this.messageService.add({
            severity: 'info',
            summary: 'No Inventory',
            detail: 'No inventory items found for this building.'
          });
        }
      },
      error: (err) => {
        console.error('Error loading inventory:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load inventory items.'
        });
        // Fallback to empty array
        this.inventory = [];
      }
    });
  }

  submitQuote() {
    if (!this.taskId || !this.IssueDate || !this.expirationDate || !this.quoteNo || !this.totalAmount) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields and ensure task is assigned.'
      });
      return;
    }
    const submittedDate = new Date();

    this.apiService.addQuote(this.taskId, this.contractorId, submittedDate, this.type, Number(this.totalAmount), this.quoteNo).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Quote Created',
          detail: `Quote #${this.quoteNo} has been submitted.`
        });
        this.quoteNo = '';
        this.totalAmount = '';

        setTimeout(() => {
          this.router.navigate(['/contractorHome']);
        }, 1800);
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create quote.'
        });
      }
    });
  }

  async onUpload(event: FileUploadEvent) {
    const file = event.files[0]; // Assuming single file upload
    if (!file) return;
    try {
      await this.apiService.uploadPDF(file, this.contractorId, "Quote");
      this.messageService.add({
        severity: 'success',
        summary: 'Upload Complete',
        detail: `${file.name} uploaded successfully`
      });
    } catch (err) {
      console.error('PDF upload failed:', err);
      this.messageService.add({
        severity: 'error',
        summary: 'Upload Failed',
        detail: `Failed to upload ${file.name}`
      });
    }
  }

  // Inventory management methods
  preventNegative(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'e' || event.key === 'E') {
      event.preventDefault();
    }
  }

  onManualInput(inventory: Inventory, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value);
    if (!isNaN(value) && value >= 0) {
      this.draftQuantities.set(inventory.itemUuid, value);
      this.hasChanges = true;
    }
  }

  changeQuantity(inventory: Inventory, change: number) {
    const current = this.draftQuantities.get(inventory.itemUuid) || inventory.quantityInStock;
    const newValue = Math.max(0, current + change);
    this.draftQuantities.set(inventory.itemUuid, newValue);
    this.hasChanges = true;
  }

  startAction(inventory: Inventory, action: string) {
    if (action === 'edit') {
      this.editingItems.set(inventory.itemUuid, true);
      this.draftQuantities.set(inventory.itemUuid, inventory.quantityInStock);
    } else if (action === 'increase' || action === 'decrease') {
      this.editingItems.set(inventory.itemUuid, true);
      this.draftQuantities.set(inventory.itemUuid, inventory.quantityInStock);
      this.changeQuantity(inventory, action === 'increase' ? 1 : -1);
    }
    this.isEditing = true;
  }

  confirmAction() {
    //upade inventory
    this.draftQuantities.forEach((quantity, itemUuid) => {
      const item = this.inventory.find(i => i.itemUuid === itemUuid);
      if (item) {
        item.quantityInStock = quantity;
       
      }
    });
    
    this.editingItems.clear();
    this.draftQuantities.clear();
    this.isEditing = false;
    this.hasChanges = false;
    
    this.messageService.add({
      severity: 'success',
      summary: 'Inventory Updated',
      detail: 'Inventory quantities have been updated.'
    });
  }

  resetState() {
    this.editingItems.clear();
    this.draftQuantities.clear();
    this.isEditing = false;
    this.hasChanges = false;
  }
}