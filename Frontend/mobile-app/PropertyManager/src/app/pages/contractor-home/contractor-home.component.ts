import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonContent, IonImg } from '@ionic/angular/standalone';
import { ApiService, ImageApiService } from 'shared';
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
import { ProgressSpinnerModule } from "primeng/progressspinner";

@Component({
  selector: 'app-contractor-home',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    RouterModule,
    HeaderComponent,
    TabComponent,
    IonImg,
    ProgressSpinnerModule
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
        ], {optional: true})
      ])
    ])
  ]
})
export class ContractorHomeComponent implements OnInit {
  private api = inject(ApiService);
  private imageService = inject(ImageApiService);
  private storage = inject(StorageService);
  tasks: MaintenanceTask[] = [];
  contractorId: string | null = null;
  loading = true;

  constructor(private router: Router) {}

  async ngOnInit() {
    this.loading = true;
    this.contractorId = await this.storage.get('contractorId');
    if (!this.contractorId) {
      console.warn('Contractor ID not found in storage.');
      return;
    }
  
    this.api.getContractorMaintenanceTasks(this.contractorId).subscribe({
      next: (tasks) => {

        if(tasks.length === 0)
        {
          this.loading = false;
          return;
        }
        const taskRequests = tasks.map(task => {
          const taskWithDefault = {
            ...task,
            img: 'assets/images/no_image.png'
          };

          if(task.imageUuid)
          {
            return this.imageService.getImage(task.imageUuid).pipe(
              map(imageUrl => ({
                ...task,
                img: imageUrl
              })),
              catchError(() => of(taskWithDefault))
            );
          }
          return of(taskWithDefault)
        });
        forkJoin(taskRequests).subscribe(taskList => {
          this.tasks = taskList;
          this.loading = false;
        });
      },
      error: err => console.error('Failed to load tasks', err)
    });
  }

  goToQuotationPage(task: MaintenanceTask) {
    this.router.navigate(['/quotation', task['taskUuid']]);
  }

  handleImageError(task: MaintenanceTask) {
    task.imageUuid = 'assets/images/no_image.png';
  }
}