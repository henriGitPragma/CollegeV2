import { Collegien } from './../models/collegien';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------

  private CollegienUrl = 'http://localhost:3000/api/Collegien';


  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(
    private http: HttpClient
  ) { }


  //------------------------------------------------------------------------
  //-----------------------Methodes-----------------------------------------
  //------------------------------------------------------------------------
  /**
   * Methode appelé en cas d'echec
   * @param operation 
   * @param result 
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error('ERROR', error);
      console.log(`${operation} echec: ${error.message}`);
      return of(result as T);
    };
  }


  //------------------------------------------------------------------------
  /**
   * Sauvegarde d'un Collegien
   * @param collegien 
   */
  addCollegien(collegien: Collegien): Observable<Collegien> {
    console.log('Post du Service', collegien);
    return this.http.post<Collegien>(this.CollegienUrl, collegien)
      .pipe(
        tap((newCollegien: Collegien) => console.log(`Ajout d'un Collegien avec le nom ${newCollegien.nomEleve}`)),
        catchError(this.handleError<Collegien>(`AddEolein ${collegien}`))
      );
  }

  //------------------------------------------------------------------------
  /**
   * Recherche des Collégiens 
   * @param collegien 
   * @param columnsOnly 
   */
  getAllCollegienCritere(collegien: Collegien, columnsOnly): Observable<Collegien[]> {
    console.log('Get All Collegien Service', collegien);

    const params = {
      nomEleve: collegien.nomEleve || '',
      prenomEleve: collegien.prenomEleve || '',
      email: collegien.email || '',
      columnsOnly,
    };
    console.log('params', params);
    return this.http.get<Collegien[]>(`${this.CollegienUrl}`, { params })
      .pipe(
        tap(res => console.log(res)),
        catchError(this.handleError<Collegien[]>(`getAllCollegien`))
      );
  }

  //------------------------------------------------------------------------
  /**
   * Modification d'un collégien
   * @param collegien 
   */
  putCollegien(collegien: Collegien): Observable<Collegien> {
    console.log('Put du Service', collegien._id);
    const _id = collegien._id;
    return this.http.patch<Collegien>(`${this.CollegienUrl}/${_id}`, collegien)
      .pipe(
        tap((newCollegienUpdate: Collegien) => console.log(`Update d'un Collegien ${newCollegienUpdate.nomEleve}`)),
        catchError(this.handleError<Collegien>(`PutEolein ${collegien}`))
      );
  }
  
  //------------------------------------------------------------------------
  /**
   * Recherche par ID du collégien
   * @param collegien 
   */
  getByid(collegien: Collegien): Observable<Collegien> {
    console.log('dans le getbyId du Service', collegien._id);
    const _id = collegien._id;
    return this.http.get<Collegien>(`${this.CollegienUrl}/${_id}`)
      .pipe(
        tap((collegienByid: Collegien) => console.log(`GetByid d'un Collegien ${collegienByid}`)),
        catchError(this.handleError<Collegien>(`GetByidEolein ${collegien}`))
      );
  }
}
