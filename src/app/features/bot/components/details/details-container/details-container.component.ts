import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BotService } from 'src/app/core/services/bots/bot.service';
import { IBot } from 'src/app/models/bot.model';

@Component({
  selector: 'app-details-container',
  templateUrl: './details-container.component.html',
  styleUrls: ['./details-container.component.scss']
})
export class DetailsContainerComponent implements OnInit, OnChanges {

  @Input() public component: any;
  @Input() public bot!: IBot;
  constructor(private _botService: BotService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('conatiner - >', this.component)
    console.log('bot - >', this.bot)
  }

  ngOnInit(): void {

  }
  public save() {
    if (!this.bot.name) {
      alert('no name??')
    }
    else {
      this._botService.updateBot(this.bot).toPromise().then(res => console.log(res));
    }
  }

}
