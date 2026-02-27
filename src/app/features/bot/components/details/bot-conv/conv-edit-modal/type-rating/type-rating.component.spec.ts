import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRatingComponent } from './type-rating.component';

describe('TypeRatingComponent', () => {
  let component: TypeRatingComponent;
  let fixture: ComponentFixture<TypeRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
