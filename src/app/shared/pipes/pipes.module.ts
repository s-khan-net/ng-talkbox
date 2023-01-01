import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightColorPipe } from './light-color/light-color.pipe';
import { ConvDisplayPipe } from './conv-display/conv-display.pipe';
import { ConvTypeAbbrPipe } from './conv-type-abbr/conv-type-abbr.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LightColorPipe,
    ConvDisplayPipe,
    ConvTypeAbbrPipe
  ],
  exports: [
    LightColorPipe,
    ConvDisplayPipe,
    ConvTypeAbbrPipe
  ]
})
export class PipesModule { }
