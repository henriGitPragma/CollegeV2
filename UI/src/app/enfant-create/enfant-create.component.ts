
import { CollegeService } from '../service/college.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ConfirmCreateComponent } from '../confirm-create/confirm-create.component';
import { MatDialog } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


//----------------------------------------------------------------------------
//-----------------------Export pour filtrer les classes---------------------
//----------------------------------------------------------------------------

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

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------

  creationForm: FormGroup;

  newEnfantValues: any;
  mdp: String = '';

/*   searchOptions: Observable<DataSearch[]>;
 */
  nbLocalStorage: number;
  admin: any;

  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(private formBuilder: FormBuilder,
    private collegeService: CollegeService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------

  ngOnInit() {

    //Creation du formulaire
    this.createForm();

    //------------------------------------Init de la recherche --------------------------------------------------------------------
    /* this.searchOptions = this.searchForm.get('DataSearch')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      ); */

    //Verification si connextion et admin
    this.admin = sessionStorage.getItem("admin");
    this.nbLocalStorage = sessionStorage.length;
    console.log(this.nbLocalStorage);
    if (this.nbLocalStorage == 0) {
      this.router.navigate(['/auth'])
    }
    if (this.admin == "false") {
      this.router.navigate(['/accueilUser'])
    }
  };


  //------------------------------------------------------------------------------
  //--------Creation de la structure du formulaire a l'initialisation-------------
  //------------------------------------------------------------------------------

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
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirme: ['', Validators.required],
      enable: '',

    });
  };

  //------------------------------------------------------------------------------
  //----------------------Creation d'un élève appelé au Submit du formulaire------
  //------------------------------------------------------------------------------

  //Creation de l'élève
  createEnfant(formDirective: FormGroupDirective) {

    if (this.creationForm.valid) {
      console.log('Donnée du formulaire', this.creationForm.value);

      if (this.creationForm.value.password == this.creationForm.value.passwordConfirme) {
        //On sauve le formulaire creationForm
        /* this.collegeService.createEnfant(this.creationForm.value)
          .subscribe(data => this.handleSuccessCreateEnfant(data, formDirective), error => this.handleErrorCreateEnfant(error)); */
      } else {
        console.log(this.mdp = "Mot de passe non Valide");
      }
    };
  };

  //Succes >> this.collegeService.getData()
  handleSuccessCreateEnfant(data, formDirective) {
    console.log(`Sucess de la creation d'un utilisateur ${data}`);
    this.openDialog();
    this.newEnfantValues = data;
    console.log('newEnfantValues', this.newEnfantValues);
    this.creationForm.reset();
    formDirective.resetForm();
/*     this.collegeService.dispatchEnfantCreated(data._id);
 */  };

  //Succes >> this.collegeService.getData()
  handleErrorCreateEnfant(error) {
    console.error('echec', error);
  };

  //-----------------------------------------------------------------------------
  //----------------------Confirmation de la creation-----------------------------
  //------------------------------------------------------------------------------

  //Ouverture de la popup de confirmation
  openDialog() {
    console.log('dans openDialog');
    this.dialog.open(ConfirmCreateComponent, { // On va dans  ConfirmCreateComponent
      width: '40%', //On gere la taille de la popo-up
      height: '20%',
    });
  };

  //---------------------------------------------------------------------
  //----------------------Affichage de classe-----------------------------
  //----------------------------------------------------------------------

  //Permet d'afficher les classes sous forme de liste
  searchForm: FormGroup = this.formBuilder.group({
    DataSearch: '',
  });

  /* dataSearchs: DataSearch[] = [{
    classe: '6ème',
    classeDetail: ['6A', '6B', '6C', '6D', '6E', '6F']
  }, {
    classe: '5ème',
    classeDetail: ['5A', '5B', '5C', '5D', '5E', '5F']
  }, {
    classe: '4ème',
    classeDetail: ['4A', '4B', '4C', '4D', '4E', '4F']
  }, {
    classe: '3ème',
    classeDetail: ['3A', '3B', '3C', '3D', '3E', '3F']
  }]; */

  /* private _filterGroup(value: string): DataSearch[] {
    if (value) {
      return this.dataSearchs
        .map(group => ({ classe: group.classe, classeDetail: _filter(group.classeDetail, value) }))
        .filter(group => group.classeDetail.length > 0);
    }
    return this.dataSearchs;
  }; */

}
