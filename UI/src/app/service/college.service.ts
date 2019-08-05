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
  addCollegien(Collegien: Collegien): Observable<Collegien> {
    console.log('Post du Service', Collegien);
    return this.http.post<Collegien>(this.CollegienUrl, Collegien)
      .pipe(
        tap((newCollegien: Collegien) => console.log(`Ajout d'un Collegien avec le nom ${newCollegien.nomEleve}`)),
        catchError(this.handleError<Collegien>(`AddEolein ${Collegien}`))
      );
  }

  // GETAll + Criteres
  getAllCollegienCritere(Collegien: Collegien): Observable<Collegien[]> {
    console.log('Get All Collegien Service', Collegien);

    /* const params = {
      nom: Collegien.nom,
      prenom: Collegien.prenom,
      ville: Collegien.ville,
      trigrammeParrain: Collegien.trigrammeParrain,
      indiceCouleurSynthese: Collegien.indiceCouleurSynthese
    }; */

    return this.http.get<Collegien[]>(`${this.CollegienUrl}`)

/*     return this.http.get<Collegien[]>(`${this.CollegienUrl}`, { params })
 */      .pipe(
        tap(() => console.log(`Collegien recupérés`)),
        catchError(this.handleError<Collegien[]>(`getAllCollegien`))
      );
  }

  putCollegien(Collegien: Collegien): Observable<Collegien> {
    console.log('Put du Service', Collegien._id);
    const _id = Collegien._id;
    return this.http.patch<Collegien>(`${this.CollegienUrl}/${_id}`, Collegien)
      .pipe(
        tap((newCollegienUpdate: Collegien) => console.log(`Update d'un Collegien ${newCollegienUpdate.nomEleve}`)),
        catchError(this.handleError<Collegien>(`PutEolein ${Collegien}`))
      );
  }

  getByid(Collegien: Collegien): Observable<Collegien> {
    console.log('dans le getbyId du Service', Collegien._id);
    const _id = Collegien._id;
    return this.http.get<Collegien>(`${this.CollegienUrl}/${_id}`)
      .pipe(
        tap((CollegienByid: Collegien) => console.log(`GetByid d'un Collegien ${CollegienByid}`)),
        catchError(this.handleError<Collegien>(`GetByidEolein ${Collegien}`))
      );
  }
}
