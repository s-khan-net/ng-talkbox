import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BotPages } from './bot-pages.config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public openSidebar: boolean = true;
  public pages = BotPages;
  @Output() selectedPage = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  public toggleSidebar(): void {
    this.openSidebar = !this.openSidebar;
  }

  public openPage(page: any): void {
    this.selectedPage.emit(page);
  }
}
