import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsComponent } from 'src/app/features/bot/components/details/details.component';
import { IBot } from 'src/app/models/bot.model';

@Component({
  selector: 'app-bot-card',
  templateUrl: './bot-card.component.html',
  styleUrls: ['./bot-card.component.scss'],
  standalone: false
})
export class BotCardComponent implements OnInit, OnChanges {
  @Input() bot?: IBot;
  public s_boxshadow: string = '';
  public borderRadius = 7;
  public borderRadiusP = 'px';

  constructor(private _router: Router) { }

  ngOnChanges(): void {
    console.log('test bot-card onchanges')
    this.s_boxshadow = this.bot?.startUpParams?.startIconShadow.required ? this.bot.startUpParams.startIconShadow.style : '';
    if (this.bot?.startUpParams?.startIconRounded) {
      this.borderRadius = 50;
      this.borderRadiusP = '%';
    }
  }

  ngOnInit(): void {
  }

  public botDetails(bot?: IBot): void {
    if (bot) {
      console.log(bot);
      // this._router.navigate(['bot', {data :bot }])
      this._router.navigateByUrl(`/bot/${bot._id}`, { state: bot });
    }
  }

}
