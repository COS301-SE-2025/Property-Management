import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../components/header/header.component';
import { ApiService } from '../../services/api.service';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { MaintenanceTask } from '../../models/maintenanceTask.model';
import { getCookieValue } from '../../../utils/cookie-utils';

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
  tasks: MaintenanceTask[] = [];
  contractorId = getCookieValue(document.cookie, 'contractorId');

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getMaintenanceTasks().subscribe({
      next: (tasks) => {
        console.log(tasks);
        const filteredTasks = tasks.filter(task =>
          !!task.c_uuid && task.c_uuid === this.contractorId
        );

        const taskRequests = filteredTasks.map(task => {
          if(task.img){
            return this.api.getPresignedImageUrl(task.img).pipe(
              map(imageUrl => ({
                ...task,
                img: imageUrl || 'assets/images/default.jpg'
              })) ,
              catchError(() => of({
                ...task,
                img: 'assets/images/default.jpg'
              }))
            );
          }
          else{
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