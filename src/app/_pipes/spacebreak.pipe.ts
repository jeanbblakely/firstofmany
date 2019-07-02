import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spacebreak'
})
export class SpacebreakPipe implements PipeTransform {

  transform(text: string): string {
    text = text.trim();
    return text.replace(/\s+/g, '\n');
  }

}
