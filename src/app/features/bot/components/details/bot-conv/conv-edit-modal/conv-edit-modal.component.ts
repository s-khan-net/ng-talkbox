import { ChangeDetectorRef, Component, Input, OnInit, Optional } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { convType, IConv } from 'src/app/models/bot.model';

@Component({
  selector: 'app-conv-edit-modal',
  templateUrl: './conv-edit-modal.component.html',
  styleUrls: ['./conv-edit-modal.component.scss']
})
export class ConvEditModalComponent implements OnInit {

  @Input() fromParent!: any;
  @Input() conv!: any;
  public convCopy: any;
  private _options: any = [];
  private _removedOptions: any = [];
  private _removedQuestions: any = [];
  public parentOptions: any = [];
  public itemText: any;
  constructor(@Optional() private readonly activeModal: NgbActiveModal, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.fromParent, this.conv);
    if (this.conv)
      this.convCopy = _.cloneDeep(this.conv)
    this.itemText = this.fromParent.text;
    if (this.fromParent.options)
      this.parentOptions = [...this.fromParent.options]
  }
  public dismiss(sender?: boolean): void {
    if (this.activeModal) {
      if (sender) {
        this.activeModal.dismiss();
      }
      else {
        this.activeModal.dismiss(this.conv);
      }
    }

  }

  public onUpdatetext(value: any): void {
    console.log(value)
    this.itemText = value;
  }

  public updateOptionText(event: any, value: string) {
    this.parentOptions.forEach((ele: any) => {
      if (ele.value === value)
        ele.text = event.target.value.replace("\n", "<br/>");
    });
  }

  public removeOption(value: string) {
    this.parentOptions = this.parentOptions.filter((ele: any) => {
      if (ele.value === value) {
        this._removedOptions.push(ele);
        this._removeOptions(ele);
      }
      else {
        return ele;
      }
    });

    console.log(this.parentOptions)
  }
  private _removeOptions(ele: any) {
    const remQuestion = `${this.fromParent.id}${ele.value}`;
    console.log('have to remove', remQuestion)
    this.convCopy = this.convCopy.filter((ele: any) => {
      if (ele.id == remQuestion) {
        this._removedQuestions.push(ele);
      }
      else {
        return ele;
      }
    })
  }
  public addOption(value: string) {
    if (this.parentOptions.length < 5) {
      let ret = false;
      this.parentOptions.filter((o: any) => {
        if (o.text.length <= 1) {
          ret = true;
        }
      });
      if (ret) {
        return;
      }
      //make space
      let newOption = { text: '', value: '0' };
      this.parentOptions.forEach((ele: any, index: number) => {
        if (ele.value == value) {
          newOption.value = (Number(value) + 1).toString();
          this.parentOptions.splice(index + 1, 0, newOption);
        }
        // else {
        //   if (!inserted)
        //     newOption.value = (Number(newOption.value) + 1).toString();
        // }
      });
      // let prevVal = '';
      // this.parentOptions.forEach((ele: any, index: number) => {
      //   if (prevVal == ele.value) {
      //     ele.value = (Number(ele.value) + 1).toString();
      //   }
      //   prevVal = ele.value
      // });
    }
    console.log(this.parentOptions);
  }
  public saveOptions(): void {
    let question = this.convCopy.filter((ele: any) => {
      return ele.id == this.fromParent.id
    })[0];
    switch (this.fromParent.type) {
      case convType.OPTION:
        question.options = this.parentOptions;
        question.text = this.itemText;
        this.conv = this.convCopy;
        this.dismiss();
        this._changeDetectorRef.detectChanges();
        break;
      case convType.TEXT:
        this.convCopy.forEach((ele: any) => {
          if (ele.id == this.fromParent.id) {
            ele.text = this.itemText;
            ele.nextQuestion = this.fromParent.nextQuestion;
          }
        });
        this.conv = this.convCopy;
        this.dismiss();
        this._changeDetectorRef.detectChanges();
        break;
    }

  }
  public linkedQuestionEdit(linkedQuestion: any) {

  }

  public removeNext() {
    this.fromParent.nextQuestion = '';
  }

  public addLinkedQuestion(option: any) {
    console.log('selected linked question', option)
  }

  public addNextQuestion(question: any) {
    console.log('selected next question', question)
  }
}
