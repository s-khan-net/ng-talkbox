import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LightColorPipe } from '../../../../shared/pipes/light-color/light-color.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { BotCardComponent } from './bot-card.component';
import { BotBuilder } from '../../../../../../Test/data/bot/bot-builder.model';
import { StartUpParamsBuilder } from 'Test/data/bot/bot-startUpParams-builder.model';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('BotCardComponent', () => {
  let component: BotCardComponent;
  let fixture: ComponentFixture<BotCardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [BotCardComponent, LightColorPipe]
    })
      .compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger onchanges with start params', fakeAsync(() => {
    const startParams = StartUpParamsBuilder.anyStartUps().withRounded(true).build();
    component.bot = BotBuilder.anyBot().withStartParams(startParams).build();
    component.ngOnChanges();
    fixture.detectChanges();
    tick(50);
    expect(component.s_boxshadow).toBe('')
    expect(component.borderRadiusP).toBe('%')
  }));

  it('should trigger onchanges without start params', fakeAsync(() => {
    component.bot = BotBuilder.anyBot().build();
    component.ngOnChanges();
    fixture.detectChanges();
    tick(50);
    expect(component.s_boxshadow).toBe('')
    expect(component.borderRadiusP).toBe('px')
  }));

  it('should trigger onchanges with start params shadow', fakeAsync(() => {
    const startParams = StartUpParamsBuilder.anyStartUps().withRounded(true).withShadow({ required: true, style: 'testVal' }).build();
    component.bot = BotBuilder.anyBot().withStartParams(startParams).build();
    component.ngOnChanges();
    fixture.detectChanges();
    tick(50);
    expect(component.s_boxshadow).toBe('testVal')
    expect(component.borderRadiusP).toBe('%')
  }));

  it('should trigger onchanges with no bot', fakeAsync(() => {
    component.ngOnChanges();
    fixture.detectChanges();
    tick(50);
    expect(component.s_boxshadow).toBe('')
    expect(component.borderRadiusP).toBe('px')
  }));

  it('should navigate to bot details when bot is selected', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    const startParams = StartUpParamsBuilder.anyStartUps().withRounded(true).withShadow({ required: true, style: 'testVal' }).build();
    component.bot = BotBuilder.anyBot().withStartParams(startParams).build();
    console.log(component.bot)
    component.ngOnChanges();
    fixture.detectChanges();
    tick(50);
    const botcard = fixture.debugElement.query(By.css('.bot-card'));
    botcard.triggerEventHandler('click', {});
    expect(navigateSpy).toHaveBeenCalledWith('/bot', { state: component.bot });
  }));
});
