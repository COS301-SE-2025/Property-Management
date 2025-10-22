import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { 
  IonContent, 
  IonCard,
  IonImg,
  IonIcon
} from '@ionic/angular/standalone';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { HeaderComponent } from "../../components/header/header.component";
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { ApiService, StorageService } from 'shared';
import { catchError, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { MaintenanceTask } from 'shared';
import { addIcons } from 'ionicons';
import { folderOpenOutline } from 'ionicons/icons';
import { ProgressSpinnerModule } from "primeng/progressspinner";

@Component({
  selector: 'app-contractor-assigned-projects',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonCard,
    IonImg,
    IonIcon,
    HeaderComponent,
    TabComponent,
    ProgressSpinnerModule
],
  templateUrl: './assigned.component.html',
  styles: `
    .no-tasks-icon {
      opacity: 0.6;
      width: 6rem;
      height: 6rem;
    }
    .project-card {
      width: 10rem;
      height: 15rem;
      margin: 0;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      border-radius: 0.75rem;
      overflow: hidden;
    }
    .project-image {
      height: 10rem;
      object-fit: cover;
    }
  `,
  animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class AssignedComponent implements OnInit {
  tasks: MaintenanceTask[] = [];
  contractorId: string | null = null;
  private storage = inject(StorageService);
  private router = inject(Router);
  loading = true;

  constructor(private api: ApiService) {
    addIcons({ folderOpenOutline });
  }

  async ngOnInit() {
    this.loading = true;
    this.contractorId = await this.storage.get('contractorId');
    if (!this.contractorId) {
      console.warn('Contractor ID not found in storage.');
      return;
    }

    this.api.getMaintenanceTasks().subscribe({
      next: (tasks) => {
        const filteredTasks = tasks.filter(task => 
          task['cuuid'] === this.contractorId
        );

        if(filteredTasks.length === 0)
        {
          this.loading = false;
          return;
        }

        const taskRequests = filteredTasks.map(task => {
          const taskWithDefault = {
            ...task,
            img: 'assets/images/no_image.png'
          };

          if (task.img) {
            return this.api.getPresignedImageUrl(task.img).pipe(
              map(imageUrl => ({
                ...task,
                img: imageUrl
              })),
              catchError(() => of(taskWithDefault))
            );
          }
          return of(taskWithDefault);
        });

        forkJoin(taskRequests).subscribe(taskList => {
          this.tasks = taskList;
          this.loading = false;
        });
      },
      error: err => console.error('Failed to load tasks', err)
    });
  }

  handleImageError(task: MaintenanceTask) {
    task.img = 'assets/images/no_image.png';
  }

  goToQuotationPage(task: MaintenanceTask) {
    //console.log(task);
    this.router.navigate(['/view-task', task['uuid']]);
  }
}