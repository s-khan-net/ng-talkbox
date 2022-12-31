import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bot-accordian',
  templateUrl: './bot-accordian.component.html',
  styleUrls: ['./bot-accordian.component.scss']
})
export class BotAccordianComponent implements OnInit, OnChanges {

  @Input() public title: string = '';
  @Input() public parentData: any;
  @Input() public showPanel: boolean = false;

  constructor() { }
  public ngOnChanges(): void {
    console.log(this.parentData);
  }

  ngOnInit(): void {
  }

  public toggle(): void {
    this.showPanel = !this.showPanel;
  }
}
