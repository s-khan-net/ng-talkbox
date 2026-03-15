import { Component, Input, OnInit } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-type-rating',
  standalone: false,
  templateUrl: './type-rating.component.html',
  styleUrl: './type-rating.component.scss',
})
export class TypeRatingComponent implements OnInit {


  @Input() public fromParent!: any;
  @Input() public parentOptions!: any;
  @Input() public conv!: any;
  @Input() public optionBoxShadow!: any;
  @Input() public themePrimaryColor!: any;

  public convCopy: any;
  private _options: any = [];
  private _removedOptions: any = [];
  private _removedQuestions: any = [];

  ngOnInit(): void {
    if (this.conv)
      this.convCopy = _.cloneDeep(this.conv)
  }
}
