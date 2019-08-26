import { Component, OnInit, Input } from '@angular/core';
import { CollegeService } from '../service/college.service';
import { Collegien } from '../models/collegien';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthenticationService, UserDetails } from '../service/authentication.service';

@Component({
  selector: 'collegien-list-nom-prenom',
  templateUrl: './list-nom-prenom.component.html',
  styleUrls: ['./list-nom-prenom.component.css']
})
export class ListNomPrenomComponent implements OnInit {

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------

  public collegien: Collegien = {};
  public dataSource: Collegien[] = [];

    // Détails de l'utilisateur connecté
    details: UserDetails;


  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(
    private collegeService: CollegeService,
    private auth: AuthenticationService, 
  ) { }


  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
      this.displayCollumns();
    }, (err) => {
      console.error('ERROR', err);
    });
  }

  //------------------------------------------------------------------------
  //-----------------------Methodes-----------------------------------------
  //------------------------------------------------------------------------
  /**
   * Recherche de tous les collégiens - On récupere uniquement le nom et le prenom
   */
  displayCollumns() {
    if(this.details.nomRole === 'user') {
      console.log('pipoooooooooooooooooooooo', this.details.nomEleve)
      this.collegien = {nomParent: this.details.nomEleve}
      this.collegeService.
      getAllCollegienCritere(this.collegien, ['nomEleve', 'prenomEleve', 'classeEleve'])
      .subscribe(res => this.dataSource = res)
    } else {
      this.collegeService.
      getAllCollegienCritere(this.collegien, ['nomEleve', 'prenomEleve'])
      .subscribe(res => this.dataSource = res)
    }
  }

  //------------------------------------------------------------------------
  /**
   * Récupération de l'ID
   * @param event 
   */
  previousIDcollegien(event) {
    console.log('previous', event)
  }

  //------------------------------------------------------------------------
  /**
   * Mise en couleur du Bouton
   */
  btnAddCollegien() {
    document.getElementById('addCollegien').classList.add('btn-color');
  }
}
