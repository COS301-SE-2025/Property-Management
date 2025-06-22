import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-step-three',
  standalone: true,
  template: `
    <div class="profile-container">
      <div class="profile-card">
        <h2 class="profile-title">Project History</h2>
        <textarea class="profile-textarea" placeholder="Provide a brief description of past projects"></textarea>
        <div class="profile-upload-group">
          <label for="projDocs" class="profile-upload-label">
            <img src="https://img.icons8.com/ios/50/copy.png" class="profile-upload-icon" />
            Attach Project Records
          </label>
          <input type="file" hidden id="projDocs" />
        </div>
        <div class="profile-upload-group">
          <label for="projImgs" class="profile-upload-label">
            <img src="https://img.icons8.com/ios/50/image.png" class="profile-upload-icon" />
            Attach Project Images
          </label>
          <input type="file" hidden id="projImgs" />
        </div>
        <div class="profile-actions">
          <button type="button" class="profile-btn-yellow" (click)="back.emit()">Back</button>
          <button type="button" class="profile-btn-yellow" (click)="done.emit()">Done</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
.profile-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 60vh;
  margin-top: -2rem;
  margin-bottom: -2rem;
  margin-left: 8rem;
  width: 150%;
}
.profile-card {
  background: #fff;
  border: 1.5px solid #bbb;
  border-radius: 12px;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  max-width: 600px;
  width: 100%;
  margin-top: 0rem;
  box-sizing: border-box;
}
.profile-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}
.profile-textarea {
  width: 100%;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  padding: 1.25rem;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #444;
  background: #fafafa;
  resize: none;
}
.profile-upload-group {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.profile-upload-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1.5px solid #bbb;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  color: #888;
  background: #fff;
  width: 100%;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-weight: 500;
}
.profile-upload-icon {
  width: 1.5rem;
  height: 1.5rem;
  opacity: 0.7;
}
.profile-upload-btn {
  font-size: 0.95rem;
  color: #888;
  background: #fafafa;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.25rem 1.25rem;
  margin-left: 0.25rem;
  margin-top: 0.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.profile-upload-btn:hover {
  background: #f3f3f3;
}
.profile-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2.5rem;
}
.profile-btn-yellow {
  padding: 0.5rem 2rem;
  border-radius: 6px;
  background-color: #ffd74b;
  color: black;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  border: none;
  font-size: 1.1rem;
  transition: background 0.2s;
}
.profile-btn-yellow:hover {
  background-color: #facc15;
}
  `]
})
export class StepThreeComponent {
  @Output() back = new EventEmitter<void>();
  @Output() done = new EventEmitter<void>();
}