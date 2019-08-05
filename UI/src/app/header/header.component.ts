import { CollegeService } from './../service/college.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(private collegeService: CollegeService, private router: Router) { }

  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------
  
  ngOnInit() {
  }

  //------------------------------------------------------------------------
  //----------------------Deconnexion----------------------------------------
  //-------------------------------------------------------------------------

  //Methode pour se déconnecter
  logout() {
    console.log('dans logout');
    /* this.collegeService.logout().subscribe(data => {
      console.log('logout', data);
      this.router.navigate(['/auth']);
    }, err => console.error(err))
  } */
}
};