import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lightColor',
})
export class LightColorPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return this.getLightColorFromBg(value);
  }

  private getLightColorFromBg(hex: string): string {
    if (hex == '#fff' || hex == '#ffffff') return this.getColor(undefined);
    let c = null;
    const rgb =
      hex
        .replace(
          /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
          (_m, r, g, b) => '#' + r + r + g + g + b + b
        )
        .substring(1)
        .match(/.{2}/g) || [].map((x) => parseInt(x, 16));
    if (rgb[0] >= rgb[1]) {
      if (rgb[0] >= rgb[2]) {
        c = 0;
      } else {
        c = 2;
      }
    } else {
      if (rgb[1] >= rgb[2]) {
        c = 1;
      } else {
        c = 2;
      }
    }
    return this.getColor(c);
  }
  private getColor(c?: number) {
    if (!c) {
      return '#f5f5f5';
    }
    switch (c) {
      case 0:
        return '#ffe6e6';
      case 1:
        return '#e6ffe6';
      case 2:
        return '#e6e6ff';
      default:
        return '#e6e6ff';
    }
  }
}
