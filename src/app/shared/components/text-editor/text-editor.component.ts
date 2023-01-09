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

  private _htmlSelectionStartIndex: number = 0;
  private _htmlSelectedEndIndex: number = 0;

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
    let textContent = sel?.anchorNode?.textContent;
    let selectedContent = sel?.toString(); // sel?.anchorNode?.textContent?.substring(sel?.focusOffset, sel?.anchorOffset);
    if (!textContent || !selectedContent) return;

    let html = this.editor?.nativeElement.innerHTML
    //check if textcontent is a part of html
    let parsed = this.htmlParse(html);
    if (parsed.indexOf(textContent) > -1) {
      if (sel?.getRangeAt && sel?.rangeCount) {
        let range = sel.getRangeAt(0);
        this._htmlSelectionStartIndex = parsed.indexOf(textContent) + range.startOffset;
        this._htmlSelectedEndIndex = this._htmlSelectionStartIndex + selectedContent.length;
      }
    }

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

  private htmlParse(html: string): string {
    if (!html)
      return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
  }
}
