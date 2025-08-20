import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { AuthService } from 'shared';
import { FormatAmountPipe } from "shared";
import { AddCostDialogComponent } from "./add-cost-dialog/add-cost-dialog.component";
import { LifecycleCostService, LifecycleCostResponse } from 'shared';

@Component({
  selector: 'app-life-cycle-card',
  imports: [CommonModule, CardModule, TableModule, FormatAmountPipe, AddCostDialogComponent],
  templateUrl: './life-cycle-card.component.html',
  styles: ``
})
export class LifeCycleCardComponent implements OnInit {

  costs = signal<LifecycleCostResponse[]>([]);
  isLoading = signal(false);
  loadError = signal(false);

  constructor(
    private authService: AuthService,
    private lifecycleCostService: LifecycleCostService
  ) {}

  ngOnInit(): void {
    this.loadCosts();
  }

  loadCosts(): void {
    const getCookieValue = (name: string): string | null => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? decodeURIComponent(match[2]) : null;
    };

    const corporateUuid = getCookieValue('bodyCoporateId');
    
    if (!corporateUuid) {
      console.error('No corporate UUID available in cookies');
      this.loadError.set(true);
      return;
    }

    this.isLoading.set(true);
    this.loadError.set(false);

    this.lifecycleCostService.getByCorporate(corporateUuid).subscribe({
      next: (costs: LifecycleCostResponse[]) => {
        this.costs.set(costs);
        this.isLoading.set(false);
      },
      error: (error: any) => {
        console.error('Error loading costs:', error);
        this.loadError.set(true);
        this.isLoading.set(false);
      }
    });
  }

  onCostAdded(): void {
    this.loadCosts();
  }

  onDeleteCost(costUuid: string): void {
    if (confirm('Are you sure you want to delete this cost?')) {
      this.lifecycleCostService.delete(costUuid).subscribe({
        next: () => {
          console.log('Cost deleted successfully');
          this.loadCosts(); 
        },
        error: (error: any) => {
          console.error('Error deleting cost:', error);
        }
      });
    }
  }
}