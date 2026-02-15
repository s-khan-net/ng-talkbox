import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IBot } from 'src/app/models/bot.model';

@Component({
  selector: 'app-page-view-ui',
  templateUrl: './page-view-ui.component.html',
  styleUrls: ['./page-view-ui.component.scss'],
  standalone: false
})
export class PageViewUiComponent implements OnInit, OnChanges {

  @Input() bot!: IBot;
  public startIconRounded: boolean = false;
  public startIconShadow: boolean = false;
  public startIconPosition: boolean = false;

  public get startButtonColor(): string {
    return this.bot?.startUpParams?.startIconBackground ? this.bot.startUpParams.startIconBackground : '';
  }

  public get startButtonBorder(): string {
    if (this.bot.startUpParams?.startIconRounded) {
      return '50%';
      // this.borderRadius = 50;
      // this.borderRadiusP = '%';
    }
    else {
      return '7px';
      // this.borderRadius = 7;
      // this.borderRadiusP = 'px';
    }
  }

  public get startText(): string {
    return this.bot.startUpParams?.startIconText || ''
  }

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('page ui',this.bot, changes);
    if (this.bot?.startUpParams?.startIconShadow) {
      this.startIconShadow = this.bot?.startUpParams?.startIconShadow.required;
    }
    // if (this.bot?.startUpParams?.startIconText) {
    //   this.startText = this.bot?.startUpParams.startIconText;
    // }
    if (this.bot?.startUpParams?.startIconRounded) {
      this.startIconRounded = this.bot?.startUpParams.startIconRounded
    }
    if (this.bot?.startUpParams?.startIconPosition.left) {
      this.startIconPosition = this.bot?.startUpParams?.startIconPosition.left
    }
    // if (this.bot.startUpParams?.startIconRounded) {
    //   this.borderRadius = 50;
    //   this.borderRadiusP = '%';
    // }
    // else {
    //   this.borderRadius = 7;
    //   this.borderRadiusP = 'px';
    // }
  }

  ngOnInit(): void {
  }

}
