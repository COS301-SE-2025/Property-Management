import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonContent, IonItem } from '@ionic/angular/standalone';
import { ApiService, MaintenanceTask } from 'shared';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { catchError, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
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
  imports: [
    CommonModule,
    IonContent,
    IonItem,
    RouterModule,
    HeaderComponent,
    TabComponent
  ],
  templateUrl: './contractor-home.component.html',
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
  private api = inject(ApiService);
  tasks: MaintenanceTask[] = [];
  contractorId = this.api.getCookieValue('contractorId');


  ngOnInit() {
    if (!this.contractorId) {
      console.warn('Contractor ID not found in localStorage.');
      return;
    }

    this.api.getMaintenanceTasks().subscribe({
      next: (tasks) => {
        const filteredTasks = tasks.filter(task => task.c_uuid === this.contractorId);

        const taskRequests = filteredTasks.map(task =>
          task.img
            ? this.api.getPresignedImageUrl(task.img).pipe(
                map(imageUrl => ({ ...task, img: imageUrl || 'assets/images/default.jpeg' })),
                catchError(() => of({ ...task, img: 'assets/images/default.jpeg' }))
              )
            : of({ ...task, img: 'assets/images/default.jpeg' })
        );

        forkJoin(taskRequests).subscribe(taskList => {
          this.tasks = taskList;
        });
      },
      error: err => console.error('Failed to load tasks', err)
    });
  }

  goToQuotationPage(task: MaintenanceTask) {
   
     this.router.navigate(['/quotation', task.t_uuid]);
  }

  constructor(private router: Router) {}
}
