import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropertyComponent } from './create-property.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreatePropertyComponent', () => {
  let component: CreatePropertyComponent;
  let fixture: ComponentFixture<CreatePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePropertyComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when required fields are empty', () => {
    component.form.patchValue({
      name: '',
      address: ''
    });
    expect(component.form.invalid).toBeTrue();
  });

  it('should have a valid form when required fields are filled', () => {
    component.form.patchValue({
      name: 'Test Property',
      address: '123 Main St'
    });
    expect(component.form.valid).toBeTrue();
  });

  it('should patch image value when onFileSelected is called', () => {
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const event = { target: { files: [file] } };
    component.onFileSelected(event);
    expect(component.form.value.image).toBe(file);
  });

  it('should log form value on submit if form is valid', () => {
    spyOn(console, 'log');
    component.form.patchValue({
      name: 'Test Property',
      address: '123 Main St'
    });
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith(jasmine.objectContaining({
      name: 'Test Property',
      address: '123 Main St'
    }));
  });

  it('should not log form value on submit if form is invalid', () => {
    spyOn(console, 'log');
    component.form.patchValue({
      name: '',
      address: ''
    });
    component.onSubmit();
    expect(console.log).not.toHaveBeenCalled();
  });
});