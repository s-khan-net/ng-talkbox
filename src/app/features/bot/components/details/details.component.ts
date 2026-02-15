import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { IBot } from 'src/app/models/bot.model';
import { ActivatedRoute } from '@angular/router';
import { BotService } from '../../../../core/services/bots/bot.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: false
})
export class DetailsComponent implements OnInit {

  public bot: IBot = { name: '' };
  public page: any;
  constructor(private _location: Location, private _activeRoute: ActivatedRoute, private _botService: BotService) { }


  ngOnInit(): void {
    let state: any = this._location.getState();
    if (state) {
      if (this.getBotFromState(state)) {
        console.log(this.bot);
      }
    }
    this._checkForBot();
  }
  private getBotFromState(state: any): boolean {

    this.bot = JSON.parse(JSON.stringify(state))
    return true;
  }

  public async getPage($event: any): Promise<void> {
    console.log($event);
    this._checkForBot();
    this.page = $event;
  }

  private async _checkForBot(): Promise<void> {
    let botId = this._activeRoute.snapshot.paramMap.get('id') || '';
    if (this.bot._id === undefined) {
      console.log('getbot with bot id');
      this.bot = await this._botService.getBot(botId).toPromise();
    }
  }

}
