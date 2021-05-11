import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ago'
})
export class AgoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    return this.secondsToHms(value);
  }

  public secondsToHms(d): string {

    if (d <= 0) return "Eben gerade"

    d = Number(d / 1000);
    var days = Math.floor((d / 3600) / 24);

    var daysDisplay = days > 0 ? days + (days == 1 ? " Tag" : " Tagen") : "";
    if (days > 0) return "Vor " + daysDisplay

    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " Stunde, " : " Stunden, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " Minute, " : " Minuten, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " Sekunde" : " Sekunden") : "";

    return "Vor " + daysDisplay + hDisplay + mDisplay + sDisplay;
  }

}
