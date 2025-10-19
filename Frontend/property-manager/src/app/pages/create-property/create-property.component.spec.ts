import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreatePropertyComponent } from './create-property.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { of } from 'rxjs'; 

describe('CreatePropertyComponent', () => {
  let component: CreatePropertyComponent;
  let fixture: ComponentFixture<CreatePropertyComponent>;

  beforeEach(async () => {
    localStorage.setItem('userEmail', 'test@example.com');
    await TestBed.configureTestingModule({
      imports: [CreatePropertyComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: { params: of({})},
        snapshot: {}
      }]
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
      area: 0,
      address: ''
    });
    expect(component.form.invalid).toBeTrue();
  });

  it('should have a valid form when required fields are filled', () => {
    component.form.patchValue({
      name: 'Test Property',
      area: 100,
      propertyValue: 500000,
      address: '123 Main St',
      type: 'Apartment',
      primaryContractor: 'contractor-uuid',
      coporateUuid: 'body-corporate-uuid'
    });
    expect(component.form.valid).toBeTrue();
  });

  it('should patch image value when onFileSelected is called', () => {
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const event = {
      target: { files: [file] }
    } as unknown as Event;
    component.onFilesSelected(event);
    expect(component.form.value.images).toEqual([file]);
  });

  it('should log form value on submit if form is valid', () => {
    spyOn(console, 'log');
    component.form.patchValue({
      name: 'Test Property',
      area: 100,
      propertyValue: 500000,
      address: '123 Main St',
      type: 'Apartment',
      primaryContractor: 'contractor-uuid',
      coporateUuid: 'body-corporate-uuid'
    });
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Creating property with payload:', jasmine.any(Object));
  });

  it('should not log form value on submit if form is invalid', () => {
    spyOn(console, 'log');
    component.form.patchValue({
      name: '',
      area: -100,
      address: ''
    });
    component.onSubmit();
    expect(console.log).not.toHaveBeenCalled();
  });
});