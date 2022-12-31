import { Component, Input, OnInit, Optional } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-conv-edit-modal',
  templateUrl: './conv-edit-modal.component.html',
  styleUrls: ['./conv-edit-modal.component.scss']
})
export class ConvEditModalComponent implements OnInit {

  @Input() fromParent!: any;
  private _options: any = [];
  private _removedOptions: any = [];
  public parentOptions: any = [];
  public itemText: any;
  constructor(@Optional() private readonly activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.fromParent);
    this.itemText = this.fromParent.text;
    this.parentOptions = [...this.fromParent.options]
  }
  public dismiss(): void {
    if (this.activeModal)
      this.activeModal.dismiss();
  }


  public onUpdatetext(value: any): void {
    console.log(value)
    this.itemText = value;
  }

  public updateOptionText(event: any, value: string) {
    // let temp = this.parentOptions.filter((ele: any) => {
    //   if (ele.value != value)
    //     return ele
    // })
    this.parentOptions.forEach((ele: any) => {
      if (ele.value === value)
        ele.text = event.target.value
    });
    // this.parentOptions = temp;
    // this.parentOptions.push({ text: event.target.value, value: value });

    console.log(this.parentOptions)
  }

  public removeOption(value: string) {
    this.parentOptions = this.parentOptions.filter((ele: any) => {
      if (ele.value === value) {
        this._removedOptions.push(ele);
      }
      else {
        return ele;
      }
    });
    console.log(this.parentOptions)
  }
  public addOption(value: string) {
    if (this.parentOptions.length < 5) {
      let ret = false;
      this.parentOptions.filter((o: any) => {
        if(o.text.length <=1) {
          ret = true;
        }
      });
      if(ret) {
        return;
      }
      //make space
      let newOption = { text: '', value: '0' };
      let inserted: boolean = false;
      this.parentOptions.forEach((ele: any, index: number) => {
        if (ele.value == value && !inserted) {
          this.parentOptions.splice(index + 1, 0, newOption);
          inserted = true;
        }
        else {
          if (!inserted)
            newOption.value = (Number(newOption.value) + 1).toString();
        }
      });
      let prevVal = '';
      this.parentOptions.forEach((ele: any, index: number) => {
        if (prevVal == ele.value) {
          ele.value = (Number(ele.value) + 1).toString();
        }
        prevVal = ele.value
      });
    }
    console.log(this.parentOptions);
  }
  public saveOptions(): void {
    // this.fromParent.options.filter((ele: any) => {
    //   this._removedOptions.forEach((option: any) => {
    //     if (option.value === ele.value)
    //       this.fromParent.options.splice(this.fromParent.options.indexOf(option), 1)
    //   });
    // });
    // this.fromParent.options.forEach((ele: any, index: number) => {
    //   this._options.forEach((option: any) => {
    //     if (option.value === ele.value)
    //       ele.text = option.text;
    //   });

    // });
    this.fromParent.options = this.parentOptions;
    this.fromParent.text = this.itemText;

    this.dismiss();
  }
}
