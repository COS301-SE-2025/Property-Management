import { Component, input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { SliderModule } from 'primeng/slider';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodyCoporateApiService, getCookieValue } from 'shared';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-reserve-fund-dialog',
  imports: [DialogModule, CommonModule, ReactiveFormsModule, SliderModule, Toast],
  templateUrl: './reserve-fund-dialog.component.html',
  styles: ``,
  providers: [MessageService]
})
export class ReserveFundDialogComponent extends DialogComponent implements OnInit {

  form!: FormGroup;
  addError = false;
  isSubmitting = false;
  updatedContribution = 0;
  originalContribution = input.required<number>();

  constructor(private fb: FormBuilder, private bodyCorporateService: BodyCoporateApiService, private messageService: MessageService) {  
    super();
  }
  ngOnInit()
  {
    this.form = this.fb.group({
      contri: [this.originalContribution(), [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    this.updatedContribution = this.originalContribution();
  }
  override openDialog(): void {
      this.form.patchValue({
        contri: this.originalContribution()
      });
      this.updatedContribution = this.originalContribution();
      super.openDialog()
  }
  override closeDialog(): void {
    super.closeDialog();
    this.form.reset();
    this.addError = false;
    this.isSubmitting = false;
  }

  onSliderChange(event: { value?:number}) {

    if(event.value !== undefined)
    {
      this.form.get('contri')?.setValue(event.value);
    }
    console.log(this.originalContribution());
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.isSubmitting = true;
    this.addError = false;

    const bcId = getCookieValue(document.cookie, 'bodyCoporateId');

    console.log(this.form.value.contri);

    this.bodyCorporateService.updateContribution(bcId, this.form.value.contri).subscribe({
        next: () => {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Updated contribution per square meter',
            });

            this.form.reset();
            this.closeDialog();

            setTimeout(() => {
              window.location.reload();
            }, 2000);
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update contribution per square meter',
            });
        }
    });
  }
}