import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as _ from 'lodash';
import { BotService } from 'src/app/core/services/bots/bot.service';
import { IBot } from 'src/app/models/bot.model';

@Component({
  selector: 'app-bot-preview',
  templateUrl: './bot-preview.component.html',
  styleUrls: ['./bot-preview.component.scss'],
  standalone: false
})
export class BotPreviewComponent implements OnChanges {

  @Input() public bot!: IBot;

  private _html: SafeHtml = '';

  public get html(): SafeHtml {
    return this._html;
  }
  public set html(value: SafeHtml) {
    this._html = value;
  }

  public startIconRounded: boolean = false;
  public startIconShadow: boolean = false;
  public startIconPosition: boolean = false;
  public previewToggle: boolean = false;

  public get startButtonColor(): string {
    return this.bot?.startUpParams?.startIconBackground ? this.bot.startUpParams.startIconBackground : '';
  }

  public get startButtonBorder(): string {
    if (this.bot.startUpParams?.startIconRounded) {
      return '50%';
    }
    else {
      return '7px';
    }
  }

  public get startText(): string {
    return this.bot.startUpParams?.startIconText || '';
  }

  constructor(private _botService: BotService, private _sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.bot)
      this.preview();
  }

  public preview() {
    let tempBot = _.cloneDeep(this.bot);
    delete tempBot.canAssign;
    delete tempBot.canEdit;
    delete tempBot.created;
    delete tempBot.createdBy;
    delete tempBot.modified;
    delete tempBot.modifiedBy;
    delete tempBot.active;
    delete tempBot.referrers;

    let firstQuestion = this.bot?.conv && this.bot?.conv?.length > 0 ? this.bot.conv[0].id : "0";
    let stempBot = JSON.stringify(tempBot).replaceAll("'", "");

    const tempHTML1 = `<!DOCTYPE html>
          <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
          <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
          <!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
          <!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
          <html>
          <head>
              <meta charset="utf-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <title></title>
              <meta name="description" content="">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>${this._makeStartCSS(this.bot)}</style>
          </head>
          
          <body style="margin-left:16px;margin-top: 4px;">
              <!--[if lt IE 7]>
                      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
                  <![endif]-->
              <div id='talkbox' class='talkbox-active' style='display: block; bottom: 57px;'>
              ${this._makeHeaderText(this.bot)}
              <div id='inner-talkbox'>
              <iframe id="talk-box-iframe" srcdoc='<html>
              <head>
              <script> 
              var bot = ${stempBot};
              var questionDelay = 100;
              var answerDelay = 100;
              var resetQuestion = {
                  "id": "66666-99999-00000",
                  "text"
                      : "This chat terminated abruply <br> Really sorry....<br> Please start over...",
                  "type": "option",
                  responseValidation: null,
                  options: [
                      { text: "Start Over", value: "0", linkedQuestion: "0" },
                  ],
                  waitForReply: false
              };
              var firstQuestion = ${firstQuestion}; 
              </script> 
              </head> 
              <body> 
              <div id="chat-container"> 
              <div id="chat-box"></div> 
              <div id="type-box"> 
              <div class="branding"></div>  
              </div> 
              </div> 
              <input type="hidden" id="session" /> 
              <div> 
              <script src="assets/scripts/talkbox.js"></script> 
              </div> 
              </body> 
              </html>' >
              </iframe>
              </div>
          </body>
          </html>`;
    this.html = this._sanitizer.bypassSecurityTrustHtml(tempHTML1);
  }

  private _makeStartCSS(bot: IBot) {
    const s_right = `${bot?.startUpParams?.startIconPosition.left ? 'left:93px;' : 'right:23px;'}`;
    //bot.startUpParams.startIconPosition.bottom is a pixel value to specify icon placement at the bottom
    const s_bottom = `bottom: ${bot?.startUpParams?.startIconPosition.bottom}px;`;
    const s_startButtonContainer = `#start-button-container { position: fixed; ${s_right}  z-index: 214748000;  user-select: none }`;

    const s_height = `height:${bot?.startUpParams?.startIconSize.height}px;`;
    const s_width = `width:${bot?.startUpParams?.startIconSize.width}px;`;
    const s_background = `background-color:${bot?.startUpParams?.startIconBackground};`;
    const s_boxshadow = bot?.startUpParams?.startIconShadow.required ? `box-shadow:${bot?.startUpParams?.startIconShadow.style};` : '';
    const s_roundedIcon = bot?.startUpParams?.startIconRounded ? 'border-radius: 50% !important; ' : 'border-radius: 7px !important;';
    const s_startButton = `#start-button { ${s_width} ${s_height} ${s_background} ${s_roundedIcon} margin: -3px; cursor: pointer; ${s_boxshadow} } `;

    let s_startButtonText = '';
    if (bot?.startUpParams?.startIconText && bot?.startUpParams?.startIconText?.length > 0) {
      s_startButtonText = `#start-button-text { font-family: "Open Sans",sans-serif; font-size: 12px!important; font-weight: 400; position: relative; z-index: 214748000; cursor: pointer; background-color: #fff; color: #666; padding: 3px 8px; line-height: 1.5;border-radius: .625rem !important; white-space: normal; word-break: break-word; text-overflow: ellipsis; max-width: 149px; max-height: 60px; margin-left: -122px;  box-shadow: 0 0 20px 0 rgb(0 0 0 / 15%); animation: launcher-frame-appear 0.25s ease forwards; bottom: -${(bot?.startUpParams?.startIconSize?.height - 20)}px; left: -${bot?.startUpParams?.startIconSize?.width + 8}px} #start-button-text:before { content:""; position: absolute; width: 0; height: 0; left: auto; right: -15px; top: 28%; bottom: auto; border: 8px solid; border-color: transparent transparent transparent #fff;}`;
    }
    const s_talkboxbottom = `bottom: ${bot?.startUpParams?.startIconPosition.bottom}px;`;
    const s_talkboxright = `${bot?.startUpParams?.startIconPosition.left ? 'left:90px;' : 'right:20px;'}`;
    const s_talkbox = `#talkbox { z-index: 214748000; overflow: hidden !important;  display: none; transform: translateY(5%); ${s_talkboxbottom} ${s_talkboxright}  max-height: 610px; min-height: 420px; margin: 0px; height: calc(100% - 90px - 20px); width: 377px; border-radius: 8px; box-shadow: 0 5px 40px rgba(0, 0, 0, .16) !important; transition: transform 0.2s ease-in-out; transition-property: transform, opacity; user-select:none } #talkbox.talkbox-active { display: block } `;

    let s_talkboxheaderheight = '';
    let s_talkboxheadertext = '';
    let s_talkboxtopbuttons = '';
    if (bot?.talkBoxParams?.headerText && bot?.talkBoxParams?.headerText?.length > 0) {
      s_talkboxheaderheight = 'height: 8%;';
      s_talkboxheadertext = '#talk-header-text { padding: 7px 11px 0px 23px; width: 64%; display: inline-block; color:#fff; font-size: x-large; } ';
      if (bot?.talkBoxParams?.closeButton) {
        s_talkboxtopbuttons = '#top-buttons { width: 24%; display: inline-block;} #close-button { border-radius: 50%; margin-top: 4px;  background-color: #DDD; width: 13px; text-align: center; float:right; font-size: 13px; font-family: monospace; } ';
      }
    }
    else {
      s_talkboxheaderheight = 'height: 5%;';
      if (bot?.talkBoxParams?.closeButton) {
        s_talkboxtopbuttons = '#top-buttons { width: 97%; display: inline-block;} #close-button { border-radius: 50%; margin-top: 4px;  background-color: #DDD; width: 13px; text-align: center; float:right; font-size: 13px; font-family: monospace; }';
      }
    }
    const s_talkboxheaderbgcolor = `background-color:${bot?.talkBoxParams?.headerColor};`;
    const s_talkboxheader = `#talk-header { ${s_talkboxheaderheight}; user-select: none; ${s_talkboxheaderbgcolor} } `;
    const css = `${s_startButtonContainer} ${s_startButton} ${s_startButtonText} ${s_talkbox} ${s_talkboxheader} ${s_talkboxheadertext} ${s_talkboxtopbuttons} #inner-talkbox {  background-color:#FFF; height:93%; } #talk-box-iframe { z-index: 214748000; background-color: ${bot.talkBoxParams?.talkboxBackGround}; position: absolute; padding: 0px; margin: 0px; left: 0px; right: 0px; width: 100% !important; height: 94% !important; max-width: 100% !important; max-height: 100% !important; border: none; border-radius: 6px !important; visibility: visible !important;      opacity: 1 !important; display: block !important; pointer-events: initial !important; } @media only screen and (max-device-width: 567px), screen and (max-width: 450px) { #talkbox.talkbox-active { height: 100% !important; left: 0px !important; right: 0px !important; top: -24px !important; bottom: 0px !important;  max-height: initial; }`;
    return css;
  }

  private _makeHeaderText(bot: IBot) {
    if (bot?.talkBoxParams?.headerText && bot?.talkBoxParams?.headerText?.length > 0) {
      return `<div id="talk-header"><div id="talk-header-text">${bot?.talkBoxParams?.headerText}</div><div id="top-buttons"><div id="close-button" role="button">X</div></div></div>`;
    }
    else {
      return '<div id="talk-header"><div id="top-buttons"><div id="close-button" role="button">X</div></div></div>';
    }
  }

  public togglePreview() {
    this.previewToggle = !this.previewToggle
  }
}
