import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './components/details/details.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DetailsContainerComponent } from './components/details/details-container/details-container.component';
import { BotUiDesignComponent } from './components/details/bot-ui-design/bot-ui-design.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { StartButtonUiComponent } from './components/details/bot-ui-design/start-button-ui/start-button-ui.component';
import { BackgroundUiComponent } from './components/details/bot-ui-design/background-ui/background-ui.component';
import { HeaderUiComponent } from './components/details/bot-ui-design/header-ui/header-ui.component';
import { PageViewUiComponent } from './components/details/bot-ui-design/page-view-ui/page-view-ui.component';
import { BotConvComponent } from './components/details/bot-conv/bot-conv.component';
import { ConvEditModalComponent } from './components/details/bot-conv/conv-edit-modal/conv-edit-modal.component';
import { TalkboxComponent } from './components/details/bot-ui-design/page-view-ui/talkbox/talkbox.component';
import { BotSettingsComponent } from './components/details/bot-settings/bot-settings.component';
import { TypeTextComponent } from './components/details/bot-conv/conv-edit-modal/type-text/type-text.component';
import { TypeOptionComponent } from './components/details/bot-conv/conv-edit-modal/type-option/type-option.component';
import { BotGeneralComponent } from './components/details/bot-general/bot-general.component';
import { BotPreviewComponent } from './components/details/details-container/bot-preview/bot-preview.component';

@NgModule({
  declarations: [
    DetailsComponent,
    SidebarComponent,
    DetailsContainerComponent,
    BotUiDesignComponent,
    StartButtonUiComponent,
    BackgroundUiComponent,
    HeaderUiComponent,
    PageViewUiComponent,
    BotConvComponent,
    ConvEditModalComponent,
    TalkboxComponent,
    BotSettingsComponent,
    TypeTextComponent,
    TypeOptionComponent,
    BotGeneralComponent,
    BotPreviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    ColorPickerModule
  ]
})
export class BotModule { }
