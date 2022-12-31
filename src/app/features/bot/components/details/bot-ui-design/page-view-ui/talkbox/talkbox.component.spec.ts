import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkboxComponent } from './talkbox.component';

describe('TalkboxComponent', () => {
  let component: TalkboxComponent;
  let fixture: ComponentFixture<TalkboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalkboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
