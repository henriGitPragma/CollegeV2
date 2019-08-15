import { EmailValidator } from '@angular/forms';

export interface Collegien {
    // ? car c'est optionnel
    _id?: string;
    nomEleve?: string;
    prenomEleve?: string;
    mailEleve?: EmailValidator;
    classeEleve?: string;
    regimeEleve?: string;
    h_Arr?: Date; // On identitque l'heure de l'enregistrement
    h_Dep?: Date;// On identitque l'heure de l'enregistrement
    nomParent?: string;
    prenomParent?: string;
    qualiteParent?: string;
    username?: string;
    password?: string;
    passwordConfirme?: string;
    enable?: boolean,
    createdOn?: string;
}