import { Component, Input, OnInit } from '@angular/core';
import { IConv } from 'src/app/models/bot.model';
import { DEFAULT_RESPONSEVALIDATION } from 'src/app/shared/contants';

@Component({
  selector: 'app-type-text',
  templateUrl: './type-text.component.html',
  styleUrls: ['./type-text.component.scss'],
  standalone: false
})
export class TypeTextComponent implements OnInit {

  constructor() { }

  @Input() public fromParent!: IConv;
  @Input() conv!: any;
  public itemText: any;

  ngOnInit(): void {
    if (!this.fromParent.responseValidation) {
      this.fromParent.responseValidation = DEFAULT_RESPONSEVALIDATION
    }
  }

  public addNextQuestion(question: any) {
    console.log('selected next question', question)
  }

  public linkedQuestionEdit(linkedQuestion: any) {

  }

  public removeNext() {
    this.fromParent.nextQuestion = null;
  }

  public chkChange(event: any) {
    if (!event) {
      this.fromParent.responseValidation = DEFAULT_RESPONSEVALIDATION;
    }
  }
}
