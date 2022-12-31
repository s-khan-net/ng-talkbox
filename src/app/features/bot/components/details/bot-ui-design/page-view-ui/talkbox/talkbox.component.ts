import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IBot } from 'src/app/models/bot.model';
import { getLightColorFromBg } from 'src/app/shared/contants';

@Component({
  selector: 'app-talkbox',
  templateUrl: './talkbox.component.html',
  styleUrls: ['./talkbox.component.scss']
})
export class TalkboxComponent implements OnInit, OnChanges {

  @Input() bot!: IBot;

  public botTextWrapperColor: string | undefined;
  public boxShadow: string | undefined;
  public textShadow: string | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.bot) {
      this.botTextWrapperColor = getLightColorFromBg(this.bot?.talkBoxParams?.talkboxBackGround);
      this.boxShadow = `1px 3px 9px 0px ${this.bot?.themeColors?.themeTextShadowColor}`;
      this.textShadow = `0px 1px 0px ${this.bot?.themeColors?.themeTextShadowColor}`;
    }
  }
  ngOnInit(): void {
    if (this.bot) {
      this.botTextWrapperColor = getLightColorFromBg(this.bot?.talkBoxParams?.talkboxBackGround);
      this.boxShadow = `1px 3px 9px 0px ${this.bot?.themeColors?.themeTextShadowColor}`;
      this.textShadow = `0px 1px 0px ${this.bot?.themeColors?.themeTextShadowColor}`;
    }
  }
}
