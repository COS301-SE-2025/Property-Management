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
import { ContractorService } from 'shared';
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
    private taskApiService: TaskApiService,
    private messageService: MessageService,
    private contractorService: ContractorService 
  ) {}

  contractors: { uuid: string; name: string }[] = [];

  ngOnInit(): void {
    this.trusteeUuid = getCookieValue(document.cookie, 'trusteeId') || '';
    this.loadContractors();
    this.loadTasks();
    this.loadRatingsHistory();
  }

  loadContractors() {
    this.contractorService.getAllContractors().subscribe({
      next: (contractors: { uuid: string; name: string }[]) => {
        this.contractors = contractors.map((c: { uuid: string; name: string }) => ({ uuid: c.uuid, name: c.name }));
      }
    });
  }

  loadTasks() {
    this.taskApiService.getTasksForTrustee(this.trusteeUuid).subscribe({
      next: (tasks: MaintenanceTask[]) => {
        this.tasks = tasks.map(t => {
          const contractor = this.contractors.find(c => c.uuid === t.cuuid);
          return {
            uuid: t.uuid,
            name: t.title,
            contractor: { uuid: t.cuuid ?? '', name: contractor ? contractor.name : 'N/A' }
          };
        });
      },
      error: (err: unknown) => { this.tasks = []; }
    });
  }

  loadRatingsHistory() {
    this.ratingService.getAllRatings().subscribe({
      next: (ratings: Rating[]) => {
        this.ratingsHistory = ratings
          .filter(r => r.trusteeUuid === this.trusteeUuid)
          .map(r => {
            const task = this.tasks.find(t => t.uuid === r.taskUuid);
            const contractor = this.contractors.find(c => c.uuid === r.contractorUuid);
            return {
              ...r,
              taskName: task ? task.name : 'N/A',
              contractorName: contractor ? contractor.name : 'N/A',
              createdAt: r.createdAt ?? '' // If backend does not provide, will be blank
            };
          });
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
        this.messageService.add({
          severity: 'success',
          summary: 'Rating Submitted',
          detail: 'Your rating has been submitted successfully.'
        });
        this.loadRatingsHistory();
        this.selectedTaskUuid = '';
        this.selectedRating = 5;
        this.comment = '';
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Submission Failed',
          detail: 'Could not submit your rating. Please try again.'
        });
      }
    });
  }
}