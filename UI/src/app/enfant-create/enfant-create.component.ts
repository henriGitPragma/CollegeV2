import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


//------------------------------------Exports pour filter les classes --------------------------------------------------------------------
export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-enfant-create',
  templateUrl: './enfant-create.component.html',
  styleUrls: ['./enfant-create.component.css'],
})
export class EnfantCreateComponent implements OnInit {

  //------------------------------------Variables--------------------------------------------------------------------

  creationForm: FormGroup;
  newEnfantValues: any;
  allform = [];
  nbLocalStorage: number;
  admin: any;

  //-------------------------Constructeur + Injection de dépendances --------------------------------------------------------------------

  constructor(private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router) { }

  //------------------------------------Initialisation --------------------------------------------------------------------

  ngOnInit() {
    this.createForm();

  };

  //-------------------------------------Recuperation des données du formulaire --------------------------------------------------------------------
  createForm() {
    this.creationForm = this.formBuilder.group({
      nomEleve: ['', Validators.required],
      prenomEleve: ['', Validators.required],
      mailEleve: ['', Validators.required],
      classeEleve: ['', Validators.required],
      regimeEleve: ['', Validators.required],
      nomParent: ['', Validators.required],
      prenomParent: ['', Validators.required],
      qualiteParent: ['', Validators.required],
    });
  };

  //--------------------------------------------Methodes--------------------------------------------------------------------

  //-------------------------------------Methode de creation des éleves --------------------------------------------------------------------

  createEnfant(formDirective: FormGroupDirective) {
    if (this.creationForm.valid)
      console.log('dans createEnfant', this.creationForm.value);
   /*  this.collegeService.createEnfant(this.creationForm.value)
      .subscribe(data => this.handleSuccess(data, formDirective), error => this.handleError(error)); */
  };

  //Appele en cas de succes
  handleSuccess(data, formDirective) {
    console.log('ok', data);
    this.newEnfantValues = data;
    console.log('newEnfantValues', this.newEnfantValues);
    this.creationForm.reset();
    formDirective.resetForm();
  };

  //Appele en cas d'error
  handleError(error) {
    console.error('echec', error);
  };



  //------------------------------------Variables de FormBuilder pour l'affichage des classes --------------------------------------------------------------------

  searchForm: FormGroup = this.formBuilder.group({
    DataSearch: '',
  });

}
