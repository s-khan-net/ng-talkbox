import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UserComponent } from './components/user/user.component';
import { ClickOutsideDirective } from 'src/app/shared/directives/click-outside.directive';



@NgModule({
  declarations: [
    NavBarComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    ClickOutsideDirective
  ]
})
export class NavBarModule { }
