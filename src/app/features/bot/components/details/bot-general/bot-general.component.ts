import { Component, Input, OnInit } from '@angular/core';
import { IBot } from 'src/app/models/bot.model';

@Component({
  selector: 'app-bot-general',
  templateUrl: './bot-general.component.html',
  styleUrls: ['./bot-general.component.scss'],
  standalone: false
})
export class BotGeneralComponent implements OnInit {

  constructor() { }
  @Input() public bot!: IBot;

  ngOnInit(): void {
  }

}
