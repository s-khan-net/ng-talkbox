import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotGeneralComponent } from './bot-general.component';

describe('BotGeneralComponent', () => {
  let component: BotGeneralComponent;
  let fixture: ComponentFixture<BotGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
