import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ForecastResponse } from 'shared';
import { BuildingApiService } from 'shared';

@Component({
  selector: 'app-inventory-forecast',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './inventory-forecast.component.html'
})
export class InventoryForecastComponent implements OnChanges {
  @Input() forecastData: ForecastResponse | null = null;
  buildingName: string | null = null;
  showMore = false;

  constructor(private buildingApiService: BuildingApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['forecastData'] && this.forecastData?.alert) {
      const buildingId = this.forecastData.alert; // this is UUID
      this.buildingApiService.getBuildingById(buildingId).subscribe({
        next: (building) => {
          this.buildingName = building.name;
        },
        error: (err) => {
          console.error('Error fetching building name:', err);
          this.buildingName = null;
        }
      });
    }
  }

  get visibleItems() {
    return this.forecastData?.items_forecasts || [];
  }

  get remainingItems() {
    return this.forecastData?.items_forecasts.slice(1) || [];
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short' });
  }
}
