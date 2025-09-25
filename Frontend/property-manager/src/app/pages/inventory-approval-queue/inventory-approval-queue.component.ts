import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'shared';

@Component({
  selector: 'app-inventory-approval-queue',
  templateUrl: './inventory-approval-queue.component.html',
//   styleUrls: ['./inventory-approval-queue.component.scss']
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class InventoryApprovalQueueComponent implements OnInit {
  pendingRequests: any[] = [];
  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loading = true;
    this.api.getPendingInventoryUsage().subscribe({
      next: (requests) => {
        this.pendingRequests = requests;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  approve(request: any) {
    this.api.approveInventoryUsage(request.usageUuid, true).subscribe(() => {
      this.pendingRequests = this.pendingRequests.filter(r => r.usageUuid !== request.usageUuid);
    });
  }

  reject(request: any) {
    this.api.approveInventoryUsage(request.usageUuid, false).subscribe(() => {
      this.pendingRequests = this.pendingRequests.filter(r => r.usageUuid !== request.usageUuid);
    });
  }
}