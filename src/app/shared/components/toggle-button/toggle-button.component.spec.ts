import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleButtonComponent } from './toggle-button.component';

describe('ToggleButtonComponent', () => {
  let component: ToggleButtonComponent;
  let fixture: ComponentFixture<ToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggle visibility', () => {
    expect(component.checked).toBeTrue();

    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    spyOn(event, 'preventDefault');
    spyOn(component.toggle, 'emit');
    component.onToggle(event);

    expect(component.toggle.emit).toHaveBeenCalled();
  });
});
