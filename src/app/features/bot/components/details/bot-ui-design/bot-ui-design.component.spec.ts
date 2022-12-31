import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotUiDesignComponent } from './bot-ui-design.component';

describe('BotUiDesignComponent', () => {
  let component: BotUiDesignComponent;
  let fixture: ComponentFixture<BotUiDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotUiDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotUiDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
