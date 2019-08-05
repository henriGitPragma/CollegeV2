import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toShortDate'
})
export class ToShortDatePipe implements PipeTransform {

  // la but est de transformer la date recupere dans le formulaire  en une date plus propre
  transform(value: any, args?: any): any {
    //on recupere la value
    console.log(value);
    
    // convertir en minuscule + On test si la valeur est ASAP as soon as
    if (value.toLowerCase() === 'asap') {
      return 'Des que possible';
      //Si elle comporte es tirets
    } else if (value.indexOf('-') > -1) {
      let fullDate, rest;
      //On met chaque coter du T dans des variables
      [fullDate, rest] = value.toLowerCase().split('t'); //2098-09-01T10:23:45Z <<<<'T'

      //On prend le coter heure/min/sec Z et on separe  heure/min/sec  et Z
      let avant_Z, apres_Z;
      [avant_Z, apres_Z] = rest.toLowerCase().split('z'); //2098-09-01T10:23:45Z <<<<'Z' */

      //On traite uniquement le coté avant Z
      //on recupere heure/min/sec séparement
      let heure, min, sec;
      [heure, min, sec] = avant_Z.split(':');

      //On recupere year/month/date séparerment
      let year, month, date;
      [year, month, date] = fullDate.split('-'); //['2017', '06', '01']

      //On choisit comment on veut que la date s'affiche
      return `le ${date}/${month}/${year} à ${heure}:${min}`;

      //Si pas de ces cas de cités
    } else {
      return '---';
    }
  }
}
