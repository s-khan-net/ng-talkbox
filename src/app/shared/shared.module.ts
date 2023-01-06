import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorComponent } from './components/error/error.component';
import { PipesModule } from './pipes/pipes.module';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { BotAccordianComponent } from './components/bot-accordian/bot-accordian.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    LoaderComponent,
    ErrorComponent,
    ToggleButtonComponent,
    BotAccordianComponent,
    TextEditorComponent,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule
  ],
  exports: [
    NotFoundComponent,
    LoaderComponent,
    ErrorComponent,
    PipesModule,
    ToggleButtonComponent,
    BotAccordianComponent,
    TextEditorComponent
  ]
})
export class SharedModule { }
