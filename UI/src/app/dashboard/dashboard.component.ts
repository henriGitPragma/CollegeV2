import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'collegien-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------

  // Tableau de mois
  public months = ['Janvier',
    'Février', 'Mars', 'Avril', 'Mai',
    'Juin', 'Juillet', 'Aout', 'Septembre',
    'Octobre', 'Novembre', 'Décembre'];

  // Variables initialiser avec l'année et le mois courant
  public titleYear = new Date().getUTCFullYear();
  public titleMonth = this.months[new Date().getMonth()];

  public variableDate = {};
  public collegien = {};

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { cols: 2, rows: 2, id: '1' },
        ];
      }
      return [
        { cols: 2, rows: 2, id: '1' },
      ];
    })
  );


  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(
    private activateRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
  ) { }


  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------

  ngOnInit() {
    // Recuperation des queryparams
    this.activateRoute.queryParams
      .subscribe(params => this.handleSucess(params));
  }

  //------------------------------------------------------------------------
  //-----------------------Methodes-----------------------------------------
  //------------------------------------------------------------------------
  /**
   * Appelé en cas de succés de la récupération des parametres dans l'URL
   * @param params 
   */
  handleSucess(params) {
    const arrayParams = Object.values(params);
    if (arrayParams.length !== 0) {
      this.titleYear = params.annee;
      this.titleMonth = params.mois;
    }
  }
}
