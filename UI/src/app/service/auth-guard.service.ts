import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------


  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(private auth: AuthenticationService, private router: Router) { }


  //------------------------------------------------------------------------
  //-----------------------Methodes-----------------------------------------
  //------------------------------------------------------------------------
  /**
   * Pour valider la connection
   */
  canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
