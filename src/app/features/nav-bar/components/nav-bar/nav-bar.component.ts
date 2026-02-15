import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: false
})
export class NavBarComponent implements OnInit {

  constructor() { }
  navbarOpen: boolean = false;
  ngOnInit(): void {
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
