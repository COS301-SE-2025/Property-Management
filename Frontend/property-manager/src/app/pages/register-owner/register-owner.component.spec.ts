import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterOwnerComponent } from './register-owner.component';
import { AuthService } from 'shared';
import { FormsModule } from '@angular/forms';
// import { CognitoUser } from 'amazon-cognito-identity-js';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterOwnerComponent', () => {
  let component: RegisterOwnerComponent;
  let fixture: ComponentFixture<RegisterOwnerComponent>;
  // let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, RegisterOwnerComponent, HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterOwnerComponent);
    component = fixture.componentInstance;
    // authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should set emptyField to true if any field is missing', () => {
  //   component.email = '';
  //   component.password = '';
  //   component.contactNumber = '';
  //   component.register();
  //   expect(component.emptyField).toBeTrue();
  //   expect(component.userError).toBeFalse();
  //   expect(component.serverError).toBeFalse();
  // });

  // it('should call register if all fields are filled', async () => {
  //   component.email = 'test@example.com';
  //   component.password = 'Password@123';
  //   component.contactNumber = '1234567890';
  //   authServiceSpy.register.and.returnValue(Promise.resolve({
  //     user: {} as CognitoUser,
  //     userConfirmed: true,
  //     userSub: 'some-user-sub',
  //     codeDeliveryDetails: {
  //       AttributeName: 'email',
  //       DeliveryMedium: 'EMAIL',
  //       Destination: 'test@example.com'
  //     }
  //   }));

  //   await component.register();

  //   expect(authServiceSpy.register).toHaveBeenCalledWith('test@example.com', 'Password@123', 'owner');
  //   expect(component.emptyField).toBeFalse();
  //   expect(component.userError).toBeFalse();
  //   expect(component.serverError).toBeFalse();
  });

//   it('should set userError on 400 status or NotAuthorizedException', async () => {
//     component.email = 'test@example.com';
//     component.password = 'Password@123';
//     component.contactNumber = '1234567890';

//     authServiceSpy.register.and.rejectWith({ status: 400 });
//     try {
//       await component.register();
//     } catch {
//       // Expected to throw
//     }
//     expect(component.userError).toBeTrue();
//     expect(component.serverError).toBeFalse();

//     component.userError = false;
//     component.serverError = false;

//     // Test for NotAuthorizedException
//     authServiceSpy.register.and.rejectWith({ code: 'NotAuthorizedException' });
//     try {
//       await component.register();
//     } catch {
//       // Expected to throw
//     }
//     expect(component.userError).toBeTrue();
//     expect(component.serverError).toBeFalse();
//   });

//   it('should set serverError on other errors', async () => {
//     component.email = 'test@example.com';
//     component.password = 'pass';
//     component.contactNumber = '1234567890';

//     authServiceSpy.register.and.rejectWith({ status: 500 });
//     try {
//       await component.register();
//     } catch {
//       // Expected to throw
//     }
//     expect(component.userError).toBeFalse();
//     expect(component.serverError).toBeTrue();
//   });

//   it('should toggle password visibility', () => {
//     expect(component.passwordVisible).toBeFalse();
//     component.togglePassword();
//     expect(component.passwordVisible).toBeTrue();
//     component.togglePassword();
//     expect(component.passwordVisible).toBeFalse();
//   });
// });