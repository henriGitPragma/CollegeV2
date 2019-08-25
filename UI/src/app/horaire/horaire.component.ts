import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'collegien-horaire',
  templateUrl: './horaire.component.html',
  styleUrls: ['./horaire.component.css']
})
export class HoraireComponent implements OnInit {

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------


  public kpiComponent: boolean;
  public calendarComponent: boolean;
  public listNomPrenomComponent: boolean;


  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor() { }


  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------

  ngOnInit() {
    this.btnCalendarFunction()
  }

  //------------------------------------------------------------------------
  //-----------------------Methodes-----------------------------------------
  //------------------------------------------------------------------------
  /**
   * Bollean de tous les composants mis à false
   */
  resetAllComponent() {
    this.kpiComponent = false;
    this.calendarComponent = false;
    this.listNomPrenomComponent = false;
  }

  //------------------------------------------------------------------------
  /**
   * Suppression de la couleur de tous les boutons
   */
  resetAllColor() {
    document.getElementById('kpi').classList.remove('btn-color');
    document.getElementById('infoPerso').classList.remove('btn-color');
    document.getElementById('calendar').classList.remove('btn-color');
  }

  //------------------------------------------------------------------------
  /**
   * Acces au composant tree calendar
   */
  btnCalendarFunction() {
    this.resetAllComponent();
    this.resetAllColor();
    this.calendarComponent = true;
    document.getElementById('calendar').classList.add('btn-color');

  }

  //------------------------------------------------------------------------
  /**
   * Acces au Bouton Meteoles
   */
  btnInfoMeteoleFunction() {
    this.resetAllComponent();
    this.resetAllColor();
    this.listNomPrenomComponent = true;
    document.getElementById('infoPerso').classList.add('btn-color');
  }

  //------------------------------------------------------------------------
  /**
   * Acces au bouton KPI
   */
  btnKpiFunction() {
    this.resetAllComponent();
    this.resetAllColor();
    this.kpiComponent = true;
    document.getElementById('kpi').classList.add('btn-color');
  }

}
