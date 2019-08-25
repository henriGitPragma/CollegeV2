import { CollegeService } from './../service/college.service';
import { Collegien } from './../models/collegien';
import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'collegien-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']
})
export class MatTableComponent implements OnInit {

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------

  @Input() annee: string;
  @Input() mois: string;

  // Mat table declaration
  public dataSource = new MatTableDataSource<Collegien>();

  // Variable des colums d'affichages
  public displayFirstColumn = 'nomEleve';
  public displaySecondColumn = 'prenomEleve';

  // Colums à afficher
  public displayedColumns = [this.displayFirstColumn, this.displaySecondColumn, 'classeEleve', 'h_Arr', 'h_Dep'];

  // New Eolien
  public collegien: Collegien = {};


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
    this.getData();
  }

  //------------------------------------------------------------------------------
  //-----------------------Appelé apres le chargement de la page HTML-------------
  //------------------------------------------------------------------------------

  ngAfterViewChecked(): void {
    console.log('annee/mois', this.annee, this.mois)
  }


  //------------------------------------------------------------------------
  //-----------------------Methodes-----------------------------------------
  //------------------------------------------------------------------------
  /**
   * Récupération de tous les collégiens
   */
  getData() {
    this.collegeService.getAllCollegienCritere(this.collegien, []).subscribe(res => this.dataSource.data = res);
  }
}
