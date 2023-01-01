import { Pipe, PipeTransform } from '@angular/core';
import { IConv } from 'src/app/models/bot.model';

@Pipe({
  name: 'convDisplay'
})
export class ConvDisplayPipe implements PipeTransform {

  transform(conv: any, id: any, value: any): [IConv] {
    return conv.filter((x: any) => {
      return x.id == `${id}${value}`;
    });
  }

}
