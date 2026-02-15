import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { BotService } from 'src/app/core/services/bots/bot.service';
import { BotBuilder } from 'Test/data/bot/bot-builder.model';
import { UserBuilder } from '../../../../../../Test/data/user/user-builder.model';
import { UserService } from '../../../../shared/services/user.service';
import { DashboardComponent } from './dashboard.component';
import { By } from '@angular/platform-browser';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let userService: UserService;
  let botService: BotService;
  let modalService: NgbModal;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [DashboardComponent],
    imports: [RouterTestingModule,
        NgbModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    userService = TestBed.inject(UserService)
    botService = TestBed.inject(BotService)
    modalService = TestBed.inject(NgbModal)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('user actions on dashboard', () => {
    it('should get bots for user if user is retrieved', fakeAsync(() => {
      const user = new BehaviorSubject(UserBuilder.anyUser().build());
      const bot = BotBuilder.anyBot().build();
      spyOnProperty(userService, 'currentUser', 'get').and.returnValue(user);
      const getbotspy = spyOn(botService, 'getBotsForUser').and.returnValue(of([bot])).and.callThrough();
      component.ngOnInit();
      tick(50);
      expect(getbotspy).toHaveBeenCalled();
    }));

    it('should redirect to home if user is null', fakeAsync(() => {
      router = fixture.debugElement.injector.get(Router);
      const urlspy = spyOn(router, 'navigate');
      const user = new BehaviorSubject(null);
      const bot = BotBuilder.anyBot().build();
      spyOnProperty(userService, 'currentUser', 'get').and.returnValue(user);
      const getbotspy = spyOn(botService, 'getBotsForUser').and.returnValue(of([bot]));
      component.ngOnInit();
      tick(50);
      expect(getbotspy).not.toHaveBeenCalled();
      expect(urlspy).toHaveBeenCalledWith(['']);
    }));

    it('should check the token method to retrive the logged in user, if no user is immediately obtained', fakeAsync(() => {
      router = fixture.debugElement.injector.get(Router);
      // const bot = BotBuilder.anyBot().build();
      const user = new BehaviorSubject(UserBuilder.anyUser().withUserId('').build());
      const userWithId = new BehaviorSubject(UserBuilder.anyUser().build()).toPromise();
      spyOnProperty(userService, 'currentUser', 'get').and.returnValue(user);
      const getUserSpy = spyOn(userService, 'getUser').and.callFake(() => {
        return userWithId;
      }).and.callThrough();
      // const getbotspy = spyOn(botService, 'getBotsForUser').and.returnValue(of([bot])).and.callThrough();
      component.ngOnInit();
      tick(50);
      expect(getUserSpy).toHaveBeenCalled();
      // expect(getbotspy).toHaveBeenCalled();
    }));

    it('should redirect to home page if user is not retrieved', fakeAsync(() => {
      router = fixture.debugElement.injector.get(Router);
      const urlspy = spyOn(router, 'navigate');
      const user = new BehaviorSubject(UserBuilder.anyUser().withUserId('').build());
      spyOnProperty(userService, 'currentUser', 'get').and.returnValue(user);
      component.ngOnInit();
      tick(50);
      expect(urlspy).toHaveBeenCalledWith(['']);
    }));
  });

  describe('bot on dashboard', () => {
    it('should open new modal on clicking create', fakeAsync(() => {
      component.showLoader = false;
      component.error = false;
      tick(50);
      fixture.detectChanges();
      const modalSpy = spyOn(modalService, 'open');
      const btnCreate = fixture.debugElement.query(By.css('#btnCreateBot'));
      console.log(btnCreate)
      btnCreate.triggerEventHandler('click', {});
      tick(50);
      fixture.detectChanges();
      expect(modalSpy).toHaveBeenCalled();
    }));

    it('should create default bot', fakeAsync(() => {
      const botCreateSpy = spyOn(botService, 'createBot').and.returnValue(of('ok'));
      component.showLoader = false;
      component.error = false;
      tick(50);
      fixture.detectChanges();
      const btnCreate = fixture.debugElement.query(By.css('#btnCreateBot'));
      btnCreate.triggerEventHandler('click', {});
      fixture.detectChanges();
      tick(50);
      const btnCreateDefault = document.getElementsByName('btnCreateDefault')[0];
      console.log('bc', btnCreateDefault)
      btnCreateDefault.click();
      fixture.detectChanges();
      tick(50);
      discardPeriodicTasks();
      expect(botCreateSpy).toHaveBeenCalled();
    }));
  });
});

// Mock class for NgbModalRef
export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve(true));
}
