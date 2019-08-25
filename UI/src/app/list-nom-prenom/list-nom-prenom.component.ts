import { Component, OnInit } from '@angular/core';
import { CollegeService } from '../service/college.service';
import { Collegien } from '../models/collegien';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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


  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(
    private collegeService: CollegeService
  ) { }


  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------

  ngOnInit() {
    this.displayCollumns();
  }

  //------------------------------------------------------------------------
  //-----------------------Methodes-----------------------------------------
  //------------------------------------------------------------------------
  /**
   * Recherche de tous les collégiens - On récupere uniquement le nom et le prenom
   */
  displayCollumns() {
    this.collegeService.
      getAllCollegienCritere(this.collegien, ['nomEleve', 'prenomEleve']).subscribe(res => this.dataSource = res)
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
