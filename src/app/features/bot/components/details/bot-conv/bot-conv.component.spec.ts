import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotConvComponent } from './bot-conv.component';

describe('BotConvComponent', () => {
  let component: BotConvComponent;
  let fixture: ComponentFixture<BotConvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotConvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotConvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
