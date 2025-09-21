import { Component, inject, input, OnInit, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { getCookieValue, HousesService, FormatDatePipe } from 'shared';
import { CommonModule } from '@angular/common';
import { TimelineAddDialogComponent } from './timeline-add-dialog/timeline-add-dialog.component';
import { MaintenanceTask } from 'shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline-card',
  imports: [CardModule, TimelineModule, CommonModule, TimelineAddDialogComponent, FormatDatePipe],
  templateUrl: './timeline-card.component.html',
  styles: `
    .due-date-normal {
      color: #374151;
    }
    .due-date-urgent {
      color: #dc2626;
      font-weight: bold;
    }
    .due-date-past {
      color: #9ca3af; 
      text-decoration: line-through;
    }
    
    .dark .due-date-normal {
      color: #e5e7eb; 
    }
    .dark .due-date-past {
      color: #6b7280;
    }
  `
})
export class TimelineCardComponent implements OnInit {
  houseService = inject(HousesService);
  timeline = input.required<MaintenanceTask[]>();
  bcUser = false;
  public darkMode = false;

  count = 3;

  constructor(private router: Router){}

  ngOnInit()
  {
    this.bcUser = false;
    if(getCookieValue(document.cookie, 'bodyCoporateId'))
    {
      this.bcUser = true;
    }

    this.darkMode = localStorage.getItem('darkMode') === 'true';
  }

  get visibleTasks(): MaintenanceTask[]{
    return this.timeline().slice(0, this.count);
  }

  toggleShow(){
    if(this.count >= this.timeline().length)
    {
      this.count = 3;
    }
    else
    {
      this.count = Math.min(this.count + 3, this.timeline().length);
    }
  }

  get toggleButton(): string
  {
    return this.count >= this.timeline().length ? 'Show Less' : 'Show More';
  }

  showDetails(task: MaintenanceTask)
  {
    this.router.navigate(['taskDetails', task.uuid])
  }
  changeDueDate(task: MaintenanceTask)
  {
    if(!task?.scheduled_date) return 'due-date-normal';

    if(task!.scheduled_date < new Date()) return 'due-date-past';

    const date = new Date();
    const taskDate = new Date(task!.scheduled_date);

    date.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);

    const twoFromNow = new Date();
    twoFromNow.setDate(date.getDate() + 2);

    if(taskDate <= twoFromNow)
    {
      return 'due-date-urgent';
    }
    return 'due-date-normal';
  }
}
