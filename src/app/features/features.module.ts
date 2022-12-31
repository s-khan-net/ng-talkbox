import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BotModule } from './bot/bot.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    NavBarModule,
    LoginModule,
    DashboardModule,
    BotModule
  ]
})
export class FeaturesModule { }
