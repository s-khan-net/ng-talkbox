import { Component, Input, OnInit } from '@angular/core';
import { IBot } from 'src/app/models/bot.model';

@Component({
  selector: 'app-background-ui',
  templateUrl: './background-ui.component.html',
  styleUrls: ['./background-ui.component.scss'],
  standalone: false
})
export class BackgroundUiComponent implements OnInit {

  @Input() bot!: IBot;
  constructor() { }

  ngOnInit(): void {
  }

}
