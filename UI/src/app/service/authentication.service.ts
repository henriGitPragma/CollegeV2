import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  nomEleve: string;
  prenomEleve: string;
  nomRole: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
}

@Injectable()
export class AuthenticationService {

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------

  private token: string;


  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  //------------------------------------------------------------------------
  //-----------------------Methodes-----------------------------------------
  //------------------------------------------------------------------------
  /**
   * Sauvegarde du Token
   * @param token 
   */
  private saveToken(token: string): void {
    localStorage.setItem('collegien-token', token);
    this.token = token;
  }

  //------------------------------------------------------------------------
  /**
   * Position dans le local Storage
   */
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('collegien-token');
    }
    return this.token;
  }

  //------------------------------------------------------------------------
  /**
   * Récupération des infos dans le token
   */
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  //------------------------------------------------------------------------
  /**
   * Pour savoir qui est logué
   */
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  //------------------------------------------------------------------------
  /**
   * Pour pouvoir se loguer
   * @param user
   */
  public login(user: TokenPayload): Observable<any> {
    console.log('dans le service Login', user);
    const urlLogin = 'http://localhost:3000/api/login';
    const base = this.http.post(urlLogin, user);

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  //------------------------------------------------------------------------
  /**
   * Connaitre le profil de la personne loguée
   */
  public profile(): Observable<any> {
    console.log('dans le service profile', this.token);
    const urlProfile = 'http://localhost:3000/api/collegien/profile';
    const base = this.http.get(urlProfile, { headers: { Authorization: `Bearer ${this.getToken()}` } });

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  //------------------------------------------------------------------------
  /**
   * Se déloguer
   */
  public logout(): void {
    console.log('dans le service logout');
    this.token = '';
    window.localStorage.removeItem('collegien-token');
    this.router.navigateByUrl('/');
  }

  //------------------------------------------------------------------------
  /**
   * Connexion avec google
   * @param email 
   */
  public googleAuth(email) {
    console.log('googleAuth', email);
    const urlAuth = 'http://localhost:3000/api/collegien/profile';
    const base = this.http.get(`${urlAuth}/${email}`);
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          console.log('token', data)
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }
}