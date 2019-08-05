import { CollegeService } from './../service/college.service';
import { Collegien } from '../models/collegien';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdvanceAdminComponent } from '../advance-admin/advance-admin.component';
import { AdvanceAdmin2Component } from '../advance-admin2/advance-admin2.component';



@Component({
  selector: 'app-list-global',
  templateUrl: './list-global.component.html',
  styleUrls: ['./list-global.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListGlobalComponent implements OnInit, AfterViewInit {

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public displayedColumns = ['nomEleve', 'prenomEleve', 'classeEleve'];
  public dataSource = new MatTableDataSource<Collegien>();



  nbLocalStorage: number;
  admin: any;

  //Formulaire
  editForm: FormGroup;

  //Date
  date: any;
  heures: any;
  minutes: any;
  secondes: any;

  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(private collegeService: CollegeService,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder) { }

  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------

  ngOnInit() {

    //Appel de la methode edition pour recuperer les données du formulaire
    this.edit();

    //Recuperation des données
    this.getAllCollegien();

    //Verification si connextion et admin
   /*  this.admin = sessionStorage.getItem("admin");
    this.nbLocalStorage = sessionStorage.length;
    console.log(this.nbLocalStorage);
    console.log(this.admin);
    if (this.nbLocalStorage == 0) {
      this.router.navigate(['/auth'])
    }
    if (this.admin == "false") {
      console.log('dans le false')
      this.router.navigate(['/accueilUser'])
    } */


    /* setInterval(() => { this.afficherdatetime(); }, 1000); */

  }


  //--------------Implementation de l'interface AfterViewInit--------------------
  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------

  //Pagination et trie
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  //----------------------------------------------------------------------
  //-----------------------Filtre-----------------------------------------
  //----------------------------------------------------------------------





  //----------------------------------------------------------------------
  //-----------------------Close-----------------------------------------
  //----------------------------------------------------------------------

  //Permet de reset tous les boutons lors de la fermeture de l'animation
/*   closeAll() {
    console.log("reset des boutons de update");
    this.isEditionMode = " ";
    this.isCheckedNomEleve = null;
    this.isCheckedPrenomEleve = null;
    this.isCheckedClasseEleve = null;
    this.isCheckedMailEleve = null;
    this.isCheckedRegimeEleve = null;
    this.isCheckedNomParent = null;
    this.isCheckedPrenomParent = null;
    this.isCheckedQualiteParent = null;
    this.isCheckedUsername = null;
    this.isCheckedPasswordConfirme = null;

  } */


  //---------------------------------------------------------------------
  //-----------------------All Collegien------------------------------------
  //-------------------------------------------------------------------

  //Recuperation de toutes les données
  getAllCollegien = () => {
   /*  this.collegeService
      .getCollegien()
      .subscribe(res => {
        this.dataSource.Collegien = res as Collegien[];
      }) */
  }

  //----------------------------------------------------------------------
  //-----------------------Formulaire-------------------------------------
  //----------------------------------------------------------------------

  //Recuperation des données du formulaire
  edit() {
    this.editForm = this.formBuilder.group({
      nomEleve: '',
      prenomEleve: '',
      classeEleve: '',
      mailEleve: '',
      regimeEleve: '',
      nomParent: '',
      prenomParent: '',
      qualiteParent: '',
      username: '',
      password: '',
      passwordConfirme: '',
      enable: '',
    });
  }


  //----------------------------------------------------------------------
  //-----------------------OpenDialog-------------------------------------
  //----------------------------------------------------------------------

  //Pop up  qui s'ouvre pour chaque client
  other(Collegien) {
    console.log('dans opendialog other', Collegien);
    this.dialog.open(AdvanceAdminComponent, { // On va dans  ConfirmDeleteComponent
      width: '25%', //gere la taille de la pop-up
      height: '20%',
/*       Collegien: { Collegien } //On lui passe les données de suppression recuperrer dans la list
 */    });
  }

  //Pop up global
  otherAll() {
    console.log('dans opendialog otherAll');
    this.dialog.open(AdvanceAdmin2Component, { // On va dans  ConfirmDeleteComponent
      width: '30%', //gere la taille de la pop-up
      height: '30%',
    });
  }




  //------------------------------------------------------------------------------
  //----------------------UPDATE-------------------------------------------------
  //------------------------------------------------------------------------------

  //Update Global
  isEditionMode: string = "";

  //-------------Modification du nom ELEVE----------------------------------------

  //Variables
  isCheckedNomEleve;

  //On gere le CLICK
  checkedNomEleve() {
    console.log('dans checked checkedNomEleve');
    this.isEditionMode = "Mode Edition";
  };

  //On gere le changement d'etat
  onChangeNomEleve(newValue) {
    console.log('nouvelle valeur du nom', newValue);
    this.isCheckedNomEleve = true;
  };

  updateNomEleve(Collegien) {
    console.log('Dans update nomEleve', Collegien);
    console.log(`Recuperation de ID ${Collegien._id} et du nomEleve de base ${this.editForm.value.nomEleve}`);

    //nomEleve
    console.log('nomEleve RENVOYE >>>>AVEC<<<< modification', this.editForm.value.nomEleve);
   /*  this.collegeService.updateNomEleve(Collegien._id, this.editForm.value.nomEleve)
      .subscribe(Collegien => this.handleSucessUpdateNomEleve(Collegien), err => this.handleErrorUpdateNomEleve(err)); */
  }

  //Succes >> this.collegeService.updateNomEleve(Collegien._id, this.editForm.value.nomEleve)
  handleSucessUpdateNomEleve(Collegien) {
    console.log('Nom modifié', Collegien.response.nomEleve);
    this.isCheckedNomEleve = false;

   /*  for (let i = 0; i < this.dataSource.Collegien.length; i++) {
      if (this.dataSource.Collegien[i]._id == Collegien.response._id) {
        console.log('ID trouvé');
        this.dataSource.Collegien[i].nomEleve = Collegien.response.nomEleve;
      } else {
        console.log('ID non trouvé');
      };
    }; */
  };

  //Error >> this.collegeService.updateNomEleve(Collegien._id, this.editForm.value.nomEleve)
  handleErrorUpdateNomEleve(err) {
    console.log(`Error ${err}`);
  };

  //-------------Modification du prenom ELEVE----------------------------

  //Variables
  isCheckedPrenomEleve;

  //On gere le CLICK
  checkedPrenomEleve() {
    console.log('dans checked checkedPrenomEleve');
    this.isEditionMode = " Mode Edition";
  };

  //On gere le changement d'etat
  onChangePrenomEleve(newValue) {
    console.log('nouvelle valeur du prenom', newValue);
    this.isCheckedPrenomEleve = true;
  };


  updatePrenomEleve(Collegien) {
    console.log('Dans update prenomEleve', Collegien);
    console.log(`Recuperation de ID ${Collegien._id} et du PrenomEleve de base ${this.editForm.value.prenomEleve}`);

    //prenomEleve
    console.log('prenomEleve RENVOYE >>>>AVEC<<<< modification', this.editForm.value.prenomEleve);
    /* this.collegeService.updatePrenomEleve(Collegien._id, this.editForm.value.prenomEleve)
      .subscribe(Collegien => this.handleSucessUpdatePrenomEleve(Collegien), err => this.handleErrorUpdatePrenomEleve(err));
 */

  }

  //Succes >> this.collegeService.updatePrenomEleve(Collegien._id, this.editForm.value.prenomEleve)
  handleSucessUpdatePrenomEleve(Collegien) {
    console.log('Prenom modifié', Collegien.response.prenomEleve);
    this.isCheckedPrenomEleve = false;

   /*  for (let i = 0; i < this.dataSource.Collegien.length; i++) {
      if (this.dataSource.Collegien[i]._id == Collegien.response._id) {
        console.log('ID trouvé');
        this.dataSource.Collegien[i].prenomEleve = Collegien.response.prenomEleve;
      } else {
        console.log('ID non trouvé');
      };
    }; */

  };

  //Error >> this.collegeService.updatePrenomEleve(Collegien._id, this.editForm.value.prenomEleve)
  handleErrorUpdatePrenomEleve(err) {
    console.log(`Error ${err}`);
  };

  //-------------Modification du classe ELEVE---------------------------------
/* 
  //Variables
  isCheckedClasseEleve;

  //On gere le CLICK
  checkedClasseEleve() {
    console.log('dans checked isCheckedClasseEleve');
    this.isEditionMode = " Mode Edition"
  };

  //On gere le changement d'etat
  onChangeClasseEleve(newValue) {
    console.log('nouvelle valeur de la  classe', newValue);
    this.isCheckedClasseEleve = true;
  };

  updateClasseEleve(Collegien) {
    console.log('Dans update classeEleve', Collegien);
    console.log(`Recuperation de ID ${Collegien._id} et du classeEleve de base ${this.editForm.value.classeEleve}`);
    console.log('Collegien.classeEleve', Collegien.classeEleve);
    console.log('this.editForm.value.classeEleve', this.editForm.value.classeEleve);

    //classeEleve
    this.editForm.value.classeEleve = this.editForm.value.classeEleve.toUpperCase();

    console.log('classeEleve RENVOYE >>>>AVEC<<<< modification', this.editForm.value.classeEleve);
    this.collegeService.updateClasseEleve(Collegien._id, this.editForm.value.classeEleve)
      .subscribe(Collegien => this.handleSucessUpdateClasseEleve(Collegien), err => this.handleErrorUpdateClasseEleve(err));

  }

  //Succes >> this.collegeService.updateClasseEleve(Collegien._id, this.editForm.value.classeEleve)
  handleSucessUpdateClasseEleve(Collegien) {
    console.log('Classe modifié', Collegien.response.classeEleve);
    this.isCheckedClasseEleve = false;

    for (let i = 0; i < this.dataSource.Collegien.length; i++) {
      if (this.dataSource.Collegien[i]._id == Collegien.response._id) {
        console.log('ID trouvé');
        this.dataSource.Collegien[i].classeEleve = Collegien.response.classeEleve;
      } else {
        console.log('ID non trouvé');
      };
    };

  };

  //Error >> this.collegeService.updateClasseEleve(Collegien._id, this.editForm.value.classeEleve)
  handleErrorUpdateClasseEleve(err) {
    console.log(`Error ${err}`);
  };

  //-------------Modification du mail ELEVE----------------------------------------------------------------------------------------

  //Variables
  isCheckedMailEleve;
  regexTerm;
  validEmail: boolean;

  checkedMailEleve() {
    console.log('dans checked isCheckedMailEleve');
    this.isEditionMode = " Mode Edition";
  }

  //Regex pour le mail
  onChangeMailEleve(newValue) {
    console.log('nouvelle valeur d\'email');
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validEmailRegEx.test(newValue)) {
      this.validEmail = true;
      console.log('mail ok');
      this.isCheckedMailEleve = true;
    } else {
      this.validEmail = false;
      console.log('echec')
      this.isCheckedMailEleve = false;
    }
  }

  updateMailEleve(Collegien) {
    console.log('Dans update classeEleve', Collegien);
    console.log(`Recuperation de ID ${Collegien._id} et du mailEleve de base ${this.editForm.value.mailEleve}`);
    console.log('Collegien.mailEleve', Collegien.mailEleve)
    console.log('this.editForm.value.mailEleve', this.editForm.value.mailEleve)


    //mailEleve
    console.log('mailEleve RENVOYE >>>>AVEC<<<< modification', this.editForm.value.mailEleve);

    this.collegeService.updateMailEleve(Collegien._id, this.editForm.value.mailEleve)
      .subscribe(Collegien => this.handleSucessUpdateMailEleve(Collegien), err => this.handleErrorUpdateMailEleve(err));

  }

  //Succes >> this.collegeService.updateMailEleve(Collegien._id, this.editForm.value.mailEleve)
  handleSucessUpdateMailEleve(Collegien) {
    console.log('Mail modifié', Collegien.response.mailEleve);
    this.isCheckedMailEleve = 'ok';

    for (let i = 0; i < this.dataSource.Collegien.length; i++) {
      if (this.dataSource.Collegien[i]._id == Collegien.response._id) {
        console.log('ID trouvé');
        this.dataSource.Collegien[i].mailEleve = Collegien.response.mailEleve;
      } else {
        console.log('ID non trouvé');
      };
    };

  };

  //Succes >> this.collegeService.updateMailEleve(Collegien._id, this.editForm.value.mailEleve)
  handleErrorUpdateMailEleve(err) {
    console.log(`Error ${err}`);
  };

  //-------------Modification du regime ELEVE-------------------------------------

  //Variables
  isCheckedRegimeEleve;

  //On gere le CLICK
  checkedRegimeEleve() {
    console.log('dans checked isCheckedRegimeEleve');
    this.isEditionMode = "Mode Edition"
  }

  //On gere le changement d'etat
  onChangeRegimeEleve(newValue) {
    console.log('nouvelle valeur du regime', newValue);
    this.isCheckedRegimeEleve = true;
  }

  updateRegimeEleve(Collegien) {
    console.log('Dans update regimeEleve', Collegien);
    console.log(`Recuperation de ID ${Collegien._id} et du regimeEleve de base ${this.editForm.value.regimeEleve}`);
    console.log('Collegien.regimeEleve', Collegien.regimeEleve);
    console.log('this.editForm.value.regimeEleve', this.editForm.value.regimeEleve);

    //regimeEleve
    this.editForm.value.regimeEleve = this.editForm.value.regimeEleve.toUpperCase();

    console.log('regimeEleve RENVOYE >>>>AVEC<<<< modification', this.editForm.value.regimeEleve);
    this.collegeService.updateRegimeEleve(Collegien._id, this.editForm.value.regimeEleve)
      .subscribe(Collegien => this.handleSucessUpdateRegimeEleve(Collegien), err => this.handleErrorUpdateRegimeEleve(err));

  }

  //Succes >> this.collegeService.updateRegimeEleve(Collegien._id, this.editForm.value.regimeEleve)
  handleSucessUpdateRegimeEleve(Collegien) {
    console.log('Regime modifié', Collegien.response.regimeEleve);
    this.isCheckedRegimeEleve = false;

    for (let i = 0; i < this.dataSource.Collegien.length; i++) {
      if (this.dataSource.Collegien[i]._id == Collegien.response._id) {
        console.log('ID trouvé');
        this.dataSource.Collegien[i].regimeEleve = Collegien.response.regimeEleve;
      } else {
        console.log('ID non trouvé');
      };
    };

  };

  //Error >> this.collegeService.updateRegimeEleve(Collegien._id, this.editForm.value.regimeEleve)
  handleErrorUpdateRegimeEleve(err) {
    console.log(`Error ${err}`);
  };

  //-------------Modification du nom PARENT--------------------------------
  //Variables
  isCheckedNomParent;

  //On gere le CLICK
  checkedNomParent() {
    console.log('dans checked isCheckedNomParent');
    this.isEditionMode = "Mode Edition";
  }

  //On gere le changement d'etat
  onChangeNomParent(newValue) {
    console.log('nouvelle valeur du nomParent', newValue);
    this.isCheckedNomParent = true;
  }

  updateNomParent(Collegien) {
    console.log('Dans update nomParent', Collegien);
    console.log(`Recuperation de ID ${Collegien._id} et du nomParent de base ${this.editForm.value.nomParent}`);
    console.log('Collegien.nomParent', Collegien.nomParent);
    console.log('this.editForm.value.nomParent', this.editForm.value.nomParent);

    //nomParent
    this.editForm.value.nomParent = this.editForm.value.nomParent.toUpperCase();

    console.log('nomParent RENVOYE >>>>AVEC<<<< modification', this.editForm.value.nomParent);
    this.collegeService.updateNomParent(Collegien._id, this.editForm.value.nomParent)
      .subscribe(Collegien => this.handleSucessUpdateNomParent(Collegien), err => this.handleErrorUpdateNomParent(err));

  }

  //Succes >> this.collegeService.updateNomParent(Collegien._id, this.editForm.value.nomParent)
  handleSucessUpdateNomParent(Collegien) {
    console.log('nomParent modifié', Collegien.response.nomParent);
    this.isCheckedNomParent = false;

    for (let i = 0; i < this.dataSource.Collegien.length; i++) {
      if (this.dataSource.Collegien[i]._id == Collegien.response._id) {
        console.log('ID trouvé');
        this.dataSource.Collegien[i].nomParent = Collegien.response.nomParent;
      } else {
        console.log('ID non trouvé');
      };
    };
  };

  //Error >> this.collegeService.updateNomParent(Collegien._id, this.editForm.value.nomParent)
  handleErrorUpdateNomParent(err) {
    console.log(`Error ${err}`);
  };


  //-------------Modification du prenom PARENT----------------------------------
  //Variables
  isCheckedPrenomParent;

  //On gere le CLICK
  checkedPrenomParent() {
    console.log('dans checked isCheckedPrenomParent');
    this.isEditionMode = "Mode Edition"
  }

  //On gere le changement d'etat
  onChangePrenomParent(newValue) {
    console.log('nouvelle valeur du prenomParent', newValue);
    this.isCheckedPrenomParent = true;
  }

  updatePrenomParent(Collegien) {
    console.log('Dans update prenomParent', Collegien);
    console.log(`Recuperation de ID ${Collegien._id} et du prenomParent de base ${this.editForm.value.prenomParent}`);
    console.log('Collegien.prenomParent', Collegien.prenomParent);
    console.log('this.editForm.value.prenomParent', this.editForm.value.prenomParent);

    //prenomParent
    this.editForm.value.prenomParent = this.editForm.value.prenomParent.toUpperCase();

    console.log('prenomParent RENVOYE >>>>AVEC<<<< modification', this.editForm.value.prenomParent);
    this.collegeService.updatePrenomParent(Collegien._id, this.editForm.value.prenomParent)
      .subscribe(Collegien => this.handleSucessUpdatePrenomParent(Collegien), err => this.handleSuccessUpdatePrenomParent(err));

  }

  //Succes >> this.collegeService.updatePrenomParent(Collegien._id, this.editForm.value.prenomParent)
  handleSucessUpdatePrenomParent(Collegien) {
    console.log('prenomParent modifié', Collegien.response.prenomParent);
    this.isCheckedPrenomParent = false;

    for (let i = 0; i < this.dataSource.Collegien.length; i++) {
      if (this.dataSource.Collegien[i]._id == Collegien.response._id) {
        console.log('ID trouvé');
        this.dataSource.Collegien[i].prenomParent = Collegien.response.prenomParent;
      } else {
        console.log('ID non trouvé');
      };
    };

  };

  //Error >> this.collegeService.updatePrenomParent(Collegien._id, this.editForm.value.prenomParent)
  handleSuccessUpdatePrenomParent(err) {
    console.log(`Error ${err}`);
  };

  //-------------Modification du qualite PARENT-------------------------------

  //Variables
  isCheckedQualiteParent;

  //On gere le CLICK
  checkedQualiteParent() {
    console.log('dans checked isCheckedQualiteParent');
    this.isEditionMode = "Mode Edition";
  }

  //On gere le changement d'etat
  onChangeQualiteParent(newValue) {
    console.log('nouvelle valeur du qualiteParent', newValue);
    this.isCheckedQualiteParent = true;
  }

  updateQualiteParent(Collegien) {
    console.log('Dans update qualiteParent', Collegien);
    console.log(`Recuperation de ID ${Collegien._id} et du qualiteParent de base ${this.editForm.value.qualiteParent}`);
    console.log('Collegien.qualiteParent', Collegien.qualiteParent);
    console.log('this.editForm.value.qualiteParent', this.editForm.value.qualiteParent);

    //qualiteParent
    this.editForm.value.qualiteParent = this.editForm.value.qualiteParent.toUpperCase();

    console.log('qualiteParent RENVOYE >>>>AVEC<<<< modification', this.editForm.value.qualiteParent);
    this.collegeService.updateQualiteParent(Collegien._id, this.editForm.value.qualiteParent)
      .subscribe(Collegien => this.handleSucessUpdateQualiteParent(Collegien), err => this.handleSuccessUpdateQualiteParent(err));

  }

  //Succes >> this.collegeService.updateQualiteParent(Collegien._id, this.editForm.value.qualiteParent)
  handleSucessUpdateQualiteParent(Collegien) {
    console.log('qualiteParent modifié', Collegien.response.qualiteParent);
    this.isCheckedQualiteParent = false;

    for (let i = 0; i < this.dataSource.Collegien.length; i++) {
      if (this.dataSource.Collegien[i]._id == Collegien.response._id) {
        console.log('ID trouvé');
        this.dataSource.Collegien[i].qualiteParent = Collegien.response.qualiteParent;
      } else {
        console.log('ID non trouvé');
      };
    };

  };

  //Error >> this.collegeService.updateQualiteParent(Collegien._id, this.editForm.value.qualiteParent)
  handleSuccessUpdateQualiteParent(err) {
    console.log(`Error ${err}`);
  };

  //-------------Modification du username/lOGIN----------------------------------------

  //Variables
  isCheckedUsername;

  //On gere le CLICK
  checkedUsername() {
    console.log('dans checked isCheckedUsername');
    this.isEditionMode = "Mode Edition";
  };

  //On gere le changement d'etat
  onChangeUsername(newValue) {
    console.log('nouvelle valeur du username', newValue);
    this.isCheckedUsername = true;
  };

  updateUsername(Collegien) {
    console.log('Dans update username', Collegien);
    console.log(`Recuperation de ID ${Collegien._id} et du username de base ${this.editForm.value.username}`);
    console.log('Collegien.username', Collegien.username);
    console.log('this.editForm.value.username', this.editForm.value.username);

    //prenomParent
    this.editForm.value.username = this.editForm.value.username.toUpperCase();

    console.log('username RENVOYE >>>>AVEC<<<< modification', this.editForm.value.username);
    this.collegeService.updateUsername(Collegien._id, this.editForm.value.username)
      .subscribe(Collegien => this.handleSucessUpdateUsername(Collegien), err => this.handleSuccessUpdateUsername(err));

  }

  //Succes >> this.collegeService.updateUsername(Collegien._id, this.editForm.value.username)
  handleSucessUpdateUsername(Collegien) {
    console.log('username modifié', Collegien.response.username);
    this.isCheckedUsername = false;

    for (let i = 0; i < this.dataSource.Collegien.length; i++) {
      if (this.dataSource.Collegien[i]._id == Collegien.response._id) {
        console.log('ID trouvé');
        this.dataSource.Collegien[i].username = Collegien.response.username;
      } else {
        console.log('ID non trouvé');
      };
    };

  };

  //Error >>  this.collegeService.updateUsername(Collegien._id, this.editForm.value.username)
  handleSuccessUpdateUsername(err) {
    console.log(`Error ${err}`);
  };

  //-------------Modification du Mot de passe--------------------------

  //Variables
  isCheckedPasswordConfirme;

  checkedPassword() {
    console.log('dans checked isCheckedPassword');
    this.isEditionMode = " Mode Edition";
  }

  //On gere le changement d'etat
  onChangePassword(newValue) {
    console.log('nouvelle valeur de password', newValue);

    if ((newValue == this.editForm.value.passwordConfirme) && (newValue != 0)) {
      console.log('mdp SIMILAIRE');
      this.isCheckedPasswordConfirme = true;
    } else {
      console.log('mdp NON SIMILAIRE');
      this.isCheckedPasswordConfirme = false;
    }
    if ((this.editForm.value.password == 0) && (this.editForm.value.passwordConfirme == 0))
      this.isCheckedPasswordConfirme = false;

  }

  onChangePasswordConfirme(newValue) {
    console.log('nouvelle valeur de passwordConfirme', newValue);
    if (newValue == this.editForm.value.password) {
      console.log('mdp SIMILAIRE');
      this.isCheckedPasswordConfirme = true;
    } else {
      console.log('mdp NON  SIMILAIRE');
      this.isCheckedPasswordConfirme = false;
    }

    if ((this.editForm.value.password == 0) && (this.editForm.value.passwordConfirme == 0))
      this.isCheckedPasswordConfirme = false;

  }

  updatePassword(Collegien) {
    console.log('Dans update password', Collegien);
    console.log(`Recuperation de ID ${Collegien._id} et du password de base ${this.editForm.value.password}`);
    console.log('Collegien.password', Collegien.password);
    console.log('this.editForm.value.password', this.editForm.value.password);

    if ((this.editForm.value.password == 0) && (this.editForm.value.passwordConfirme == 0)) {
      this.isCheckedPasswordConfirme = false;
    } else {
      //Password/concfirmePassword

      this.collegeService.updatePassword(Collegien._id, this.editForm.value.password)
        .subscribe(Collegien => this.handleSucessUpdatePassword(Collegien), err => this.handleErrorUpdatePassword(err));

      this.collegeService.updatePasswordConfirme(Collegien._id, this.editForm.value.passwordConfirme)
        .subscribe(Collegien => this.handleSucessUpdatePasswordConfirme(Collegien), err => this.handleErrorUpdatePasswordConfirme(err));
    }
  };

  //Succes >>  this.collegeService.updatePassword(Collegien._id, this.editForm.value.password)
  handleSucessUpdatePassword(Collegien) {
    console.log('Mail modifié', Collegien.response.password);
    this.isCheckedPasswordConfirme = 'ok';

    for (let i = 0; i < this.dataSource.Collegien.length; i++) {
      if (this.dataSource.Collegien[i]._id == Collegien.response._id) {
        console.log('ID trouvé');
        this.dataSource.Collegien[i].password = Collegien.response.password;
      } else {
        console.log('ID non trouvé');
      };
    };

  };

  //Error >>  this.collegeService.updatePassword(Collegien._id, this.editForm.value.password)
  handleErrorUpdatePassword(err) {
    console.log(`Error ${err}`);
  };

  //Succes >> his.collegeService.updatePasswordConfirme(Collegien._id, this.editForm.value.passwordConfirme)
  handleSucessUpdatePasswordConfirme(Collegien) {
    console.log('passwordConfirme modifié', Collegien.response.passwordConfirme);

    for (let i = 0; i < this.dataSource.Collegien.length; i++) {
      if (this.dataSource.Collegien[i]._id == Collegien.response._id) {
        console.log('ID trouvé');
        this.dataSource.Collegien[i].passwordConfirme = Collegien.response.passwordConfirme;
      } else {
        console.log('ID non trouvé');
      };
    };

  };

  //Error >> his.collegeService.updatePasswordConfirme(Collegien._id, this.editForm.value.passwordConfirme)
  handleErrorUpdatePasswordConfirme(err) {
    console.log(`Error ${err}`);
  };


  //-------------Modification du status---------------------------------

  //Activation/Desactivation du compte
  isActive: string = "Active";
  isDesactive: string = "Desactive";

  updateStatus(Collegien) {
    console.log('Dans update status');
    console.log(`Recuperation de ID ${Collegien._id} et du status de base ${Collegien.enable}`);

    if (Collegien.enable == "Active") {
      console.log(`Status passé à ${this.isDesactive}`);
      this.collegeService.updateStatus(Collegien._id, this.isDesactive)
        .subscribe(Collegien => this.handleSucessUpdateStatus(Collegien), err => this.handleSuccessUpdateStatus(err));
    } else {
      console.log(`Status passé à ${this.isActive}`);
      this.collegeService.updateStatus(Collegien._id, this.isActive)
        .subscribe(Collegien => this.handleSucessUpdateStatus(Collegien), err => this.handleSuccessUpdateStatus(err));
    }

  }

  //Succes >> this.collegeService.updateStatus(Collegien._id, this.isDesactive)
  //Succes >>  this.collegeService.updateStatus(Collegien._id, this.isActive)
  handleSucessUpdateStatus(Collegien) {
    console.log('Status modifié', Collegien.response.enable);
    console.log('dataSource', this.dataSource.Collegien);

    for (let i = 0; i < this.dataSource.Collegien.length; i++) {
      if (this.dataSource.Collegien[i]._id == Collegien.response._id) {
        console.log('ID trouvé');
        this.dataSource.Collegien[i].enable = Collegien.response.enable;
      } else {
        console.log('ID non trouvé');
      };
    };
  };

  //Error >> this.collegeService.updateStatus(Collegien._id, this.isDesactive)
  //Error >>  this.collegeService.updateStatus(Collegien._id, this.isActive)
  handleSuccessUpdateStatus(err) {
    console.log(`Error ${err}`);
  }; */

  /*  //-------------Date---------------------------------------------------------------------------------------
 
 
   afficherdatetime(){
     document.getElementById('date').innerHTML = this.dateFR();
 }
 
 
 dateFR(){
      // les noms de jours / mois
      var jours = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
      var mois = new Array("Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre");
 
      // on recupere la date
      var date = new Date();
 
      // on construit le message
      var message = jours[date.getDay()] + " ";   // nom du jour
      message += date.getDate() + " ";   // numero du jour
      message += mois[date.getMonth()] + " ";   // mois
      message += date.getFullYear();
 
      return message;
 } */
}



