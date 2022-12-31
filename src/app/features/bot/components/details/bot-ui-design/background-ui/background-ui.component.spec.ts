import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundUiComponent } from './background-ui.component';

describe('BackgroundUiComponent', () => {
  let component: BackgroundUiComponent;
  let fixture: ComponentFixture<BackgroundUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
