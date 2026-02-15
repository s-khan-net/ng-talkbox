import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { UserBuilder } from 'Test/data/user/user-builder.model';
import { of, throwError } from 'rxjs';
import { DashboardComponent } from 'src/app/features/dashboard/components/dashboard/dashboard.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [LoginComponent, DashboardComponent],
    imports: [RouterTestingModule.withRoutes([{ path: 'dashboard', component: DashboardComponent }])],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    authService = TestBed.inject(AuthenticationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the password text', () => {
    component.toggleShowPassword();
    expect(component.inputPasswordType).toBe('text');
    expect(component.showPassword).toBeTrue();
  });
  it('should hide the password text', () => {
    component.inputPasswordType = 'text'
    component.toggleShowPassword();
    expect(component.inputPasswordType).toBe('password');
  });

  // it('should login a valid user', () => {
  //   //set values
  //   component.userEmailModel = 'ricky@martin.com';
  //   component.userPasswordModel = 'ricky_martin';
  //   const user = UserBuilder.anyUser().build();
  //   const loginSpy = spyOn(component, 'login').and.callFake(() => {
  //     return user;
  //   });

  //   const loginBtn = fixture.debugElement.query(By.css('#btnLogin'));
  //   console.log(loginBtn.nativeElement)
  //   loginBtn.triggerEventHandler('click', {});
  //   fixture.detectChanges()
  //   expect(loginSpy).toHaveBeenCalled();
  //   // expect(spyOn(authService, 'login')).toHaveBeenCalled();.
  //   // expect(component.loginBtnEnabled).toBeFalse();
  // });

  it('should fire login and call auth service', fakeAsync(() => {
    const user = of(UserBuilder.anyUser().build());
    const authSpy = spyOn(authService, 'login').and.returnValue(user);
    //set values
    component.userEmailModel = 'ricky@martin.com';
    component.userPasswordModel = 'ricky_martin';
    component.login();
    expect(component.loginBtnEnabled).toBeFalse();
    tick(50);
    expect(authSpy).toHaveBeenCalled();
  }));

  it('should trigger error if no user is retrieved', fakeAsync(() => {
    const user = of(UserBuilder.anyUser().withUserId('').build());
    const authSpy = spyOn(authService, 'login').and.returnValue(throwError({status: 404}));
    component.login();
    tick(50);
    expect(component.loginError).toBeTrue();
  }));
});
