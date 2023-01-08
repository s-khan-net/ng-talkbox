import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOptionComponent } from './type-option.component';

describe('TypeOptionComponent', () => {
  let component: TypeOptionComponent;
  let fixture: ComponentFixture<TypeOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
