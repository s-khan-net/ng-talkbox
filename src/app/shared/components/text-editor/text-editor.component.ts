import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { editorsettings } from './buttons.model';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  @HostListener('selectionchange', ['$event'])
  onSelection(event: any) {
    console.log('selection', event)
  }

  @Input() text: any;
  @Output() updateText: EventEmitter<any> = new EventEmitter();

  public selectedText: any;
  public selectionRange: any;
  public buttons = editorsettings.buttons;
  public count: number = 0;
  public maxQuestionText = editorsettings.maxQuestionText;
  @ViewChild('editor') editor: ElementRef | undefined;
  constructor() { }

  ngOnInit(): void {
    if (this.text)
      this.count = this.text.length
  }

  public onModelChange(event: any): void {
    this.updateText.emit(this.text)
  }

  public action(button: any) {
    console.log(button);
    button.pressed = !button.pressed;
    if (this.selectedText) {

    }
  }

  public keyup(event: any) {
    this._checkSelectedText()
    if (this.count >= this.maxQuestionText) {
      return;
    }
    if (this.editor)
      this.count = this.editor.nativeElement.innerHTML.length
    if (event.key == 'ctrl') {

    }
  }
  private _checkSelectedText() {
    const sel: Selection | null = window.getSelection();
    let s = sel?.toString();
    let html = this.editor?.nativeElement.innerHTML
    if (html.indexOf(s) > -1)
      this.selectedText = s;
    // const s1 = sel?.anchorNode?.textContent?.substring(sel?.focusOffset, sel?.anchorOffset);
    console.log('selected text', this.selectedText)
  }

  public clickEditor(event: any) {
    // if (event)
    //   event.stopPropogation();
    this._checkSelectedText();
    // if (sel?.getRangeAt && sel?.rangeCount) {
    //   this.selectionRange = sel.getRangeAt(0);
    // }
    // console.log('selected', s)
  }
}
