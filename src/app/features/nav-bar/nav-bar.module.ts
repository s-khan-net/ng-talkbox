import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UserComponent } from './components/user/user.component';



@NgModule({
  declarations: [
    NavBarComponent,
    UserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NavBarModule { }
