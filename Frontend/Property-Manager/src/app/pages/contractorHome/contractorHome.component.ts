import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink} from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { ApiService } from '../../services/api.service';
import { catchError, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { MaintenanceTask } from '../../models/maintenanceTask.model';

@Component({
    selector: 'app-contractor-home',
    imports: [CardModule, ButtonModule, RouterLink, HeaderComponent, CommonModule],
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

export class ContractorHomeComponent implements OnInit{
   
  tasks: MaintenanceTask[] = [];
  contractorId = localStorage.getItem('contractorID');
  constructor(private api: ApiService) {}

  ngOnInit() {

    if (!this.contractorId) {
      console.warn('Contractor ID not found in localStorage.');
      return;
    }

    this.api.getMaintenanceTasks().subscribe({
      next: (tasks) => {
        
        const filteredTasks = tasks.filter(task => 
          task.c_uuid === this.contractorId
        );

        if (filteredTasks.length === 0) {
          this.tasks = []; 
          return;
        }

        const taskRequests = filteredTasks.map(task => {
          if (task.img) {
            return this.api.getPresignedImageUrl(task.img).pipe(
            map(imageUrl => ({
              ...task,
              img: imageUrl || 'assets/images/default.jpg'
            })),
            catchError(() => of({
              ...task,
              img: 'assets/images/default.jpg'
            }))
          );
          } else {
            return of({
              ...task,
              img: 'assets/images/default.jpg'
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
