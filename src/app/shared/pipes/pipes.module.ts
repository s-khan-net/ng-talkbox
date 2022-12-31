import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightColorPipe } from './light-color/light-color.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LightColorPipe
  ],
  exports: [
    LightColorPipe
  ]
})
export class PipesModule { }
