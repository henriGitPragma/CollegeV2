import { CollegeService } from './../../service/college.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload, UserDetails } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialUser  } from 'angularx-social-login';


@Component({
  selector: 'collegien-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public echec =  '';

  // Google
  private user: SocialUser;
  private loggedIn: boolean;
  public eolien;
  public emailGoogle;
  public eolienGoogle;
  public photoUrl;
  
  
  
  // Login 
    credentials: TokenPayload = {
      email: '',
      password: ''
    };
  
    details: UserDetails;
  
  
    constructor(private auth: AuthenticationService, private collegeService: CollegeService,
       private router: Router,
       private authService: AuthService) {}
  
  
    ngOnInit() {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
      });
    }
  
  // Permet de se logger classquement
    login() {
      console.log('dans le composant login ')
      this.auth.login(this.credentials).subscribe(() => {
  
        this.auth.profile().subscribe(user => {
          this.details = user;
          console.log('OK', this.details);
        }, (err) => {
          console.error('ERROR', err);
        });
        this.router.navigateByUrl('/meteoles');
      }, (err) => {
        this.echec = 'ECHEC';
      });
    }
  
  
  // Permet de se logger avec Google ou tout autre plateforme
  // -> https://www.npmjs.com/package/angularx-social-login
    socialSignIn(socialPlatform: string) {
      console.log('signin with google', socialPlatform );
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
        (userData) => {
  
          this.eolien = {email : userData.email};
          // On fait une recherche sur le mail de google pour recupéré la personne
          console.log('emailGoogle' , userData.email);
          this.auth.googleAuth(userData.email).subscribe(res => console.log('eeeeeeeeeeee', res))
          /*  this.eolienService.getAllEolienCritere(this.eolien, [])
          .subscribe(res => console.log(res)); */
        }
      );
    }
  }
