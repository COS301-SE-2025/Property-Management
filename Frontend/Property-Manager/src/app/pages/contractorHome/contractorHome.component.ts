import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../components/header/header.component';
import { ApiService } from '../../services/api.service';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-contractor-home',
  standalone: true,
  imports: [CardModule, ButtonModule, RouterLink, HeaderComponent, CommonModule],
  templateUrl: './contractorHome.component.html',
  styles: ``,
  animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ContractorHomeComponent implements OnInit {
  tasks: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getMaintenanceTasks().subscribe({
      next: (tasks) => {
        const taskRequests = tasks.map(task => {
          if (task.imageKey) {
            return this.api.getPresignedImageUrl(task.imageKey).pipe(
              map(res => ({
                ...task,
                imageUrl: res.url
              }))
            );
          } else {
            return of({
              ...task,
              imageUrl: 'assets/images/default.jpg'
            });
          }
        });

        forkJoin(taskRequests).subscribe(taskList => {
          this.tasks = taskList;
        });
      },
      error: err => console.error('Failed to load tasks', err)
    });
  }
}