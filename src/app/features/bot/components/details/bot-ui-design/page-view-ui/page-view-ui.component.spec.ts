import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewUiComponent } from './page-view-ui.component';

describe('PageViewUiComponent', () => {
  let component: PageViewUiComponent;
  let fixture: ComponentFixture<PageViewUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageViewUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageViewUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
