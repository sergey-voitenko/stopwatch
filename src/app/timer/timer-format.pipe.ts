import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerFormatter'
})
export class TimerFormatterPipe implements PipeTransform {

  transform(value: number): string {
    let time = '';
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor(value / 60) - (60 * hours);
    const seconds = value - (3600 * hours) - (60 * minutes);

    time += hours < 10 ? '0' + hours + ':' : hours + ':';
    time += minutes < 10 ? '0' + minutes + ':' : minutes + ':';
    time += seconds < 10 ? '0' + seconds : seconds;

    return time;
  }

}
