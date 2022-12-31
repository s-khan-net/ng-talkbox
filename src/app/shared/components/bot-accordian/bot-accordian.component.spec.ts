import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotAccordianComponent } from './bot-accordian.component';

describe('BotAccordianComponent', () => {
  let component: BotAccordianComponent;
  let fixture: ComponentFixture<BotAccordianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotAccordianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
