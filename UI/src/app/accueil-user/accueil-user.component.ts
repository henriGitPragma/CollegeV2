import { CollegeService } from './../service/college.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Collegien } from '../models/collegien';
import { MatTableDataSource } from '@angular/material';
import { trigger, state, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-accueil-user',
  templateUrl: './accueil-user.component.html',
  styleUrls: ['./accueil-user.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class AccueilUserComponent implements OnInit {

  //--------------------------------------------------------------------------------
  //-----------------------Variables------------------------------------------------------


  public displayedColumns = ['nomEleve', 'prenomEleve', 'classeEleve'];
  public dataSource = new MatTableDataSource<Collegien>();

  //--------------------------------
  nbLocalStorage: any;
  admin: any;

  //--------------------------------
  enfant: Collegien;
  dateArrive: Date;
  ids: string[] = [];
  loginData: Collegien[] = [];

  //Date
  date: any;
  heures: any;
  minutes: any;
  secondes: any;


  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(private router: Router,
    private activateRoute: ActivatedRoute,
    private collegeService: CollegeService) { }


  //--------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //--------------------------------------------------------------------------------

  ngOnInit() {
    /*     setInterval(() => { this.afficherdatetime(); }, 1000);
     */

    //Recuperation des queryparams
    this.activateRoute.queryParams
      .subscribe(params => this.handleSuccessQueryPrams(params), error => this.handleErrorQueryPrams(error));
  }


  //---------------------------------------------------------------------------
  //-------------------- QueryParameter----------------------------------------
  //---------------------------------------------------------------------------


  //Succes de la méthode >> this.activateRoute.queryParams
  handleSuccessQueryPrams(data) {
    console.log('Données recupérées 1', Object.values(data));
    this.ids = Object.values(data);
    console.log('Données recupérées 2', this.ids);
    console.log(' longueur', this.ids.length);
    if (this.ids[0].length > 1) {
      console.log('plusieurs ID');
      this.getByidAll(this.ids);
    } else {
      console.log('1 ID');
      this.getByid(this.ids);
    }
  };


  //Echec de la méthode >> this.activateRoute.queryParams
  handleErrorQueryPrams(error) {
    console.log(`Echec de la  recupération ${error}`);
  };


  //--------------------------------------------------------------------------------
  //-------------------GetByIDAll---------------------------------------------------
  //--------------------------------------------------------------------------------

  //----Recuperation de toutes les données-------------------------------------------
  getByidAll(id) {
    /* this.collegeService.getManyId(id)
      .subscribe(data => this.handleSucessManyID(data), error => this.handleErrorManyID(error)); */
  };

  //Succes >> this.collegeService.getManyId(id)
  handleSucessManyID(data) {
    console.log('Donnee recuperé MULTI', data);
    this.dataSource.data = data as Collegien[];
  };

  //Echec >> this.collegeService.getManyId(id)
  handleErrorManyID(error) {
    console.log('Echec de la recuperation', error);
  };


  //--------------------------------------------------------------------------------
  //-------------------GetByID------------------------------------------------------
  //--------------------------------------------------------------------------------

  //Reherche de l'enfant  grace à son identifiant
  getByid(id) {
    /* this.collegeService.getEnfantById(id)
      .subscribe(data => this.handleSucess(data), error => this.handleError(error)); */
  };

  //Succes >> this.collegeService.getEnfantById(id)
  handleSucess(data) {
    console.log('Donnee recuperé UNIQUE', data);
    this.loginData[0] = data
    this.dataSource.data = this.loginData as Collegien[];
  };

  //Echec >> this.collegeService.getEnfantById(id)
  handleError(error) {
    console.log('Echec de la recuperation', error);
  };



  //--------------------------------------------------------------------------------
  //-----------------------isConnection----------------------------------------------
  //--------------------------------------------------------------------------------

  //------------------------Variables--------------------------------------------------------
  isConnect: number;


  // Methode pour récupérer l'attribut "isConnection" dans la table
  isConnection(id) {
    console.log('id dans isConnection', id)
    /* this.collegeService.getEnfantById(id)
    .subscribe(res => this.handleSucessIsConnection(res), err => this.handleErrorIsConnection(err)); */
  }

// Succes  >> this.collegeService.getEnfantById(id)
  handleSucessIsConnection(data) {
    console.log('donnée recuperer', data.isConnection);

    if (data.isConnection == 0) {
      this.isConnect = 0
      this.isDep = false;
      this.isArr = false;
      this.isConectOK = true
    } else {
      this.isConnect = 1;
      this.isArr = false;
      this.isDep = false;
      this.isConectOK = true
    }
  }

  //Error >>  this.collegeService.getEnfantById(id)
  handleErrorIsConnection(err){
    console.log('Erreur dans handleErrorIsConnection', err);
  }

  //--------------------------------------------------------------------------------
  //----------------------Edition de la date DEPART----------------------------------
  //--------------------------------------------------------------------------------

  //--------------------Variables------------------------------------------
  isDep: boolean;


  //Modification de la date de départ + de l'attribut "isConnection"
  updateDateDepart(id) {
    console.log('update sur ID de dateDepart', id)
    this.isDep = true
   /*  this.collegeService.updateDepart(id)
    .subscribe(data => this.handleSuccessDep(data), err => this.handleErrorDep(err));

    this.collegeService.updateIsConnection(id, 0)
    .subscribe(res => this.handleSuccessIsConnectDepart(res), err => this.handleErrorIsConnectDepart(err)); */
  }

   //Succes >>  this.collegeService.updateDepart(id)
   handleSuccessDep(data) {
    console.log('MAJ ok Dep', data.response._id);
    console.log('datasource', this.dataSource.data);

    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i]._id == data.response._id) {
        console.log('OK refresh auto');
        this.dataSource.data[i].h_Dep = data.response.h_Dep;
      }
    };
  }

  //Error >>  this.collegeService.updateDepart(id)
  handleErrorDep(err){
    console.log('error dans handleErrorDep', err);
  }



// Succes >> this.collegeService.updateIsConnection(id, 0)
  handleSuccessIsConnectDepart(data) {
    console.log('update de isConection', data);
    this.isConectOK = false;
  };

  //Error >>  this.collegeService.updateDepart(id)
  handleErrorIsConnectDepart(err){
    console.log('error dans handleErrorIsConnectDepart', err);
  }

  //--------------------------------------------------------------------------------
  //----------------------Edition de la date ARRIVE---------------------------------
  //--------------------------------------------------------------------------------

    //--------------------Variables------------------------------------------
  isArr: boolean;
  isConectOK: boolean

  //Modification de la date d'arrivé
  updateDateArrive(id) {
    console.log('update sur ID de dateArr', id)
    this.isArr = true
    /* this.collegeService.updateArrive(id)
    .subscribe(data => this.handleSuccessArr(data), err => this.handleErrorArr(err));

    this.collegeService.updateIsConnection(id, 1)
    .subscribe(res => this.handleSuccessIsConnectArriv(res), err => this. handleErreurIsConnectArriv(err)) */
  }



  //Succes >>  this.collegeService.updateArrive(id)
  handleSuccessArr(data) {
    console.log('MAJ ok Arr', data.response.h_Arr);
    console.log('datasource', this.dataSource.data)
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i]._id == data.response._id) {
        console.log('OK refresh auto');
        this.dataSource.data[i].h_Arr = data.response.h_Arr
      }
    };
  };

  //Erreur >> this.collegeService.updateArrive(id)
  handleErrorArr(err){
 console.log('Erreur dans handleErrorArr :', err)
  }



  //Succes >>  this.collegeService.updateIsConnection(id, 1)
  handleSuccessIsConnectArriv(data) {
    console.log('update de isConection', data)
    this.isConectOK = false;
  }

   //Erreur >> this.collegeService.updateArrive(id)
  handleErreurIsConnectArriv(err){
    console.log('Erreur dans handleErreurIsConnectArriv :', err)
  }

  //--------------------------------------------------------------------------------
  //-------------Date--------------------------------------------------------------
  //--------------------------------------------------------------------------------

  /* afficherdatetime() {
    document.getElementById('date').innerHTML = this.dateFR();
  }


  dateFR() {
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


