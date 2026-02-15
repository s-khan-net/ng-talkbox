import { Pipe, PipeTransform } from '@angular/core';
import { IConv } from 'src/app/models/bot.model';

@Pipe({
    name: 'convDisplay',
    standalone: false
})
export class ConvDisplayPipe implements PipeTransform {

  transform(conv: any, id: any): [IConv] {
    let res = []
    if (conv && id) {
      res = conv.filter((x: any) => {
        return x.id.toString() == id.toString();
      });
    }
    return res
  }
}
