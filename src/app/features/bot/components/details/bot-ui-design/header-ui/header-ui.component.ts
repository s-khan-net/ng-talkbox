import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IBot } from 'src/app/models/bot.model';

@Component({
  selector: 'app-header-ui',
  templateUrl: './header-ui.component.html',
  styleUrls: ['./header-ui.component.scss'],
  standalone: false
})
export class HeaderUiComponent implements OnInit, OnChanges {

  @Input() bot!: IBot;
  public loadingMsg = 'Loading...';
  public fullScreen: boolean = false;
  public showLoader: boolean = true;
  public headerText: string = ''

  public get headerColor(): string {
    return this.bot?.talkBoxParams?.headerColor ? this.bot?.talkBoxParams?.headerColor : '#CCC';
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.bot.talkBoxParams) {
      this.headerText = this.bot.talkBoxParams.headerText;
    }
  }

  ngOnInit(): void {
  }

  public onCPIconColor(colorCode: string) {
    if (this.bot.talkBoxParams)
      this.bot.talkBoxParams.headerColor = colorCode;
  }

  public updateHeaderText(value: string): void {
    if (this.bot.talkBoxParams) {
      this.bot.talkBoxParams.headerText = value;
    }
  }
}
