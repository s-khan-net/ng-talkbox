import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BotPages } from './bot-pages.config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false
})
export class SidebarComponent implements OnInit {

  public openSidebar: boolean = true;
  public pages = BotPages;
  public selected: any;
  @Output() selectedPage = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  public toggleSidebar(): void {
    this.openSidebar = !this.openSidebar;
  }

  public openPage(page: any): void {
    this.selected = page
    this.selectedPage.emit(page);
  }
}
