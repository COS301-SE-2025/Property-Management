import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  uuid: string;
  name: string;
  contractor: Contractor;
}

interface Contractor {
  uuid: string;
  name: string;
}

interface Rating {
  uuid: string;
  task: Task;
  contractor: Contractor;
  rating: number;
  comment: string;
  date: string;
}

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ratings-page.component.html'
})
export class RatingsComponent implements OnInit {

  tasks: Task[] = [];
  ratingsHistory: Rating[] = [];
  selectedTaskUuid: string = '';
  selectedRating: number = 5;
  comment: string = '';

  ngOnInit(): void {

    this.tasks = [
      { uuid: 'task-1', name: 'Fix Plumbing', contractor: { uuid: 'contractor-1', name: 'John M.' } },
      { uuid: 'task-2', name: 'Paint Fence', contractor: { uuid: 'contractor-2', name: 'Sarah K.' } }
    ];

    this.ratingsHistory = [
      {
        uuid: 'rating-1',
        task: { uuid: 'task-1', name: 'Fix Plumbing', contractor: { uuid: 'contractor-1', name: 'John M.' } },
        contractor: { uuid: 'contractor-1', name: 'John M.' },
        rating: 9,
        comment: 'Quick & professional',
        date: '2025-07-20'
      },
      {
        uuid: 'rating-2',
        task: { uuid: 'task-2', name: 'Paint Fence', contractor: { uuid: 'contractor-2', name: 'Sarah K.' } },
        contractor: { uuid: 'contractor-2', name: 'Sarah K.' },
        rating: 7,
        comment: 'Good but took long',
        date: '2025-07-15'
      }
    ];
  }

  get selectedTask(): Task | undefined {
    return this.tasks.find(t => t.uuid === this.selectedTaskUuid);
  }

  submitRating() {
    if (!this.selectedTask) return;
    const newRating: Rating = {
      uuid: 'rating-' + (this.ratingsHistory.length + 1),
      task: this.selectedTask,
      contractor: this.selectedTask.contractor,
      rating: this.selectedRating,
      comment: this.comment,
      date: new Date().toISOString().slice(0, 10)
    };
    this.ratingsHistory.unshift(newRating);

    this.selectedTaskUuid = '';
    this.selectedRating = 5;
    this.comment = '';
  }
}