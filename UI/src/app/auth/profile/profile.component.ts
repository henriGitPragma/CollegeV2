import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from 'src/app/service/authentication.service';

@Component({
  selector: 'collegien-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------

  // Détails sur les infos dans le token
  details: UserDetails;


  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(
    private auth: AuthenticationService
  ) { }


  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------

  ngOnInit() {
    console.log(' dans le component profil')
    this.auth.profile().subscribe(user => {
      this.details = user;
      console.log('OK', this.details)
    }, (err) => {
      console.error('ERROR', err);
    });
  }
}
