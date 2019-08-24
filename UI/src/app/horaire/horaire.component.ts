import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'collegien-horaire',
  templateUrl: './horaire.component.html',
  styleUrls: ['./horaire.component.css']
})
export class HoraireComponent implements OnInit {

  
  public kpiComponent: boolean;
  public calendarComponent: boolean;
  public listNomPrenomComponent: boolean;


  constructor() { }

  ngOnInit() {
    this.btnCalendarFunction()
  }

  resetAllComponent() {
    this.kpiComponent = false;
    this.calendarComponent = false;
    this.listNomPrenomComponent = false;
  }

  resetAllColor() {
    document.getElementById('kpi').classList.remove('btn-color');

    document.getElementById('infoPerso').classList.remove('btn-color');
    document.getElementById('calendar').classList.remove('btn-color');
  }


  btnCalendarFunction() {
    this.resetAllComponent();
    this.resetAllColor();
    this.calendarComponent = true;
    document.getElementById('calendar').classList.add('btn-color');

  }

  btnInfoMeteoleFunction() {
    this.resetAllComponent();
    this.resetAllColor();
    this.listNomPrenomComponent = true;
    document.getElementById('infoPerso').classList.add('btn-color');
  }

  btnKpiFunction() {
    this.resetAllComponent();
    this.resetAllColor();
    this.kpiComponent = true;
    document.getElementById('kpi').classList.add('btn-color');
    
  }

}
