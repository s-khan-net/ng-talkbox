import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../../../shared/services/user.service';
import { UserComponent } from './user.component';
import { UserBuilder } from '../../../../../../Test/data/user/user-builder.model';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../../../core/services/authentication/authentication.service';
import { By } from '@angular/platform-browser';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;
  let authService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [UserComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    userService = TestBed.inject(UserService)
    authService = TestBed.inject(AuthenticationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the user', fakeAsync(() => {
    const user = new BehaviorSubject(UserBuilder.anyUser().build());
    spyOnProperty(userService, 'currentUser', 'get').and.returnValue(user);
    component.ngOnInit();
    tick(50);
    expect(component).toBeTruthy();
    expect(component.userObj).toBeTruthy();
  }));

  it('No User is retrieved then should check the token in if', fakeAsync(() => {
    const user = new BehaviorSubject(UserBuilder.anyUser().withUserId('').build());
    const userPromise = user.toPromise();
    const getUserSpy = spyOn(userService, 'getUser').and.returnValue(userPromise);
    spyOnProperty(userService, 'currentUser', 'get').and.returnValue(user);
    component.ngOnInit();
    tick(50);
    expect(component).toBeTruthy();
    expect(component.userObj).toBeFalsy();
    expect(getUserSpy).toHaveBeenCalled();
  }));

  it('No User is retrieved then should check the token', fakeAsync(() => {
    const userWithId = new BehaviorSubject(UserBuilder.anyUser().build());
    const userWithoutId = new BehaviorSubject(UserBuilder.anyUser().withUserId('').build());
    const userPromise = userWithId.toPromise();
    const getUserSpy = spyOn(userService, 'getUser').and.returnValue(userPromise);
    spyOnProperty(userService, 'currentUser', 'get').and.returnValue(userWithoutId);
    component.ngOnInit();
    tick(50);
    expect(component).toBeTruthy();
    expect(getUserSpy).toHaveBeenCalled();
  }));

  it('No User is retrieved should show the login button', fakeAsync(() => {
    const user = new BehaviorSubject(null);
    spyOnProperty(userService, 'currentUser', 'get').and.returnValue(user);
    component.ngOnInit();
    fixture.detectChanges();
    const loginBtn = fixture.debugElement.query(By.css('#btnLogin'));
    expect(loginBtn).toBeTruthy();
    expect(component.userObj).toBeFalsy();
  }));

  describe('click actions', () => {
    it('should toggle the menu when user is present', fakeAsync(() => {
      const user = new BehaviorSubject(UserBuilder.anyUser().build());
      const toggleSpy = spyOn(component, 'toggleUserNav');
      spyOnProperty(userService, 'currentUser', 'get').and.returnValue(user);
      component.ngOnInit();
      fixture.detectChanges();
      const userClassEl = fixture.debugElement.query(By.css('#userComponent'));
      userClassEl.triggerEventHandler('click', {});
      // console.log('b', component.userObj, component.showUserNav)
      expect(toggleSpy).toHaveBeenCalled();
      // expect(component.showUserNav).toBeTruthy()
    }));

    it('should logout', fakeAsync(() => {
      const user = new BehaviorSubject(UserBuilder.anyUser().build());
      spyOnProperty(userService, 'currentUser', 'get').and.returnValue(user);
      
      component.ngOnInit();
      fixture.detectChanges();
      component.toggleUserNav();
      const logoutSpy = spyOn(component, 'logout');
      const logoutBtn = fixture.debugElement.query(By.css('#btnLogout'));
      logoutBtn.triggerEventHandler('click', {});
      expect(logoutSpy).toHaveBeenCalled();
    }));

    // it('should call the user service logout method', fakeAsync(() => {
      // const user = new BehaviorSubject(UserBuilder.anyUser().build());
      // spyOnProperty(userService, 'currentUser', 'get').and.returnValue(user);
      // const getUserSpy = spyOn(userService, 'getUser').and.returnValue(user.toPromise());
      // component.ngOnInit();
      // fixture.detectChanges();
    //   component.logout();
    //   tick(50)
    //   expect(spyOn(authService,'logout')).toHaveBeenCalled();
    // }));
  })
});
