import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InventoryItemApiService } from 'shared';
import { InventoryUsageApiService } from 'shared';
import { getCookieValue } from 'shared';

@Component({
  selector: 'app-inventory-approval-dialog',
  imports: [DialogModule, ButtonModule, CommonModule, ToastModule],
  template: `
    <p-toast></p-toast>
    <p-dialog 
      header="Inventory Request Approval" 
      [visible]="visible" 
      [modal]="true"
      [style]="{ width: '450px' }"
      (onHide)="closeDialog()">
      
      <div class="p-4">
        <div class="mb-4">
          <h4 class="text-lg font-semibold mb-2">Request Details</h4>
          <div class="space-y-2">
            <p><strong>Item:</strong> {{ requestData?.name }}</p>
            <p><strong>Quantity:</strong> {{ requestData?.quantity }}</p>
            <p><strong>Price per item:</strong> R{{ requestData?.price }}</p>
            <p><strong>Total Cost:</strong> R{{ requestData?.totalCost }}</p>
            <p><strong>Building ID:</strong> {{ requestData?.buildingId }}</p>
          </div>
        </div>

        <div class="mb-6">
          <p class="text-sm text-gray-600">
            Do you want to approve this inventory addition request?
          </p>
        </div>

        <div class="flex justify-end space-x-3">
          <button 
            type="button" 
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50" 
            (click)="decline()"
            [disabled]="processing">
            {{ processing && action === 'decline' ? 'Processing...' : 'Decline' }}
          </button>
          <button 
            type="button" 
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50" 
            (click)="approve()"
            [disabled]="processing">
            {{ processing && action === 'approve' ? 'Processing...' : 'Approve' }}
          </button>
        </div>
      </div>
    </p-dialog>
  `,
  providers: [MessageService],
  standalone: true
})
export class InventoryApprovalDialogComponent {
  @Input() visible: boolean = false;
  @Input() requestData: any = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() requestProcessed = new EventEmitter<void>();

  processing = false;
  action = '';

  constructor(
    private inventoryItemApiService: InventoryItemApiService,
    private inventoryUsageApiService: InventoryUsageApiService,
    private messageService: MessageService
  ) {}

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.processing = false;
    this.action = '';
  }

  approve() {
    if (!this.requestData) return;
    
    this.processing = true;
    this.action = 'approve';

    // Step 1: Update inventory item from PENDING to normal
    this.inventoryItemApiService.updateInventoryItemStatus(
      this.requestData.inventoryItemUuid, 
      'normal'
    ).subscribe({
      next: () => {
        // Step 2: Create inventory usage record
        this.createInventoryUsage();
      },
      error: (err) => {
        console.error('Failed to update inventory item status:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to approve inventory item'
        });
        this.processing = false;
      }
    });
  }

  private createInventoryUsage() {
    const inventoryUsage = {
      itemUuid: this.requestData.inventoryItemUuid,
      taskUuid: null, // Set if you have a related task
      contractorUuid: this.requestData.contractorId,
      quantityUsed: this.requestData.quantity,
      trusteeApproval: true,
      approvedDate: new Date()
    };

    // Note: You'll need to add this method to your InventoryUsageApiService
    this.inventoryUsageApiService.createInventoryUsageWithApproval(inventoryUsage).subscribe({
      next: (usage) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Approved',
          detail: 'Inventory request approved successfully'
        });
        this.requestProcessed.emit();
        this.closeDialog();
      },
      error: (err) => {
        console.error('Failed to create inventory usage:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create usage record'
        });
        this.processing = false;
      }
    });
  }

  decline() {
    if (!this.requestData) return;
    
    this.processing = true;
    this.action = 'decline';

    // Delete the pending inventory item
    this.inventoryItemApiService.deleteInventoryItem(this.requestData.inventoryItemUuid).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Declined',
          detail: 'Inventory request declined and removed'
        });
        this.requestProcessed.emit();
        this.closeDialog();
      },
      error: (err) => {
        console.error('Failed to delete inventory item:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to decline request'
        });
        this.processing = false;
      }
    });
  }
}