import { Component, Input } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-type-multi',
  standalone: false,
  templateUrl: './type-multi.component.html',
  styleUrl: './type-multi.component.scss',
})
export class TypeMultiComponent {

  @Input() public fromParent!: any;
  @Input() public parentOptions!: any;
  @Input() public conv!: any;
  @Input() public optionBoxShadow!: any;
  @Input() public themePrimaryColor!: any;

  public convCopy: any;
  private _options: any = [];
  private _removedOptions: any = [];
  private _removedQuestions: any = [];
  public itemText: any;

  constructor() { }

  ngOnInit(): void {
    if (this.conv)
      this.convCopy = _.cloneDeep(this.conv)
    console.log('options', this.parentOptions)
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

  public addNextQuestion(question: any) {
    console.log('selected next question', question)
  }

  public removeNext() {
    this.fromParent.nextQuestion = null;
  }
}
