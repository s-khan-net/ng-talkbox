import { Pipe, PipeTransform } from '@angular/core';
import { ConvTypes } from 'src/app/features/bot/components/details/bot-conv/bot-conv-type.enum';
import { convType, IConv } from 'src/app/models/bot.model';

@Pipe({
  name: 'convTypeAbbr'
})
export class ConvTypeAbbrPipe implements PipeTransform {

  transform(question: IConv): any {
    let res: any = {};
    if (question.type == convType.TEXT) {
      if (!question.responseValidation) {
        return ConvTypes.filter(x => { return x.name == 'TEXT' })[0];
      }
      else if (question.responseValidation == 'email') {
        return ConvTypes.filter(x => { return x.name == 'EMAIL' })[0];
      }
      else if (question.responseValidation == 'number') {
        return ConvTypes.filter(x => { return x.name == 'NUMERIC' })[0];
      }
    }
    if (question.type == convType.OPTION) {
      return ConvTypes.filter(x => { return x.name == 'OPTIONS' })[0]
    }
    return res;
  }

}
