import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMultiComponent } from './type-multi.component';

describe('TypeMultiComponent', () => {
  let component: TypeMultiComponent;
  let fixture: ComponentFixture<TypeMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeMultiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
