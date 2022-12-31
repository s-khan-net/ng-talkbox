import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the side bar', () => {
    const toggler = fixture.debugElement.query(By.css('#sidebarCollapse'));
    toggler.triggerEventHandler('click',{});
    expect(component.openSidebar).toBeFalse();
  });

  it('should open the page by triggering output event',()=> {
    const outputSpy = spyOn(component.selectedPage,'emit');
    component.pages = [{'name':'design', 'icon':'bi bi-easel'}];
    const designBtn = fixture.debugElement.query(By.css('.sidenav-link'));
    designBtn.triggerEventHandler('click', {});
    expect(outputSpy).toHaveBeenCalled();
  });
});
