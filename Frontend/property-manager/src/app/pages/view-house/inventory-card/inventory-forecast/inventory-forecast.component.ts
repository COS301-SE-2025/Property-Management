import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ForecastResponse } from 'shared';

@Component({
  selector: 'app-inventory-forecast',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './inventory-forecast.component.html'
})
export class InventoryForecastComponent {
  @Input() forecastData: ForecastResponse | null = null;
  showMore = false;

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