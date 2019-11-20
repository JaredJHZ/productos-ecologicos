import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {

  transform(name: string): any {
    let nombre = name.split(' ');
    if (nombre.length > 2) {
      return nombre[2];
    }  else {
      return nombre[0];
    }
  }

}
