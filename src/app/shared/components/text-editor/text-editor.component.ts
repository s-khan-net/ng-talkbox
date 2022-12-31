import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  @Input() text: any;
  @Output() updateText: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public onModelChange(event: any): void {
    this.updateText.emit(this.text)
  }
}
