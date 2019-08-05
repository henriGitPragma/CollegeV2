import { EmailValidator } from '@angular/forms';

export interface Collegien {
    // ? car c'est optionnel
    _id?: string;
    nomEleve?: String;
    prenomEleve?: String;
    mailEleve?: EmailValidator;
    classeEleve?: String;
    regimeEleve?: String;
    h_Arr?: Date; // On identitque l'heure de l'enregistrement
    h_Dep?: Date;// On identitque l'heure de l'enregistrement
    nomParent?: String;
    prenomParent?: String;
    qualiteParent?: String;
    username?: String;
    password?: String;
    passwordConfirme?: String;
    enable?: String,
    createdOn?: String;
}