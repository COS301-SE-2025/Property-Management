import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from './step-one.component';
import { StepTwoComponent } from './step-two.component';
import { StepThreeComponent } from './step-three.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-contractor-profile',
  standalone: true,
  imports: [CommonModule, StepOneComponent, StepTwoComponent, StepThreeComponent, HeaderComponent],
  template: `
    <app-header />

    <div class="px-10 py-8">
      <h2 class="text-2xl font-bold mb-2">Contractor Profile</h2>
      <div class="h-1 w-64 bg-yellow-400 mb-6"></div>

       <div class="flex justify-center mb-8 space-x-4">
          <span class="w-4 h-4 rounded-full"
                [ngClass]="{ 'bg-yellow-400': step === 1, 'bg-gray-300': step !== 1 }"></span>
          <span class="w-4 h-4 rounded-full"
                [ngClass]="{ 'bg-yellow-400': step === 2, 'bg-gray-300': step !== 2 }"></span>
          <span class="w-4 h-4 rounded-full"
                [ngClass]="{ 'bg-yellow-400': step === 3, 'bg-gray-300': step !== 3 }"></span>
        </div>
      <div class="border rounded-lg p-12 shadow-sm bg-white max-w-6xl mx-auto">
        <!-- Step Indicator -->
       

        <!-- Grid Layout: Left = Form | Right = Upload -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ng-container [ngSwitch]="step">
              <app-step-one *ngSwitchCase="1" (next)="step = 2"></app-step-one>
              <app-step-two *ngSwitchCase="2" (next)="step = 3" (back)="step = 1"></app-step-two>
              <app-step-three *ngSwitchCase="3" (back)="step = 2" (done)="submitProfile()"></app-step-three>
            </ng-container>
          </div>

<div *ngIf="step === 1" class="flex flex-col items-center justify-start gap-4 py-14">
  <div class="w-72 h-48 rounded-xl bg-gray-100 border flex items-center justify-center shadow-sm">
    <img src="https://img.icons8.com/ios/50/image.png" alt="upload icon" class="w-16 h-16 opacity-50" />
  </div>
  <input #fileInput type="file" hidden (change)="onFileSelected($event)" />
  <button
    type="button"
    class="text-xs px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow"
    (click)="fileInput.click()"
  >
    Upload Image
  </button>
</div>


        </div>
      </div>
    </div>
  `,
  styleUrls: ['./contractor-profile.component.scss']
})


export class ContractorProfileComponent {
  step = 1;

  submitProfile() {
    console.log('Contractor profile setup complete!');
  }

  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files && input.files[0];
  if (file) {
    console.log('Selected file:', file.name);
  }
}
}