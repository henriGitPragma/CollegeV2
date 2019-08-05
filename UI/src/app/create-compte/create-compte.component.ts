import { Collegien } from './../models/collegien';
import { CollegeService } from './../service/college.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-compte',
  templateUrl: './create-compte.component.html',
  styleUrls: ['./create-compte.component.css'],
})
export class CreateCompteComponent implements OnInit {

  //------------------------------------------------------------------------
  //------------------------------------------------------------------------
  // Exemple d'Url envoyé lors du mail pour crééer le compte
  //------------------------------------------------------------------------
  //------------------------------------------------------------------------

  /* http://localhost:4200/createCompte/5d023e002e72e109f0ed8e21
  http://localhost:4200/createCompte/5d023e002e72e109f0ed8e21,5d023dff2e72e109f0ed8e02,5d023e002e72e109f0ed8e55
    */


  //------------------------------------------------------------------------
  //----------------------Variables-----------------------------------------
  //------------------------------------------------------------------------

  id: string;
  ids: string[] = [];
  virgule: string = ",";

  //Formulaire
  editForm: FormGroup;

  //Affichage des entetes de la tables
  public displayedColumns = ['nomEleve',
    'prenomEleve',
    'classeEleve',
    'regimeEleve',
    'mailEleve',
    'nomParent',
    'prenomParent',
    'qualiteParent',
    'username',
    'password'];

  public dataSource = new MatTableDataSource<Collegien>();

  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(private activatedRoute: ActivatedRoute,
    private collegeService: CollegeService,
    private formBuilder: FormBuilder) { }

  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------

  ngOnInit() {

    //On recupere les IDS
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    // >>>>>>>>>>   1   <<<<<<<<<
    //On split les Id sur la virgule
    this.splitString(this.id, this.virgule)

    // >>>>>>>>>>   2   <<<<<<<<<
    //On recupere les eleves en fonctions des IDS
    /* this.collegeService.getManyId(this.ids)
      .subscribe(res => this.handleSucessGetManyId(res), error => this.handleErrorGetManyId(error)); */

    // >>>>>>>>>>   3   <<<<<<<<<
    //Appel de la methode edition pour recuperer les données du formulaire
    this.edit();

  }

  //------------>>>>>>>>>>   1   <<<<<<<<<-------------------------------
  //-----------------------Split-----------------------------------------
  //---------------------------------------------------------------------

  //Methode pour split sur la virgule
  splitString(stringToSplit, separator) {
    this.ids = stringToSplit.split(separator);

    console.log('La chaine d\'origine est : "' + stringToSplit + '"');
    console.log('Le délimiteur est : "' + separator + '"');
    console.log("Le tableau comporte " + this.ids.length + " elements : ");

    for (let i = 0; i < this.ids.length; i++)
      console.log(this.ids[i]);
  }


  //------------------->>>>>>>>>>   2   <<<<<<<<<-----------------------
  //-----------------Recuperation des données par ID---------------------
  //---------------------------------------------------------------------

  //Succes >> this.collegeService.getManyId(this.ids)
  handleSucessGetManyId(data) {
    console.log('Données recuperée dans handleSucessGetManyId ', data)
    this.dataSource.data = data as Collegien[];
  }

  //Error >> this.collegeService.getManyId(this.ids)
  handleErrorGetManyId(err) {
    console.log('echec dans handleErrorGetManyId', err)
  }

  //------------------->>>>>>>>>>   3   <<<<<<<<<----------------------
  //-----------------Recuperation des données du formulaire--------------
  //---------------------------------------------------------------------

  //Donnée du formulaire
  edit() {
    this.editForm = this.formBuilder.group({
      username: '',
      password: '',
      passwordConfirme: '',
    });
  }


  //--------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------
  //-------------UPDATE des login du compte par l'utilisateur-----------------------
  //--------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------


  //Update Global
  isEditionMode: string = "";

  //-------------Modification du username/lOGIN--------------------------------------------------------------------------------------

  //Variables
  isCheckedUsername;
  isAlreadyUse: string;


  //On gere le changement d'etat
  onChangeUsername(newValue) {
    console.log('nouvelle valeur du username', newValue);

    if (newValue == '') {
      this.isCheckedUsername = true;
    } else {
      /* this.collegeService.searchChild(newValue)
        .subscribe(res => this.handleSucessNewValue(res), err => this.handleErrorNewValue(err)); */
    }
  }

  //Succes >> this.collegeService.searchChild(newValue)
  handleSucessNewValue(data) {
    console.log('recuperation de newValue', data)
    if (data.length == 0) {
      this.isAlreadyUse = "";
      this.isCheckedUsername = false;
    } else {
      this.isAlreadyUse = "Login deja utilisé"
      this.isCheckedUsername = null;

    }
  }

  //Error >> this.collegeService.searchChild(newValue)
  handleErrorNewValue(err) {
    console.log(' ECHEC recuperation de newValue', err);
  }


  //-------------Modification du Mot de passe---------------------------------------------------------------------------------------

  isCheckedPasswordConfirme;
  isCheckedPassword;

  //On gere le changement d'etat sur PASSWORD
  onChangePassword(newValue) {
    console.log('nouvelle valeur de password', newValue);

    if ((newValue == this.editForm.value.passwordConfirme) && (newValue != 0)) {
      console.log('mdp SIMILAIRE');
      this.isCheckedPasswordConfirme = false;
      this.isCheckedPassword = false;
    } else {
      console.log('mdp NON  SIMILAIRE');
      this.isCheckedPassword = true;
      this.isCheckedPasswordConfirme = true;
    }
    if ((this.editForm.value.password == 0) && (this.editForm.value.passwordConfirme == 0))
      this.isCheckedPasswordConfirme = false;

  }

  //On gere le changement d'etat sur PASSWORDconfirmE
  onChangePasswordConfirme(newValue) {
    console.log('nouvelle valeur de passwordConfirme', newValue);
    if (newValue == this.editForm.value.password) {
      console.log('mdp SIMILAIRE');
      this.isCheckedPasswordConfirme = false;
      this.isCheckedPassword = false;

    } else {
      console.log('mdp NON  SIMILAIRE');
      this.isCheckedPasswordConfirme = true;
      this.isCheckedPassword = true;
    }

    if ((this.editForm.value.password == 0) && (this.editForm.value.passwordConfirme == 0))
      this.isCheckedPasswordConfirme = false;

  }

  //Affichage du bouton en fonction de la validation du formulaire
  isValid() {
    if (this.isCheckedUsername == false && this.isCheckedPasswordConfirme == false && this.isCheckedPassword == false) {
      return true;
    } else {
      return false;
    }
  }

  //-----------------------------------------------------------------
  //-------------Appelé au Submit du formualire----------------------
  //-----------------------------------------------------------------

  //Modification  des données de connextion
  updateUsername() {
    console.log('Update de tous les champs');
    /* this.collegeService.createCompte(this.ids, this.editForm.value)
      .subscribe(res => this.handleSucesssCreateCompte(res), err => this.handleSucessErroCreateCompte(err)) */
  }

  //Succes >> this.collegeService.createCompte(this.ids, this.editForm.value)
  handleSucesssCreateCompte(data) {
    console.log('Creation du login effectué dans handleSucesssCreateCompte ', data)

    for (let i = 0; i < this.dataSource.data.length; i++) {
      for (let j = 0; j < this.ids.length; j++) {
        if (this.dataSource.data[i]._id == this.ids[j]) {
          console.log('ID trouvé');
          this.dataSource.data[i].username = this.editForm.value.username;
          this.dataSource.data[i].password = this.editForm.value.password;
        } else {
          console.log('ID non trouvé');
        };
      }

    };
  }

  //Error >> this.collegeService.createCompte(this.ids, this.editForm.value)
  handleSucessErroCreateCompte(err) {
    console.log('echec de la creation dans handleSucessErroCreateCompte ', err);
  }


}

