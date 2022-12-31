import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvEditModalComponent } from './conv-edit-modal.component';

describe('ConvEditModalComponent', () => {
  let component: ConvEditModalComponent;
  let fixture: ComponentFixture<ConvEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
