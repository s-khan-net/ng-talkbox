import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToggleMenuBackgroundColour } from './toggle-button-background-colour.enum';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements OnInit {
  @Input() public checked: boolean = false;
  @Input() public backgroundColor = ToggleMenuBackgroundColour.TEAL;
  @Output() public toggle: EventEmitter<void> = new EventEmitter();

  constructor() { }

  public ngOnInit(): void {
  }

  public onToggle(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.checked = !this.checked
    this.toggle.emit();
  }

}
