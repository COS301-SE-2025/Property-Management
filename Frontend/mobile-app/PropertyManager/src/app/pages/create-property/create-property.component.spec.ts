import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePropertyComponent } from './create-property.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContractorService } from 'shared';
import { PropertyService } from 'shared';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreatePropertyComponent (Mobile)', () => {
  let component: CreatePropertyComponent;
  let fixture: ComponentFixture<CreatePropertyComponent>;
  let contractorService: jasmine.SpyObj<ContractorService>;
  let propertyService: jasmine.SpyObj<PropertyService>;

  beforeEach(async () => {
    contractorService = jasmine.createSpyObj('ContractorService', ['getAllContractors']);
    propertyService = jasmine.createSpyObj('PropertyService', ['createProperty']);

    await TestBed.configureTestingModule({
      imports: [CreatePropertyComponent, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: ContractorService, useValue: contractorService },
        { provide: PropertyService, useValue: propertyService }
      ]
    }).compileComponents();

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
      area: '',
      propertyValue: '',
      address: '',
      type: '',
      primaryContractor: ''
    });
    expect(component.form.invalid).toBeTrue();
  });

  it('should have a valid form when required fields are filled', () => {
    component.form.patchValue({
      name: 'Test Property',
      area: 100,
      propertyValue: 1000000,
      address: '123 Main St',
      type: 'Apartment',
      primaryContractor: '1'
    });
    expect(component.form.valid).toBeTrue();
  });

  it('should patch image value and preview when onFileSelected is called', () => {
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const event = {
      target: { files: [file] }
    } as unknown as Event;
    spyOn(window, 'FileReader').and.returnValue({
      readAsDataURL: function() { this.onload({ target: { result: 'data:image/png;base64,dummy' } }); },
      onload: null
    } as any);
    component.onFileSelected(event);
    expect(component.form.value.image).toEqual(file);
  });

  it('should load contractors on init', () => {
    const contractorsMock = [{
  uuid: '1',
  name: 'Contractor 1',
  services: 'Plumbing',
  contact_info: '123-456-7890',
  status: true, 
  apikey: 'apikey123',
  email: 'contractor1@example.com',
  address: '456 Contractor St',
  company: 'Contractor Company',
  phone: '123-456-7890',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-02T00:00:00Z',
  city: 'Sample City',
  postal_code: '12345',
  reg_number: 'REG123456',
  description: 'Sample contractor description'
}];
    contractorService.getAllContractors.and.returnValue(of(contractorsMock));
    component.loadContractors();
    expect(component.contractors).toEqual(contractorsMock);
  });

  it('should handle contractor service error gracefully', () => {
    contractorService.getAllContractors.and.returnValue(throwError(() => new Error('error')));
    component.loadContractors();
    expect(component.contractors).toEqual([]);
  });

  it('should show error if form is invalid on submit', async () => {
    component.form.patchValue({
      name: '',
      area: '',
      propertyValue: '',
      address: '',
      type: '',
      primaryContractor: ''
    });
    await component.onSubmit();
    expect(component.submissionError).toBe('Please fill all required fields.');
    expect(component.isSubmitting).toBeFalse();
  });

  it('should call propertyService.createProperty and navigate on valid submit', async () => {
  spyOn(component['router'], 'navigate');
  propertyService.createProperty.and.returnValue(of({
    name: 'Test Property',
    address: '123 Main St',
    type: 'Apartment',
    propertyValue: 1000000,
    latestInspectionDate: '2025/07/17',
    area: 100,
    primaryContractor: '1',
    bodyCorporate: '',
    propertyImage: null,
    trusteeUuid: '1'
  }));

  component.form.patchValue({
    name: 'Test Property',
    address: '123 Main St',
    type: 'Apartment',
    propertyValue: 1000000,
    latestInspectionDate: '2025/07/17',
    area: 100,
    primaryContractor: '1',
    bodyCorporate: '',
    propertyImage: null,
    trusteeUuid: '1'
  });

  await component.onSubmit();
  expect(propertyService.createProperty).toHaveBeenCalled();
  expect(component['router'].navigate).toHaveBeenCalledWith(['/home']);
  expect(component.isSubmitting).toBeFalse();
});

  it('should show error if propertyService.createProperty fails', async () => {
    propertyService.createProperty.and.returnValue(throwError(() => new Error('fail')));
    component.form.patchValue({
      name: 'Test Property',
      area: 100,
      propertyValue: 1000000,
      address: '123 Main St',
      type: 'Apartment',
      primaryContractor: '1'
    });
    await component.onSubmit();
    expect(component.submissionError).toBe('Failed to create property.');
    expect(component.isSubmitting).toBeFalse();
  });
});