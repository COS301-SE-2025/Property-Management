import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterOwnerComponent } from './register-owner.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CognitoUser } from 'amazon-cognito-identity-js';

describe('RegisterOwnerComponent', () => {
  let component: RegisterOwnerComponent;
  let fixture: ComponentFixture<RegisterOwnerComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['registerOwner']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, RegisterOwnerComponent],
      providers: [{ provide: AuthService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterOwnerComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set emptyField to true if any field is missing', () => {
    component.email = '';
    component.password = '';
    component.contactNumber = '';
    component.register();
    expect(component.emptyField).toBeTrue();
    expect(component.userError).toBeFalse();
    expect(component.serverError).toBeFalse();
  });

  it('should call registerOwner if all fields are filled', async () => {
    component.email = 'test@example.com';
    component.password = 'Password@123';
    component.contactNumber = '1234567890';
    authServiceSpy.registerOwner.and.returnValue(Promise.resolve({
      user: {} as CognitoUser,
      userConfirmed: true,
      userSub: 'some-user-sub',
      codeDeliveryDetails: {
        AttributeName: 'email',
        DeliveryMedium: 'EMAIL',
        Destination: 'test@example.com'
      }
    }));

    await component.register();

    expect(authServiceSpy.registerOwner).toHaveBeenCalledWith('test@example.com', 'Password@123');
    expect(component.emptyField).toBeFalse();
    expect(component.userError).toBeFalse();
    expect(component.serverError).toBeFalse();
  });

  it('should set userError on 400 status or NotAuthorizedException', async () => {
    component.email = 'test@example.com';
    component.password = 'Password@123';
    component.contactNumber = '1234567890';
    authServiceSpy.registerOwner.and.returnValue(Promise.reject({ status: 400 }));

    await component.register();

    expect(component.userError).toBeTrue();
    expect(component.serverError).toBeFalse();
    expect(component.emptyField).toBeFalse();

    // Test NotAuthorizedException
    authServiceSpy.registerOwner.and.returnValue(Promise.reject({ code: 'NotAuthorizedException' }));
    await component.register();
    expect(component.userError).toBeTrue();
  });

  it('should set serverError on other errors', async () => {
    component.email = 'test@example.com';
    component.password = 'Password@123';
    component.contactNumber = '1234567890';
    authServiceSpy.registerOwner.and.returnValue(Promise.reject({ status: 500 }));

    await component.register();

    expect(component.userError).toBeFalse();
    expect(component.serverError).toBeTrue();
    expect(component.emptyField).toBeFalse();
  });

  it('should toggle password visibility', () => {
    expect(component.passwordVisible).toBeFalse();
    component.togglePassword();
    expect(component.passwordVisible).toBeTrue();
    component.togglePassword();
    expect(component.passwordVisible).toBeFalse();
  });
});