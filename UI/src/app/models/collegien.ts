import { EmailValidator } from '@angular/forms';

export interface Collegien {
    // ? car c'est optionnel
    _id?: string;
    nomEleve?: string;
    prenomEleve?: string;
    email?: string;
    classeEleve?: string;
    regimeEleve?: string;
    date?:[{
        h_Arr?: Date; // On identitque l'heure de l'enregistrement
        h_Dep?: Date;// On identitque l'heure de l'enregistrement
    }];
    nomParent?: string;
    prenomParent?: string;
    qualiteParent?: string;
    username?: string;
    createdOn?: string;
    nomRole?: string;
}