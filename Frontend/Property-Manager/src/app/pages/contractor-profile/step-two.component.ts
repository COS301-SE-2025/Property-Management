import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-step-two',
  standalone: true,
  template: `
    <div class="card">
      <input type="text" placeholder="Registration / License Number" />
      <input type="text" placeholder="Contractor ID" />

      <h4>Description & Skills</h4>
      <textarea placeholder="Enter a brief description of your area of expertise"></textarea>

      <h4>Services</h4>
      <textarea placeholder="Enter primary services and secondary services (if any)"></textarea>

      <div class="docs">
        <input type="file" hidden id="certs" />
        <label for="certs">Attach Certifications</label>

        <input type="file" hidden id="licenses" />
        <label for="licenses">Attach Licenses</label>

        <input type="file" hidden id="ids" />
        <label for="ids">Attach ID</label>
      </div>

      <div class="actions">
        <button (click)="back.emit()">Back</button>
        <button class="next" (click)="next.emit()">Next</button>
      </div>
    </div>
  `
})
export class StepTwoComponent {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
}
