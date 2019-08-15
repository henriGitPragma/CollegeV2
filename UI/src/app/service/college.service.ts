import { Collegien } from './../models/collegien';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  constructor(private http: HttpClient) { }

  private CollegienUrl = 'http://localhost:3000/api/Collegien';

  // Methode appelé en cas d'echec
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error('errrror', error);

      console.log(`${operation} echec: ${error.message}`);

      return of(result as T);
    };
  }


  // POST
  addCollegien(collegien: Collegien): Observable<Collegien> {
    console.log('Post du Service', collegien);
    return this.http.post<Collegien>(this.CollegienUrl, collegien)
      .pipe(
        tap((newCollegien: Collegien) => console.log(`Ajout d'un Collegien avec le nom ${newCollegien.nomEleve}`)),
        catchError(this.handleError<Collegien>(`AddEolein ${collegien}`))
      );
  }

  // GETAll + Criteres
  getAllCollegienCritere(collegien: Collegien, columnsOnly): Observable<Collegien[]> {
    console.log('Get All Collegien Service', collegien);

    const params = {
      nomEleve: collegien.nomEleve || '',
      prenomEleve: collegien.prenomEleve || '',
      columnsOnly,
    };


     return this.http.get<Collegien[]>(`${this.CollegienUrl}`, { params })
       .pipe(
        tap(() => console.log(`Collegien recupérés`)),
        catchError(this.handleError<Collegien[]>(`getAllCollegien`))
      );
  }

  putCollegien(collegien: Collegien): Observable<Collegien> {
    console.log('Put du Service', collegien._id);
    const _id = collegien._id;
    return this.http.patch<Collegien>(`${this.CollegienUrl}/${_id}`, collegien)
      .pipe(
        tap((newCollegienUpdate: Collegien) => console.log(`Update d'un Collegien ${newCollegienUpdate.nomEleve}`)),
        catchError(this.handleError<Collegien>(`PutEolein ${collegien}`))
      );
  }

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
