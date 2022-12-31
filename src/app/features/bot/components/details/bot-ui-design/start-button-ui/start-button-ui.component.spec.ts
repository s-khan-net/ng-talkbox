import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartButtonUiComponent } from './start-button-ui.component';

describe('StartButtonUiComponent', () => {
  let component: StartButtonUiComponent;
  let fixture: ComponentFixture<StartButtonUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartButtonUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartButtonUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
