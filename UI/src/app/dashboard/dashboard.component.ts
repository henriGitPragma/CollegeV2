import { CollegeService } from './../service/college.service';
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
  

  public months = ['Janvier',
  'Février', 'Mars', 'Avril', 'Mai',
   'Juin', 'Juillet', 'Aout', 'Septembre',
    'Octobre', 'Novembre', 'Décembre'];

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

  constructor(
    private activateRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver, private collegeService: CollegeService) {}

ngOnInit() {

// Recuperation des queryparams
this.activateRoute.queryParams
.subscribe(params => this.handleSucess(params));
}


handleSucess(params) {
const arrayParams = Object.values(params);
if( arrayParams.length !== 0) {
  this.titleYear = params.annee;
  this.titleMonth = params.mois;
}

}
}
