import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { ApiService, getCookieValue } from 'shared';
import { catchError, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { MaintenanceTask } from 'shared';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-contractor-home',
    imports: [CardModule, ProgressSpinnerModule, ButtonModule, RouterLink, CommonModule],
    standalone: true,
    templateUrl: `./contractorHome.component.html`,
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
export class ContractorHomeComponent implements OnInit {
  tasks: MaintenanceTask[] = [];
  contractorId = getCookieValue(document.cookie, 'contractorId');
  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    
    if (!this.contractorId) {
      console.warn('Contractor ID not found.');
      this.loading = false;
      return;
    }

    this.api.getContractorMaintenanceTasks(this.contractorId).subscribe({
      next: (tasks) => {
        if (tasks.length === 0) {
          this.tasks = [];
          this.loading = false;
          return;
        }
      
        const taskRequests = tasks.map(task => {
          task.uuid = task.taskUuid!;
          const mappedTask = {
            ...task,
            des: task['description'] || task.des 
          };
          if (task.imageUuid) {
            return this.api.getPresignedImageUrl(task.imageUuid).pipe(
              map(imageUrl => ({
                ...mappedTask,
                img: imageUrl || 'assets/images/no_image.png'
              })),
              catchError(() => of({
                ...mappedTask,
                img: 'assets/images/no_image.png'
              }))
            );
          } else {
            return of({
              ...mappedTask,
              img: 'assets/images/no_image.png'
            });
          }
        });

        forkJoin(taskRequests).subscribe({
          next: (taskList) => {
            this.tasks = taskList;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error processing tasks:', err);
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Failed to load tasks', err);
        this.loading = false;
      }
    });
  }
}