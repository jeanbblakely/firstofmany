import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spacebreak'
})
export class SpacebreakPipe implements PipeTransform {

  transform(text: string, maxChars: number = 10): string {
    text = text.trim();
    let words = text.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > maxChars) {
        let temp = words[i];
        words[i] = temp.substring(0, maxChars);
        words.splice(i + 1, 0, temp.substring(maxChars));
      }
    }
    let brokenText = words.join('\n');
    return brokenText;
  }

}
