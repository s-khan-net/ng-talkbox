import { Component, Input, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { BotService } from 'src/app/core/services/bots/bot.service';
import { IBot } from 'src/app/models/bot.model';
import { Observable, Subscription, Subject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ColorLuminance } from 'src/app/shared/contants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bot-ui-design',
  templateUrl: './bot-ui-design.component.html',
  styleUrls: ['./bot-ui-design.component.scss']
})
export class BotUiDesignComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public bot!: IBot;
  // public s_boxshadow: string = '';
  public colorSchemes$: Observable<any> | undefined;
  public loadingError$ = new Subject<boolean>();
  public loadingMsg = 'Loading...';
  public errorMsg = 'Error.';
  public fullScreen: boolean = false;
  public creating: boolean = false;
  public showLoader: boolean = true;
  public error: boolean = false;
  public start_button: boolean = true;
  public background: boolean = true;
  public color_schemes: boolean = true;
  public header: boolean = true;


  public colorSchemes: any[] = [];

  constructor(private _activatedRoute: ActivatedRoute, private _botService: BotService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('bot-ui-design', this.bot);
  }

  public ngOnInit(): void {
    if (this.bot?.name) {
      //  this.loadBot(this._activatedRoute.snapshot.paramMap.get('')) 
    }
    this.loadColorSchemes();
  }

  private loadColorSchemes(): void {
    this.loadingMsg = 'Loading Color Schemes';
    this.colorSchemes$ = this._botService.getColorSchemes().pipe(catchError((err: any) => {
      this.errorMsg = err.error;
      this.loadingError$.next(true);
      this.error = true;
      return of();
    }), finalize(() => this.showLoader = false))
  }
  public ngOnDestroy(): void {

  }



  public setColorScheme(color: any): void {
    if (this.bot.themeColors) {
      this.bot.themeColors.themePrimaryColor = color.primaryColor;
      this.bot.themeColors.themeBoxShadowColor = ColorLuminance(color.primaryColor, -0.5);
      this.bot.themeColors.themeTextShadowColor = ColorLuminance(color.primaryColor, -0.3);
      this.bot.themeColors.themeHoverBackGroundColor = ColorLuminance(color.primaryColor,-0.15);
      // this.bot.themeColors.themeTextWrapperColor = getLightColorFromBy
    }
    if (this.bot.startUpParams) {
      this.bot.startUpParams.startIconBackground = color.primaryColor;
      this.bot.startUpParams.startIconShadow.style = `0px 0px 21px 0px ${ColorLuminance(color.primaryColor, -0.5)}`;
      this.bot.startUpParams.startIconShadow.required = true;
    }
    if (this.bot.talkBoxParams) {
      this.bot.talkBoxParams.headerColor = color.primaryColor;
    }
  }



  public toggle(evt: any): void {
    switch (evt.target.parentNode.id) {
      case 'start_button':
        this.start_button = !this.start_button;
        break;
      case 'background':
        this.background = !this.background;
        break;
      case 'header':
        this.header = !this.header;
        break;
      default:
        break;
    }
  }
}
