import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-step-three',
  standalone: true,
  template: `
    <div class="card">
      <h4>Project History</h4>
      <textarea placeholder="Provide a brief description of past projects"></textarea>

      <input type="file" hidden id="projDocs" />
      <label for="projDocs">Attach Project Records</label>

      <input type="file" hidden id="projImgs" />
      <label for="projImgs">Attach Project Images</label>

      <div class="actions">
        <button (click)="back.emit()">Back</button>
        <button class="next" (click)="done.emit()">Done</button>
      </div>
    </div>
  `
})
export class StepThreeComponent {
  @Output() back = new EventEmitter<void>();
  @Output() done = new EventEmitter<void>();
}
