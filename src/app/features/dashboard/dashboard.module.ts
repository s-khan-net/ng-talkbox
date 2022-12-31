import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BotCardComponent } from './components/bot-card/bot-card.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';



@NgModule({
  declarations: [
    DashboardComponent,
    BotCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
