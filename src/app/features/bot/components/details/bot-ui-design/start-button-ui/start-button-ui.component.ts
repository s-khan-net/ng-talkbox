import { Component, Input, OnInit } from '@angular/core';
import { IBot, IStartUpParams, IThemeColors } from 'src/app/models/bot.model';

@Component({
  selector: 'app-start-button-ui',
  templateUrl: './start-button-ui.component.html',
  styleUrls: ['./start-button-ui.component.scss']
})
export class StartButtonUiComponent implements OnInit {

  @Input() bot!: IBot;
  public loadingMsg = 'Loading...';
  public fullScreen: boolean = false;
  public startText: string = '';
  public showLoader: boolean = true;
  public startIconRounded: boolean = false;
  public startIconShadow: boolean = false;
  public startIconPosition: boolean = false;

  public borderRadius = 7;
  public borderRadiusP = 'px';

  public get startButtonColor(): string {
    return this.bot?.startUpParams?.startIconBackground ? this.bot.startUpParams.startIconBackground : '';
  }

  constructor() { }

  ngOnInit(): void {
  }

  public ngOnChanges(): void {
    console.log('bot-ui-design', this.bot?.startUpParams);
    if (this.bot?.startUpParams?.startIconShadow) {
      this.startIconShadow = this.bot?.startUpParams?.startIconShadow.required;
    }
    if (this.bot?.startUpParams?.startIconText) {
      this.startText = this.bot?.startUpParams.startIconText;
    }
    if (this.bot?.startUpParams?.startIconRounded) {
      this.startIconRounded = this.bot?.startUpParams.startIconRounded
    }
    if (this.bot?.startUpParams?.startIconRounded) {
      this.borderRadius = 50;
      this.borderRadiusP = '%';
    }
    if (this.bot?.startUpParams?.startIconPosition.left) {
      this.startIconPosition = this.bot?.startUpParams?.startIconPosition.left
    }
    this.showLoader = false;
  }

  public toggleStartBtnShadow(): void {
    if (this.bot?.startUpParams) {
      this.bot.startUpParams.startIconShadow.required = !this.bot.startUpParams.startIconShadow.required;
    }
  }

  public toggleCircleIcon(): void {
    if (this.bot?.startUpParams) {
      this.bot.startUpParams.startIconRounded = !this.bot.startUpParams.startIconRounded;
      if (this.bot.startUpParams?.startIconRounded) {
        this.borderRadius = 50;
        this.borderRadiusP = '%';
      }
      else {
        this.borderRadius = 7;
        this.borderRadiusP = 'px';
      }
    }
  }

  public togglePosition(): void {
    if (this.bot?.startUpParams?.startIconPosition.left) {
      this.bot.startUpParams.startIconPosition.left = !this.bot.startUpParams.startIconPosition.left;
    }
  }

  public onCPIconColor(colorCode: string) {
    if (this.bot.startUpParams)
      this.bot.startUpParams.startIconBackground = colorCode;
  }

  public onCPBoxShadow(colourCode: string): void {
    if (this.bot.themeColors)
      this.bot.themeColors.themeBoxShadowColor = colourCode;
    if (this.bot.startUpParams)
      this.bot.startUpParams.startIconShadow.style = `0px 0px 21px 0px ${colourCode}`;
    // this.lineDataChanged.emit(true);
  }

  public updateStartText(value: string): void {
    if (this.bot.startUpParams) {
      this.bot.startUpParams.startIconText = value;
    }
  }
}
