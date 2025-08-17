import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonContent, IonImg } from '@ionic/angular/standalone';
import { ApiService } from 'shared';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { MaintenanceTask } from 'shared';
import { catchError, forkJoin, map, of } from 'rxjs';
import { StorageService } from 'shared';

@Component({
  selector: 'app-contractor-home',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    RouterModule,
    HeaderComponent,
    TabComponent,
    IonImg
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
  private storage = inject(StorageService);
  tasks: MaintenanceTask[] = [];
  contractorId: string | null = null;

  constructor(private router: Router) {}

  async ngOnInit() {
    this.contractorId = await this.storage.get('contractorID');
    if (!this.contractorId) {
      console.warn('Contractor ID not found in storage.');
      return;
    }

  
    this.api.getContractorMaintenanceTasks(this.contractorId).subscribe({
      next: (tasks) => {
        const taskRequests = tasks.map(task => {
          const taskWithDefault = {
            ...task,
            img: 'assets/images/default.jpeg'
          };

          if (task.img) {
            return this.api.getPresignedImageUrl(task.imageUuid ?? '').pipe(
              map(imageUrl => ({
                ...task,
                img: imageUrl || 'assets/images/default.jpeg'
              })),
              catchError(() => of(taskWithDefault))
            );
          }
          return of(taskWithDefault);
        });

        forkJoin(taskRequests).subscribe(taskList => {
          this.tasks = taskList;
        });
      },
      error: err => console.error('Failed to load tasks', err)
    });
  }

  goToQuotationPage(task: MaintenanceTask) {
    this.router.navigate(['/quotation', task['taskUuid']]);
  }

  handleImageError(task: MaintenanceTask) {
    task.imageUuid = 'assets/images/default.jpeg';
  }
}