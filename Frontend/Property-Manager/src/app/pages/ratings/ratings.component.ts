import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingService, RatingPayload } from 'shared';
import { FloatLabelModule } from 'primeng/floatlabel';
import { HeaderComponent } from '../../components/header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PropertyService } from 'shared';
import { getCookieValue } from 'shared';
import { TaskApiService } from 'shared'; 
import { Rating } from '../../../../../library/projects/shared/src/models/rating.model';
import { MaintenanceTask } from '../../../../../library/projects/shared/src/models/maintenanceTask.model';


interface Task {
  uuid: string;
  name: string;
  contractor: { uuid: string; name: string };
}

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    FloatLabelModule, 
    InputTextModule, 
    FloatLabelModule,
    DropdownModule,
    ToastModule, HeaderComponent],
  templateUrl: './ratings.component.html',
  providers: [MessageService]
})
export class RatingsComponent implements OnInit {

  tasks: Task[] = [];
  ratingsHistory: Rating[] = [];
  selectedTaskUuid: string = '';
  selectedRating: number = 5;
  comment: string = '';
  trusteeUuid: string = '';

  constructor(
    private ratingService: RatingService,
    private taskApiService: TaskApiService
  ) {}

  ngOnInit(): void {
    this.trusteeUuid = getCookieValue(document.cookie, 'trusteeId') || '';
    this.loadTasks();
    this.loadRatingsHistory();
  }

    loadTasks() {
    this.taskApiService.getTasksForTrustee(this.trusteeUuid).subscribe({
      next: (tasks: MaintenanceTask[]) => {
        this.tasks = tasks.map(t => ({
          uuid: t.uuid,
          name: t.title,
          contractor: { uuid: t['cUuid'], name: t['contractorName'] ?? '' }
        }));
      },
      error: (err: unknown) => { this.tasks = []; }
    });
  }

loadRatingsHistory() {
  this.ratingService.getAllRatings().subscribe({
    next: (ratings: Rating[]) => {
      this.ratingsHistory = ratings
        .filter(r => r.trusteeUuid === this.trusteeUuid)
        .map(r => ({
          ...r,
          task: {
            uuid: r.taskUuid,
            name: r.taskName || '', // If available
            contractor: { uuid: r.contractorUuid, name: r.contractorName || '' }
          },
          contractor: { uuid: r.contractorUuid, name: r.contractorName || '' },
          date: r.createdAt ? new Date(r.createdAt).toISOString().slice(0, 10) : ''
        }));
    },
    error: (err: unknown) => { this.ratingsHistory = []; }
  });
}

  get selectedTask(): Task | undefined {
    return this.tasks.find(t => t.uuid === this.selectedTaskUuid);
  }

  submitRating() {
    if (!this.selectedTask || !this.trusteeUuid) return;
    const payload: RatingPayload = {
      contractorUuid: this.selectedTask.contractor.uuid,
      comment: this.comment,
      rating: this.selectedRating,
      taskUuid: this.selectedTask.uuid,
      trusteeUuid: this.trusteeUuid
    };
    this.ratingService.createRating(payload).subscribe({
      next: () => {
        this.loadRatingsHistory();
        this.selectedTaskUuid = '';
        this.selectedRating = 5;
        this.comment = '';
      }
    });
  }
}