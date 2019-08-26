import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService, UserDetails } from '../service/authentication.service';

@Component({
  selector: 'collegien-accueil-user',
  templateUrl: './accueil-user.component.html',
  styleUrls: ['./accueil-user.component.css']
})
export class AccueilUserComponent implements OnInit {

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------

  public listNomPrenomComponent = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
  );

  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthenticationService
  ) { }

  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------

  ngOnInit() {
  }


  //------------------------------------------------------------------------
  //-----------------------Methodes-----------------------------------------
  //------------------------------------------------------------------------
}
