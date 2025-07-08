import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {

    const spy = jasmine.createSpyObj('AuthService', ['login']);
    await TestBed.configureTestingModule({
      imports: [FormsModule, LoginComponent, HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: spy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // it('should set emptyField to true if email or password is missing', () => {
  //   component.email = '';
  //   component.password = '';
  //   component.login();

  //   expect(component.emptyField).toBeTrue();
  //   expect(component.userError).toBeFalse();
  //   expect(component.serverError).toBeFalse();
  // });

  // it('should call login if fields are filled', () => {
  //   component.email = 'test@example.com';
  //   component.password = "Password@123";
  //   authServiceSpy.login.and.returnValue(Promise.resolve({ accessToken: 'mock', idToken: 'mock', refreshToken: 'mock'}));

  //   component.login();

  //   expect(authServiceSpy.login).toHaveBeenCalledWith('test@example.com', 'Password@123');
  // });

  // it('should set userError on 400 status', async() => {
  //   component.email = 'test@example.com';
  //   component.password = "wrong";

  //   authServiceSpy.login.and.returnValue(Promise.reject({ status: 400}));

  //   await component.login();

  //   expect(component.userError).toBeTrue();
  //   expect(component.serverError).toBeFalse();
  //   expect(component.emptyField).toBeFalse();
  // });

  // it('should set serverError on any other errors', async() => {
  //   component.email = 'test@example.com';
  //   component.password = "pass";

  //   authServiceSpy.login.and.returnValue(Promise.reject({ status: 500}));

  //   await component.login();

  //   expect(component.userError).toBeFalse();
  //   expect(component.serverError).toBeTrue();
  //   expect(component.emptyField).toBeFalse();
  // });
});
