import { Component } from '@angular/core';

@Component({
  selector: 'app-contractor-profile',
  standalone: true,
  imports: [],
  template: `
    <div class="wrapper">
      <h2>Contractor Profile</h2>
      <div class="step-indicator">
        <span [class.active]="step === 1"></span>
        <span [class.active]="step === 2"></span>
        <span [class.active]="step === 3"></span>
      </div>

      <ng-container [ngSwitch]="step">
        <app-step-one *ngSwitchCase="1" (next)="step = 2"></app-step-one>
        <app-step-two *ngSwitchCase="2" (next)="step = 3" (back)="step = 1"></app-step-two>
        <app-step-three *ngSwitchCase="3" (back)="step = 2" (done)="submitProfile()"></app-step-three>
      </ng-container>
    </div>
  `,
  styleUrls: ['./contractor-profile.component.scss']
})
export class ContractorProfileComponent {
  step = 1;

  submitProfile() {
    console.log('Contractor profile setup complete!');

  }
}
