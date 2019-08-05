import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollegeService } from '../service/college.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------

  //Variable echec
  echecLogin: string = '';

  // toutes les données recuperé
  data;

  //donnée de login
  username: string;
  password;
  id;

  //formulaire du login
  loginForm: FormGroup;
  loginData: string[] = [];
  allids;

  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(private collegeService: CollegeService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------

  ngOnInit() {
    //Recuperer le login
    this.login();
  }

  //----------------------------------------------------------------------
  //-----------------------Login-----------------------------------------
  //---------------------------------------------------------------------

  //Formulaire d'authentification
  login() {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  };

  //---------------------------------------------------------------------
  //-----------------------Soumission du formulaire-----------------------
  //---------------------------------------------------------------------

  //--------------Variables------------------------------------------------
  isActif: string;
  passwordRecup: string;


  //Methode appelée à la soumission du formulaire
  isConect() {
    console.log('Donnée du formulaire', this.loginForm.value);
    console.log('Login', this.loginForm.value.username);
    console.log('MDP', this.loginForm.value.password);

    /* this.collegeService.searchChild(this.loginForm.value.username)
      .subscribe(res => this.handleSucessSearchChild(res), err => this.handleErrorSearchChild(err)); */

  }

  //Succes >> this.collegeService.searchChild(this.loginForm.value.username)
  handleSucessSearchChild(data) {
    console.log('Recuperation des données de login', data);

    data.forEach(element => {
      this.isActif = element.enable.toUpperCase();
      this.passwordRecup = element.password;
    });

    console.log('Password', this.passwordRecup);
    console.log('MDP', this.loginForm.value.password);

    if (this.loginForm.value.password !== this.passwordRecup) {
      this.echecLogin = "Identifiant/Mot de passe Incorrect";
    } else {
      console.log('Status du compte', this.isActif);

      if (this.isActif == 'DESACTIVE') {
        this.echecLogin = "Compte Desactivé";
      } else {
        for (let i = 0; i < data.length; i++) {
          this.loginData[i] = data[i]._id;
        }
        console.log('Tableau rempli avec les ID', this.loginData);

        if (data.length == 0) {
          this.echecLogin = "Identifiant/Mot de passe Incorrect";
        } else {
          if (this.loginForm.value.username == "admin" && this.loginForm.value.password == "admin") {
            //Verif de l'admin
            console.log(this.loginForm.value.username);
            console.log(this.loginForm.value.password);
            sessionStorage.setItem('admin', 'true');
            this.router.navigate(['/global']);
          } else {
            this.router.navigate(['/accueilUser'], { queryParams: { data: this.loginData } });
          }
          this.echecLogin = "Identifiant/Mot de passe Incorrect";
        }
      }
    }
  };

  //Error >> this.collegeService.searchChild(this.loginForm.value.username)
  handleErrorSearchChild(err) {
    console.log('Echec dans handleErrorSearchChild ', err);
  };

}
